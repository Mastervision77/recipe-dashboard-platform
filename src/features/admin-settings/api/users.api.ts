import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../lib/axios";
import { queryClient } from "../../../lib/queryClient";
import { getErrorMessage } from "../../../lib/getErrorMessage";
import { normalizeList } from "../../../lib/pagination";
import type {
    User,
    UserPayload,
    UsersResponse,
} from "../types/users.types";



export const usersKey = ["users"] as const;

// GET auth/users
async function fetchUsers(page: number): Promise<UsersResponse> {
    const { data } = await api.get("/auth/users", {
        params: { page , type: "admin",},
    });
    return normalizeList<User>(data);
}

export function useUsersQuery(page: number) {
  return useQuery({
    queryKey: [...usersKey, page],
    queryFn: () => fetchUsers(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}

// GET auth/users/:id  -> موظف واحد (للتعديل)
async function fetchUser(id: number): Promise<User> {
  const { data } = await api.get(`/auth/users/${id}`);
  // الـ response متغلّف: { status, message, data: {...} }
  return data?.data ?? data;
}

export function useUserQuery(id?: number) {
  return useQuery({
    queryKey: [...usersKey, "detail", id],
    queryFn: () => fetchUser(id as number),
    // مفيش طلب في صفحة الإضافة (مفيش id)
    enabled: Number.isFinite(id),
    refetchOnWindowFocus: false,
    // مانحتفظش بنسخة قديمة: كل مرة تفتحي صفحة التعديل بتجيب أحدث داتا
    gcTime: 0,
  });
}


// POST auth/users 
export function useCreateUser() {
  return useMutation({
    mutationFn: async (values: UserPayload) =>
      (await api.post("/auth/users", values)).data,
    onSuccess: () => {
      toast.success("تمت إضافة موظف بنجاح");
      // staleTime = Infinity، فلازم نعمل invalidate يدوي
      queryClient.invalidateQueries({ queryKey: usersKey });
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
}

// update
export function useUpdateUser() {
  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: number;
      values: UserPayload;
    }) => (await api.put(`/auth/users/${id}`, values)).data,

    onSuccess: () => {
      toast.success("تم تعديل الموظف بنجاح");

      queryClient.invalidateQueries({
        queryKey: usersKey,
      });
    },

    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
}



export function useDeleteUser() {
    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await api.delete(`/auth/users/${id}`);
            return data;
        },

        onSuccess: () => {
            toast.success("تم حذف الموظف بنجاح");

            queryClient.invalidateQueries({
                queryKey: usersKey,
            });
        },

        onError: (err) => {
            toast.error(getErrorMessage(err));
        },
    });
}