"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type SessionUser = {
  id?: number;
  fullName?: string;
  email?: string;
  role?: string;
};

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Add effect to prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
    onClick,
    className = "",
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`text-[#2C1D14] hover:text-[#B78160] transition-colors ${
          isActive ? "font-semibold" : ""
        } ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#BE8B69] via-[#DCAB90] to-[#EBBBA5] text-[#2C1D14] py-4 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-[#B78160] transition-colors z-50"
          >
            Tryve
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <NavLink href="/customer/home">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/resources">Resources</NavLink>
                <NavLink href="/book">Find Therapists</NavLink>
                <NavLink href="/appointments">Appointments</NavLink>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {getInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="hover:bg-[#B78160] bg-[#FFF5E6] text-[#2C1D14] hover:text-[#FFF5E6]"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/resources">Resources</NavLink>
                <Button
                  asChild
                  variant="ghost"
                  className="hover:bg-[#B78160] bg-[#FFF5E6] text-[#2C1D14] hover:text-[#FFF5E6] ml-4"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#2C1D14] hover:text-[#B78160] z-50 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#FFF5E6] transform transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 mt-16 space-y-6">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {getInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-[#2C1D14]">
                    {user?.fullName}
                  </span>
                </div>
                <NavLink
                  href="/customer/home"
                  onClick={closeMobileMenu}
                  className="block py-2"
                >
                  Home
                </NavLink>
                <NavLink
                  href="/about"
                  onClick={closeMobileMenu}
                  className="block py-2"
                >
                  About
                </NavLink>
                <NavLink
                  href="/resources"
                  onClick={closeMobileMenu}
                  className="block py-2"
                >
                  Resources
                </NavLink>
                <NavLink
                  href="/book"
                  onClick={closeMobileMenu}
                  className="block py-2"
                >
                  Find Therapists
                </NavLink>
                <NavLink
                  href="/appointments"
                  onClick={closeMobileMenu}
                  className="block py-2"
                >
                  Appointments
                </NavLink>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="w-full mt-4 hover:bg-[#B78160] bg-[#DCAB90] text-[#2C1D14] hover:text-[#FFF5E6]"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  href="/about"
                  onClick={closeMobileMenu}
                  className="block py-2"
                >
                  About
                </NavLink>
                <NavLink
                  href="/resources"
                  onClick={closeMobileMenu}
                  className="block py-2"
                >
                  Resources
                </NavLink>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full mt-4 hover:bg-[#B78160] bg-[#DCAB90] text-[#2C1D14] hover:text-[#FFF5E6]"
                  onClick={closeMobileMenu}
                >
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
