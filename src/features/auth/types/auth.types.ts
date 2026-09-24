export type UserType = "admin";

export interface Permission {
    name: string;
    label: string;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: UserType;
    role_id: number;
    role: {
        id: number;
        name: string;
    };
    is_active: boolean;
    country_code: string;
    currency: string;
    permissions: Permission[];
}

export interface LoginPayload {
    phone: string;
    password: string;
}

export interface LoginResponse {
    user: AuthUser;
    access_token: string;
}

export interface MeResponse {
    user: AuthUser;
}
