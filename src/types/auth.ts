// types/auth.ts
export type SessionUser = {
    id?: number;
    fullName?: string;
    email?: string;
    role?: string;
  };
  
  export type AuthContextType = {
    isAuthenticated: boolean;
    user: SessionUser | null;
    login: (token: string, userData: SessionUser) => void;
    logout: () => void;
    checkAuth: () => void;
  };