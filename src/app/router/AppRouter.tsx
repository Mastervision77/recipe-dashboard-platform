import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../../features/auth/pages/LoginPage";
import { ecommerceRoutes } from "../../features/ecommerce/routes";
import { recipeRoutes } from "../../features/recipe-platform/routes";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import MainLayout from "../../layouts/MainLayout";
import { useAuth } from "../../features/auth/hooks/useAuth";
import NotFoundPage from "../../pages/NotFound";

export function AppRouter() {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* Entry point */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={isAuthenticated ? "/dashboard" : "/login"}
                            replace
                        />
                    }
                />

                {/* Public */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <LoginPage />
                        )
                    }
                />

                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route
                            path="/dashboard"
                            element={<div>Dashboard</div>}
                        />

                        {ecommerceRoutes}
                        {recipeRoutes}

                        {/* {informativeRoutes} */}
                    </Route>
                </Route>

                {/* Unknown URL */}
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}