"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CustomerQuizStep1() {
  const [heardAboutUs, setHeardAboutUs] = useState("");
  const router = useRouter();

  // Fetch the user's previous selection when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          toast.error("User not logged in. Please log in again.");
          return;
        }

        const response = await fetch(`/api/get-user-data?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        if (data.heardAboutUs) {
          setHeardAboutUs(data.heardAboutUs);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that an option is selected
    if (!heardAboutUs) {
      toast.error("Please select how you heard about us.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const userRole = localStorage.getItem("userRole");

      if (!userId || !userRole) {
        toast.error("User authentication failed. Please log in again.");
        return;
      }

      // Save the user's choice
      const response = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId, 10),
          role: userRole,
          data: {
            heardAboutUs,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update user information"
        );
      }

      // Navigate to the next step
      router.push("/customer/step2");
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Your Therapist - Step 1</CardTitle>
        <CardDescription>Tell us about yourself</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Where did you hear about us?
            </label>
            {[
              { value: "social-media", label: "Social Media" },
              {
                value: "search-engine",
                label: "Search Engine (e.g., Google)",
              },
              {
                value: "friend-referral",
                label: "Friend or Family Referral",
              },
              { value: "advertisement", label: "Advertisement" },
              { value: "other", label: "Other" },
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={value}
                  name="heardAboutUs"
                  value={value}
                  checked={heardAboutUs === value}
                  onChange={() => setHeardAboutUs(value)}
                  className="mr-2"
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Link href="/practitioner/start">
              <Button variant="outline">Back</Button>
            </Link>
            <Button  asChild>
              <Link href="step2">Next</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
