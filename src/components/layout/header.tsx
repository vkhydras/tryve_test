"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  User,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    // Uncomment the following block to simulate a logged-in user

    if (!document.cookie.includes("session-token")) {
      document.cookie = "session-token=mock-token; path=/";
      console.log("Simulated login: session token set.");
    }

    const sessionToken = document.cookie.includes("session-token");
    setIsAuthenticated(sessionToken);

    if (sessionToken) {
      setUser({
        name: "John Doe",
        email: "john@example.com",
        role: "PRACTITIONER",
      });
    }
  }, []);

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
              <span className="text-sm font-medium">{user?.name}</span>
              <Avatar>
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-teal-600"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-teal-500 text-white " align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <Link href='/settings'>Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <Link href='/messages'>Messages</Link>
                  </DropdownMenuItem>
                  {user?.role === "CUSTOMER" && (
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <Link href='/book'>Book Appointment</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <Link href='/appointments'>Appointments</Link>
                  </DropdownMenuItem>
                  {user?.role === "PRACTITIONER" && (
                    <>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <Link href='/schedule'>Set Schedule</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <Link href='/payments'>Set Payment</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      document.cookie =
                        "session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      window.location.href = "/login";
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <Button>Log out</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="space-x-4">
              <Button
                asChild
                variant="ghost"
                className="text-white hover:bg-teal-600"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white text-teal-600 hover:bg-teal-100"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
