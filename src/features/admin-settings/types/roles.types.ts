import type { ListResponse } from "../../../lib/pagination";


export type Permission = {
  id: number;
  name: string;
};

export type Role = {
  id: number;
  name: string;
  permissions?: Permission[];
};

export type RolePayload = {
  name: string;
  permissions: number[];
};

export type RolesResponse = ListResponse<Role>;
