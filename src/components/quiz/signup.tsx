import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface SignupProps {
  responses: {
    name: string;
    email: string;
    reasons: string[];
    dob?: Date;
    timezone?: string;
    mentalHealth?: string;
    physicalHealth?: string;
    preferences?: string[];
    concerns?: string[];
  };
  onResponseChange: (response: { [key: string]: string }) => void;
}

export default function Signup({ responses, onResponseChange }: SignupProps) {
  const [formData, setFormData] = useState({
    name: responses.name || "",
    email: responses.email || "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Only update parent state for name and email
    if (name === "name" || name === "email") {
      onResponseChange({ [name]: value });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Combine form data with all responses
      const signupData = {
        ...responses,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        // Convert date to ISO string if it exists
        dob: responses.dob ? responses.dob.toISOString() : undefined,
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      // Clear session storage
      sessionStorage.removeItem("quizResponses");

      // Show success toast
      toast.success("Account created successfully!");

      // Redirect to login page after a short delay
      setTimeout(() => {
        toast("Redirecting to login...", {
          icon: "👋",
        });
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-teal-700">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="border-teal-300 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-teal-700">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className="border-teal-300 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-teal-700"
          >
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a password"
            className="border-teal-300 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-teal-700"
          >
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            className="border-teal-300 focus:ring-teal-500"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button
          type="submit"
          className="w-full bg-teal-600 text-white hover:bg-teal-700"
        >
          Create Account
        </Button>
      </form>
    </>
  );
}
