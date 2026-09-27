import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { getToken, removeToken, setToken } from "../../../lib/cookies";
import { UNAUTHORIZED_EVENT } from "../../../lib/axios";
import type { AuthUser } from "../types/auth.types";

const USER_KEY = "auth_user";

function getStoredUser(): AuthUser | null {
    try {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}

function setStoredUser(user: AuthUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function removeStoredUser() {
    localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(() => {
        if (!getToken()) return null;

        return getStoredUser();
    });

    const [isLoading] = useState(false);

    // Handle 401 from axios interceptor
    useEffect(() => {
        const onUnauthorized = () => {
            removeToken();
            removeStoredUser();
            setUser(null);
        };

        window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);

        return () => {
            window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
        };
    }, []);

    const login = useCallback((user: AuthUser, token?: string) => {
        if (token) {
            setToken(token);
        }

        setStoredUser(user);
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        removeToken();
        removeStoredUser();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
        }),
        [user, isLoading, login, logout],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}