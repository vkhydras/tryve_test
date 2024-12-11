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
      therapyStyle,
      budget,
      preferences,
      sessionType,
      previousExperience,
    } = data;

    console.log("Received data:", data);

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

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

    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName: name,
          role: "CUSTOMER",
        },
      });

      const customer = await prisma.customer.create({
        data: {
          userId: user.id,
          reason,
          therapistVibe,
          therapyApproach: therapyStyle,
          budget,
          sessionType,
          previousExperience,

          ...(preferences && preferences.length > 0
            ? {
                preferences: {
                  create: preferences.map((preference: string) => ({
                    preference,
                  })),
                },
              }
            : {}),

          ...(reason
            ? {
                reasons: {
                  create: [{ reason }],
                },
              }
            : {}),

          ...(sessionType
            ? {
                bookings: {
                  create: [
                    {
                      sessionFormat: sessionType,
                      startTime: new Date(),
                      endTime: new Date(Date.now() + 3600000),
                      status: "PENDING",
                    },
                  ],
                },
              }
            : {}),

          ...(therapyStyle
            ? {
                customerNeedSpecialties: {
                  create: [
                    {
                      specialty: {
                        connectOrCreate: {
                          where: { name: therapyStyle },
                          create: {
                            name: therapyStyle,
                            description: `${
                              therapistVibe || "Not specified"
                            } approach - Budget: ${budget || "Not specified"}`,
                          },
                        },
                      },
                    },
                  ],
                },
              }
            : {}),
        },
      });

      return { user, customer };
    });

    console.log("Created user and customer:", result);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch {
    console.error("Signup error:");

    return NextResponse.json(
      {
        error: "An error occurred during signup",
      },
      { status: 500 }
    );
  }
}
