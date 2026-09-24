import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import { ecommerceRoutes } from "../../features/ecommerce/routes";
import { recipeRoutes } from "../../features/recipe-platform/routes";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import MainLayout from "../../layouts/MainLayout";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />


                {/* {informativeRoutes} */}

                   <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        {ecommerceRoutes}
                        {recipeRoutes}

                        <Route
                            path="/dashboard"
                            element={<div>Dashboard</div>}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}