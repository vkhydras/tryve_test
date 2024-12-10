"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

type SessionUser = {
  id?: number;
  fullName?: string;
  email?: string;
  role?: string;
};

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for stored token and user info
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        // Clear invalid storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset authentication state
    setIsAuthenticated(false);
    setUser(null);

    // Redirect to login
    router.push("/login");
  };

  // Get initials for avatar fallback
  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-gradient-to-r from-teal-700 to-teal-500 text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-teal-200 transition-colors"
          >
            TryveTest
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Navigation links based on user role */}
              {user?.role === "CUSTOMER" && (
                <>
                  <Link
                    href="/customer/dashboard"
                    className="text-white hover:text-teal-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/appointments"
                    className="text-white hover:text-teal-200"
                  >
                    Appointments
                  </Link>
                  <Link href="/book" className="text-white hover:text-teal-200">
                    Book Appointment
                  </Link>
                </>
              )}

              <Link href="/settings" className="text-white hover:text-teal-200">
                Profile Settings
              </Link>

              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.fullName}</span>
              </div>
              <Button
                variant="outline"
                className="bg-white text-teal-600 hover:bg-teal-100"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="space-x-4">
              <Button
                asChild
                variant="ghost"
                className="hover:bg-teal-50 bg-white text-teal-600"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
