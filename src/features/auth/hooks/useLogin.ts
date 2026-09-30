import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../api/auth.api";

import { useAuth } from "./useAuth";
import { getErrorMessage } from "../../../lib/getErrorMessage";
import { toast } from "sonner";

export function useLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: loginApi,

       onSuccess: (response) => {
    // const { access_token, user, permissions } = response.data;
    const { access_token, user } = response.data;

    login(user, access_token);
     toast.success("تم تسجيل الدخول بنجاح");

    // لو عندك PermissionContext
    // setPermissions(permissions);

    navigate("//admin/settings/dashboard", { replace: true });
},
 onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    return {
        ...mutation,
        errorMessage: mutation.error
            ? getErrorMessage(mutation.error)
            : null,
    };
}