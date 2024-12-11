"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token and user info to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Login successful! Redirecting...");

        // Redirecting based on user role
        if (data.user.role === "CUSTOMER") {
          router.push("/book");
        }
      } else {
        toast.error(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-4 py-8 bg-[#FFF5E6] h-screen">
        <Card className="max-w-md mx-auto bg-white shadow-lg border-[#DCAB90]">
          <CardHeader>
            <CardTitle className="text-[#2C1D14]">Login</CardTitle>
            <CardDescription className="text-[#B78160]">
              Welcome back! Please log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2C1D14]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#DCAB90] focus:ring-[#B78160] text-[#2C1D14]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#2C1D14]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#DCAB90] focus:ring-[#B78160] text-[#2C1D14]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#B78160] text-white hover:bg-[#BE8B69]"
              >
                Log In
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-[#2C1D14]">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#B78160] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
