import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../api/auth.api";

import { useAuth } from "./useAuth";
import { getErrorMessage } from "../../../lib/getErrorMessage";

export function useLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: loginApi,

       onSuccess: (response) => {
    const { access_token, user, permissions } = response.data;

    login(user, access_token);

    // لو عندك PermissionContext
    // setPermissions(permissions);

    navigate("/dashboard", { replace: true });
},
    });

    return {
        ...mutation,
        errorMessage: mutation.error
            ? getErrorMessage(mutation.error)
            : null,
    };
}