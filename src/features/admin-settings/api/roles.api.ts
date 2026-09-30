import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../lib/axios";
import { queryClient } from "../../../lib/queryClient";
import { getErrorMessage } from "../../../lib/getErrorMessage";
import { normalizeList } from "../../../lib/pagination";
import type { PermissionGroup, Role, RolePayload, RolesResponse } from "../types/roles.types";



export const rolesKey = ["roles"] as const;
export const permissionsKey = ["permissions"] as const;

// GET auth/roles
async function fetchRoles(page: number): Promise<RolesResponse> {
  const { data } = await api.get("/auth/roles", { params: { page } });
  return normalizeList<Role>(data);
}

export function useRolesQuery(page: number) {
  return useQuery({
    queryKey: [...rolesKey, page],
    queryFn: () => fetchRoles(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}

// GET /auth/permissions
// بيرجّع الصلاحيات متقسمة جروبات: [{ group, permissions: [...] }]
async function fetchPermissions(): Promise<PermissionGroup[]> {
  const { data } = await api.get("/auth/permissions");
  return Array.isArray(data?.data) ? data.data : [];
}

export function usePermissionsQuery(enabled = true) {
  return useQuery({
    queryKey: permissionsKey,
    queryFn: fetchPermissions,
    enabled,
    refetchOnWindowFocus: false,
  });
}

// POST auth/roles  { name, permissions: number[] }
export function useCreateRole() {
  return useMutation({
    mutationFn: async (values: RolePayload) =>
      (await api.post("/auth/roles", values)).data,
    onSuccess: () => {
      toast.success("تمت إضافة الدور بنجاح");
      // staleTime = Infinity، فلازم نعمل invalidate يدوي
      queryClient.invalidateQueries({ queryKey: rolesKey });
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
}
