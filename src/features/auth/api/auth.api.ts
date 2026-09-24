import { api } from "../../../lib/axios";
import type {
    LoginPayload,
    LoginResponse,
    MeResponse,
} from "../types/auth.types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
}

export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}

// بيرجّع بيانات اليوزر من التوكن (لاستعادة الجلسة بعد الريفريش)
export async function getMe(): Promise<MeResponse> {
    const { data } = await api.get<MeResponse>("/auth/me");
    return data;
}
