import prisma from "@/lib/prisma.server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      email,
      password,
      name,
      reason,
      therapistVibe,
      therapyApproach,
      budget,
      preferences,
      sessionType,
    } = data;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use transaction to ensure all related data is created
    await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName: name,
          role: "CUSTOMER",
        },
      });

      // Create customer with related data
      const customer = await prisma.customer.create({
        data: {
          userId: user.id,
          // Create related preferences
          preferences: {
            create:
              preferences?.map((preference: string) => ({
                preference,
              })) || [],
          },
          // Create reason record
          reasons: {
            create: [{ reason }],
          },
          // Store session format preference
          bookings: {
            create: [
              {
                sessionFormat: sessionType,
                startTime: new Date(), // You might want to adjust this based on your needs
                endTime: new Date(Date.now() + 3600000), // Example: 1 hour session
              },
            ],
          },
          // Store therapy approach preference
          customerNeedSpecialties: {
            create: [
              {
                specialty: {
                  connectOrCreate: {
                    where: { name: therapyApproach },
                    create: {
                      name: therapyApproach,
                      description: `${therapistVibe} approach - Budget: ${budget}`,
                    },
                  },
                },
              },
            ],
          },
        },
        include: {
          preferences: true,
          reasons: true,
          bookings: true,
          customerNeedSpecialties: {
            include: {
              specialty: true,
            },
          },
        },
      });

      return { user, customer };
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred during signup", details: error.message },
      { status: 500 }
    );
  }
}
