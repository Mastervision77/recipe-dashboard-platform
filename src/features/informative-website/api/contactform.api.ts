import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../lib/axios";
import { queryClient } from "../../../lib/queryClient";
import type {
  ContactFormPayload,
  ContactFormResponse,
} from "../types/contact.types";

export const contactFormKey = ["contact-form"] as const;

async function fetchContactForm(): Promise<ContactFormResponse> {
  const { data } = await api.get<ContactFormResponse>("/landingcontactform");
  return data;
}

export function useContactFormQuery() {
  return useQuery({
    queryKey: contactFormKey,
    queryFn: fetchContactForm,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}

// One mutation for both add (no id) and edit (with id)
export function useSaveContactForm() {
  return useMutation({
    mutationFn: async ({ id, values }: { id?: number; values: ContactFormPayload }) => {
      const res = id
        ? await api.put(`/landingcontactform/${id}`, values)
        : await api.post("/landingcontactform", values);
      return res.data;
    },
    onSuccess: (_data, { id }) => {
      toast.success(id ? "تم التحديث بنجاح" : "تمت الإضافة بنجاح");
      // staleTime is Infinity, so the list must be invalidated manually
      queryClient.invalidateQueries({ queryKey: contactFormKey });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما");
    },
  });
}

export function useDeleteContactForm() {
  return useMutation({
    mutationFn: async (id: number) => (await api.delete(`/landingcontactform/${id}`)).data,
    onSuccess: () => {
      toast.success("تم الحذف بنجاح");
      queryClient.invalidateQueries({ queryKey: contactFormKey });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "حدث خطأ ما");
    },
  });
}
