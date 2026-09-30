import type { ListResponse } from "../../../lib/pagination";

export type UserPermission = {
    id: number;
    name: string;
    label: string;
};

export type UserRole = {
    id: number;
    name: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    role_id: number;
    role: UserRole;
    is_active: boolean;
    country_code: string;
    currency: string;
    permissions: UserPermission[];
};

export type UserPayload = {
    name: string;
    email: string;
    phone: string;
    type: string;
    role_id: number;
    is_active: boolean;
    country_code: string;
    currency: string;
};


export type UsersResponse = ListResponse<User>;