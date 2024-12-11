import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
    reasons: responses.reasons || [],
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name" || name === "email") {
      onResponseChange({ [name]: value });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
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

      sessionStorage.removeItem("quizResponses");
      setIsSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        setIsRedirecting(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#2C1D14]">
          Account Created Successfully!
        </h2>
        <p className="text-[#2C1D14]">
          Great job! Based on your answers, we'll match you with therapists who
          meet your needs. Your path to feeling better starts here.
        </p>
        {isRedirecting ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#B78160]" />
            <p className="text-[#2C1D14]">Redirecting to login...</p>
          </div>
        ) : (
          <p className="text-[#2C1D14]">
            You will be redirected to the login page shortly.
          </p>
        )}
      </div>
    );
  }

  return (
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
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
