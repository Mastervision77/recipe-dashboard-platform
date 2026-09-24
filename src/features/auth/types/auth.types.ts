export type Permission = {
    name: string;
    label: string;
};

export type Role = {
    id: number;
    name: string;
};

export type AuthUser = {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    role_id: number;
    role: Role;
    is_active: boolean;
    country_code: string;
    currency: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type LoginResponse = {
    status: number;
    message: string;
    errors: unknown;
    data: {
        access_token: string;
        token_type: string;
        expires_in: number;
        user: AuthUser;
        permissions: Permission[];
    };
};