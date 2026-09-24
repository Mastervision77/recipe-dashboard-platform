import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // بنتأكد من التوكن بعد الريفريش، متحولش على /login قبل ما نخلص
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                جاري التحميل...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
