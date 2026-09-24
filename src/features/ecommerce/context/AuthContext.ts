import { createContext } from "react";

export type User = {
    id: number;
    name: string;
    email: string;
};

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);