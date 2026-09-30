import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoginPage from "../../features/auth/pages/LoginPage";
import { ecommerceRoutes } from "../../features/ecommerce/routes";
import { recipeRoutes } from "../../features/recipe-platform/routes";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import MainLayout from "../../layouts/MainLayout";
import { useAuth } from "../../features/auth/hooks/useAuth";
import NotFoundPage from "../../pages/NotFound";
import { informativeRoutes } from "../../features/informative-website/routes";
import { adminRoutes } from "../../features/admin-settings/routes";
import Loading from "../../shared/components/Loading/Loading";
const Dashboard = lazy(
    () => import("../../features/admin-settings/pages/dashboard")
);

export function AppRouter() {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
        <Suspense fallback={<div><Loading /></div>}>
            <Routes>
                {/* Entry point */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={isAuthenticated ? "//admin/settings/dashboard" : "/login"}
                            replace
                        />
                    }
                />

                {/* Public */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="//admin/settings/dashboard" replace />
                        ) : (
                            <LoginPage />
                        )
                    }
                />

                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route
                            path="//admin/settings/dashboard"
                            element={<Dashboard />}
                        />

                        {adminRoutes}
                        {ecommerceRoutes}
                        {recipeRoutes}
                        {informativeRoutes}
                    </Route>
                </Route>

                {/* Unknown URL */}
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
            </Suspense>
        </BrowserRouter>
    );
}