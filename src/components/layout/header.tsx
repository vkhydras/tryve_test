"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";

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
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  const getInitials = (fullName: string | undefined) => {
    if (!fullName) return "";
    const names = fullName.split(" ");
    const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`text-[#2C1D14] hover:text-[#B78160] transition-colors ${
          isActive ? "font-semibold" : ""
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-gradient-to-r from-[#BE8B69] via-[#DCAB90] to-[#EBBBA5] text-[#2C1D14] py-4 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-[#B78160] transition-colors"
          >
            Tryve
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-8">
              <NavLink href="/customer/home">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/resources">Resources</NavLink>
              <NavLink href="/book">Find Therapists</NavLink>
              <NavLink href="/appointments">Appointments</NavLink>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
                </Avatar>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="hover:bg-[#B78160] bg-[#FFF5E6] text-[#2C1D14] hover:text-[#FFF5E6]"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-x-8">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/resources">Resources</NavLink>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-[#B78160] bg-[#FFF5E6] text-[#2C1D14] hover:text-[#FFF5E6] ml-4"
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
