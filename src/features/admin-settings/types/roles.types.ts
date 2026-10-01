import type { ListResponse } from "../../../lib/pagination";

export type Permission = {
  id: number;
  name: string;
  /** الاسم المعروض بالعربي */
  label: string;
  group: string;
  action: string;
};

/** شكل GET /auth/permissions -> data: PermissionGroup[] */
export type PermissionGroup = {
  group: string;
  permissions: Permission[];
};

export type Role = {
  id: number;
  name: string;
  created_at:string;
  permissions?: Permission[];
};

export type RolePayload = {
  name: string;
  permissions: number[];
};

export type RolesResponse = ListResponse<Role>;
