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
    <div className="min-h-screen bg-teal-50 flex items-center justify-center">
      <Card className="max-w-lg w-full bg-white shadow-lg rounded-xl border border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-500 text-xl font-semibold">
         
          </CardTitle>
          <CardDescription className="text-teal-600">
            Help us get to know you better
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-teal-600 text-sm font-medium mb-2">
                Where did you hear about us?
              </label>
              <div className="space-y-4">
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
                  <div key={value} className="flex items-center">
                    <input
                      type="radio"
                      id={value}
                      name="heardAboutUs"
                      value={value}
                      checked={heardAboutUs === value}
                      onChange={() => setHeardAboutUs(value)}
                      className="form-radio text-teal-500 h-5 w-5 mr-3"
                    />
                    <label htmlFor={value} className="text-teal-700">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Link href="/practitioner/start">
                <Button
                  variant="outline"
                  className="w-full md:w-auto text-teal-600 hover:text-teal-700 border-teal-500 hover:border-teal-600"
                >
                  Back
                </Button>
              </Link>
              <Button className="w-full md:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-md transition-all duration-200 ease-in-out">
                <Link href="step2">Next</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
