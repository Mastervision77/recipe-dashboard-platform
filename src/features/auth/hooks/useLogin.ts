import { useMutation } from "@tanstack/react-query";
import {  useNavigate } from "react-router-dom";

import { login as loginApi } from "../api/auth.api";
import type { LoginPayload } from "../types/auth.types";
import { useAuth } from "./useAuth";
import { getErrorMessage } from "../../../lib/getErrorMessage";

export function useLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (payload: LoginPayload) => loginApi(payload),
        onSuccess: (data) => {
            login(data.user, data.access_token);
             navigate("/dashboard")
        },
    });

    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    };
}
