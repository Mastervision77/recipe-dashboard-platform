import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { getMe } from "../api/auth.api";
import { getToken, removeToken, setToken } from "../../../lib/cookies";
import { UNAUTHORIZED_EVENT } from "../../../lib/axios";
import type { AuthUser } from "../types/auth.types";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    // لو فيه توكن في الكوكي، لازم نستنى نتأكد منه قبل ما نحكم إن اليوزر مش لوجين
    const [isLoading, setIsLoading] = useState<boolean>(() => !!getToken());

    // استعادة الجلسة بعد الريفريش
    useEffect(() => {
        if (!getToken()) return;

        let cancelled = false;

        getMe()
            .then(({ user }) => {
                if (!cancelled) setUser(user);
            })
            .catch(() => removeToken())
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    // أي 401 من الـ axios interceptor -> اطلع اليوزر
    useEffect(() => {
        const onUnauthorized = () => setUser(null);
        window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
        return () =>
            window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    }, []);

    const login = useCallback((user: AuthUser, token?: string) => {
        if (token) setToken(token);
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({ user, isAuthenticated: !!user, isLoading, login, logout }),
        [user, isLoading, login, logout],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
