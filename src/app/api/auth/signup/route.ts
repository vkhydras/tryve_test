import prisma from "@/lib/prisma.server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      email,
      password,
      name: fullName,
      dob,
      timezone,
      mentalHealth,
      physicalHealth,
      reasons,
      preferences,
      concerns,
    } = data;

    console.log("data:", data);

    if (!email || !password || !fullName) {
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

    await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName,
          role: "CUSTOMER",
        },
      });

      // Create customer
      const customer = await prisma.customer.create({
        data: {
          userId: user.id,
          dob: dob ? new Date(dob) : null,
          timezone: timezone || null,
          mentalHealth: mentalHealth || null,
          physicalHealth: physicalHealth || null,

          // Create related records for reasons, preferences, and concerns
          reasons: {
            create: reasons?.map((reason: string) => ({ reason })) || [],
          },
          preferences: {
            create:
              preferences?.map((preference: string) => ({ preference })) || [],
          },
          concerns: {
            create: concerns?.map((concern: string) => ({ concern })) || [],
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
