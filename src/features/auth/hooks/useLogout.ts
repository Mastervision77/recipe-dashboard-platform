import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "../api/auth.api";
import { useAuth } from "./useAuth";

export function useLogout() {
    const { logout } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutApi,
        // حتى لو الـ API فشل، لازم اليوزر يخرج من عندنا
        onSettled: () => {
            logout();
            queryClient.clear();
            navigate("/login", { replace: true });
        },
    });
}
