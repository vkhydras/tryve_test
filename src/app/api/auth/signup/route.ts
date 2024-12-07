import prisma from "@/lib/prisma.server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password, fullName, role = "CUSTOMER" } = await req.json();

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
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

    // Create the user in the User table
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        role,
      },
    });

    // Based on the role, create an entry in either the Customer or Practitioner table
    if (role === "CUSTOMER") {
      await prisma.customer.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === "PRACTITIONER") {
      await prisma.practitioner.create({
        data: {
          userId: user.id,
          type: "General", // Default type, you may modify this depending on your requirements
          bio: "", // You can add the bio here or keep it empty as default
        },
      });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
