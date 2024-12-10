// contexts/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, SessionUser } from "@/types/auth";

// Create a context with a meaningful default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const router = useRouter();

  // Define checkAuth as a useCallback to prevent unnecessary recreations
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  }, []);

  // Check authentication status on mount and set up storage event listener
  useEffect(() => {
    checkAuth();

    // Create a storage event handler
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        checkAuth();
      }
    };

    // Add event listeners for both storage and custom auth events
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authStateChange", checkAuth);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChange", checkAuth);
    };
  }, [checkAuth]);

  // Improved login function with proper error handling
  const login = async (token: string, userData: SessionUser) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setIsAuthenticated(true);
      setUser(userData);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("authStateChange"));

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Improved logout function
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Update state
      setIsAuthenticated(false);
      setUser(null);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("authStateChange"));

      // Navigate to login page
      router.push("/login");
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Improved useAuth hook with better error handling
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
