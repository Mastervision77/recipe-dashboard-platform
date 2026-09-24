import { api } from "../../../lib/axios";
import type {
    LoginPayload,
    LoginResponse,

} from "../types/auth.types";



export async function login(
    payload: LoginPayload
): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>(
        "/auth/login",
        payload
    );

    return data;
}

export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}

