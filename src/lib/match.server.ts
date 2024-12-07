import { PrismaClient } from "@prisma/client";

interface MatchingCriteria {
  practitionerPreferences?: string;
  specialtyNeeds?: string[];
  languages?: string[];
  cultures?: string[];
  gender?: string;
}

class PractitionerMatcher {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async matchPractitioners(userId: number): Promise<number[]> {
    try {
      // Fetch customer details with comprehensive information
      const customer = await this.prisma.customer.findUnique({
        where: { userId },
        include: {
          user: {
            include: {
              userLanguages: {
                include: {
                  language: true,
                },
              },
              userCultures: {
                include: {
                  culture: true,
                },
              },
            },
          },
          customerNeedSpecialties: {
            include: {
              specialty: true,
            },
          },
        },
      });

      if (!customer) {
        throw new Error("Customer not found");
      }

      // Extract specialty needs
      const specialtyNeeds = customer.customerNeedSpecialties.map(
        (cns) => cns.specialty.name
      );

      // Extract matching criteria
      const matchingCriteria: MatchingCriteria = {
        practitionerPreferences: customer.practitioner_preferences || undefined,
        specialtyNeeds: specialtyNeeds,
        languages: customer.user.userLanguages.map((ul) => ul.language.name),
        cultures: customer.user.userCultures.map((uc) => uc.culture.name),
        gender: customer.user.gender || undefined,
      };

      // Build complex matching query
      const matchedPractitioners = await this.prisma.practitioner.findMany({
        where: {
          // Match practitioner type based on customer's preferences
          ...(matchingCriteria.practitionerPreferences && {
            type: matchingCriteria.practitionerPreferences,
          }),
          // Match gender if specified
          ...(matchingCriteria.gender && {
            user: {
              gender: matchingCriteria.gender,
            },
          }),
          // Match multiple specialty needs
          ...(matchingCriteria.specialtyNeeds?.length && {
            practitionerSpecialties: {
              some: {
                specialty: {
                  name: { in: matchingCriteria.specialtyNeeds },
                },
              },
            },
          }),
          // Match languages (at least one common language)
          practitionerLanguages: {
            some: {
              language: {
                name: { in: matchingCriteria.languages },
              },
            },
          },
          // Match cultures (at least one common culture)
          practitionerCultures: {
            some: {
              culture: {
                name: { in: matchingCriteria.cultures },
              },
            },
          },
        },
        select: {
          id: true,
        },
      });

      // Additional sophisticated matching logic
      const rankedPractitioners = await this.rankPractitioners(
        matchedPractitioners.map((p) => p.id),
        matchingCriteria
      );

      return rankedPractitioners;
    } catch (error) {
      console.error("Matching error:", error);
      throw error;
    }
  }

  // Method to rank practitioners based on matching criteria
private async rankPractitioners(practitionerIds: number[], matchingCriteria: MatchingCriteria): Promise<number[]> {
// Basic ranking algorithm to sort practitioners based on matching criteria
const prisma = new PrismaClient();

  try {
    // Create a scoring mechanism for practitioners
    const scoredPractitioners = await Promise.all(
      practitionerIds.map(async (practitionerId) => {
        let score = 0;

        // Fetch practitioner details for detailed scoring
        const practitioner = await prisma.practitioner.findUnique({
          where: { id: practitionerId },
          include: {
            practitionerSpecialties: {
              include: { specialty: true }
            },
            practitionerLanguages: {
              include: { language: true }
            },
            practitionerCultures: {
              include: { culture: true }
            },
            user: true
          }
        });

        if (!practitioner) {
          return { practitionerId, score: 0 };
        }

        // Score specialty matches
        if (matchingCriteria.specialtyNeeds) {
          const specialtyMatches = practitioner.practitionerSpecialties
            .filter(ps => matchingCriteria.specialtyNeeds?.includes(ps.specialty.name));
          score += specialtyMatches.length * 10; // High weight for specialty match
        }

        // Score language matches
        if (matchingCriteria.languages) {
          const languageMatches = practitioner.practitionerLanguages
            .filter(pl => matchingCriteria.languages?.includes(pl.language.name));
          score += languageMatches.length * 5; // Medium weight for language match
        }

        // Score culture matches
        if (matchingCriteria.cultures) {
          const cultureMatches = practitioner.practitionerCultures
            .filter(pc => matchingCriteria.cultures?.includes(pc.culture.name));
          score += cultureMatches.length * 3; // Lower weight for culture match
        }

        // Gender preference match
        if (matchingCriteria.gender && practitioner.user.gender === matchingCriteria.gender) {
          score += 7; // Bonus for gender preference
        }

        return { practitionerId, score };
      })
    );

    // Sort practitioners by score in descending order
    return scoredPractitioners
      .sort((a, b) => b.score - a.score)
      .map(sp => sp.practitionerId);

  } catch (error) {
    console.error("Ranking practitioners error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
}

// Utility functions for managing customer specialty needs
async function addCustomerSpecialties(
  userId: number,
  specialtyNames: string[]
): Promise<void> {
  const prisma = new PrismaClient();

  try {
    // Find the customer
    const customer = await prisma.customer.findUnique({
      where: { userId },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    // Find or create specialties
    const specialtyOperations = specialtyNames.map(async (name) => {
      // Find or create the specialty
      const specialty = await prisma.specialty.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      // Create the customer need specialty link
      return prisma.customerNeedSpecialty.create({
        data: {
          customerId: customer.id,
          specialtyId: specialty.id,
        },
      });
    });

    // Execute all operations
    await Promise.all(specialtyOperations);
  } catch (error) {
    console.error("Error adding customer specialties:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Function to remove customer specialties
async function removeCustomerSpecialties(
  userId: number,
  specialtyNames: string[]
): Promise<void> {
  const prisma = new PrismaClient();

  try {
    // Find the customer
    const customer = await prisma.customer.findUnique({
      where: { userId },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    // Remove specified specialties
    await prisma.customerNeedSpecialty.deleteMany({
      where: {
        customerId: customer.id,
        specialty: {
          name: { in: specialtyNames },
        },
      },
    });
  } catch (error) {
    console.error("Error removing customer specialties:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export {
  PractitionerMatcher,
  addCustomerSpecialties,
  removeCustomerSpecialties,
};
