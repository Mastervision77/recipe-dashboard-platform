import { createContext } from "react";
import type { AuthUser } from "../types/auth.types";

export type AuthContextType = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: AuthUser, token?: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);
