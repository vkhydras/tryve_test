import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface SignupProps {
  responses: any
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

      // Show closing message
      toast.success(
        "Great job! Based on your answers, we'll match you with therapists who meet your needs. Your path to feeling better starts here.",
        {
          duration: 5000,
          style: {
            background: "#FFF5E6",
            color: "#2C1D14",
            border: "1px solid #B78160",
          },
        }
      );

      // Redirect to login page after a short delay
      setTimeout(() => {
        toast("Redirecting to login...", {
          icon: "👋",
          style: {
            background: "#FFF5E6",
            color: "#2C1D14",
            border: "1px solid #B78160",
          },
        });
        router.push("/login");
      }, 6000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
      toast.error("Signup failed. Please try again.", {
        style: {
          background: "#FFF5E6",
          color: "#B78160",
          border: "1px solid #B78160",
        },
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-[#2C1D14]">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="border-[#DCAB90] focus:ring-[#B78160] text-[#2C1D14]"
            required
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-[#2C1D14]">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className="border-[#DCAB90] focus:ring-[#B78160] text-[#2C1D14]"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-[#2C1D14]"
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
            className="border-[#DCAB90] focus:ring-[#B78160] text-[#2C1D14]"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[#2C1D14]"
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
            className="border-[#DCAB90] focus:ring-[#B78160] text-[#2C1D14]"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button
          type="submit"
          className="w-full bg-[#B78160] text-white hover:bg-[#BE8B69]"
        >
          Create Account
        </Button>
      </form>
    </>
  );
}
