import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma.server";

// Helper function to handle user updates
const updateUser = async (userId: number, data: any, role: string) => {
  // Update the common user information
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      email: data.email || undefined,
      fullName: data.fullName || undefined,
      age: data.age || undefined,
      gender: data.gender || undefined,
      sexualPreferences: data.sexualPreferences || undefined,
      religion: data.religion || undefined,
      culture: data.culture || undefined,
      language: data.language || undefined,
      heardAboutUs: data.heardAboutUs || undefined,
      updatedAt: new Date(), // Update the timestamp
    },
  });

  // If the role is 'CUSTOMER', update the 'Customer' model
  if (role === "CUSTOMER") {
    await prisma.customer.update({
      where: { userId: userId },
      data: {
        // Add any customer-specific fields to update
        // For example, we can add sessions or other fields related to customer
      },
    });
  }

  // If the role is 'PRACTITIONER', update the 'Practitioner' model
  if (role === "PRACTITIONER") {
    await prisma.practitioner.update({
      where: { userId: userId },
      data: {
        type: data.type || undefined,
        bio: data.bio || undefined,
        updatedAt: new Date(), // Update timestamp for practitioner
      },
    });
  }

  return updatedUser;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, role, data } = req.body;

  // Check if userId, role, and data are provided
  if (!userId || !role || !data) {
    return res.status(400).json({ message: "Missing userId, role, or data in the request body" });
  }

  try {
    // Ensure that the role is either 'CUSTOMER' or 'PRACTITIONER'
    if (role !== "CUSTOMER" && role !== "PRACTITIONER") {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Call the updateUser function to update user information in the database
    const updatedUser = await updateUser(userId, data, role);

    // Return success response
    return res.status(200).json({
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong, please try again later" });
  }
}
