
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { AboutData, AboutResponse } from "../types/about.types";
import { buildAboutFormData } from "../utils/about.utils";
import { api } from "../../../../../lib/axios";
import { toast } from "sonner";

const URL = "/ecommerce-abouts";
const KEY = ["ecommerce-about"];

export const useAboutQuery = () =>
  useQuery({
    queryKey: KEY,
    queryFn: async () => (await api.get<AboutResponse>(URL)).data,
  });

// id موجود => تعديل | مفيش => إنشاء
export const useSaveAbout = (id?: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (values: AboutData) => {
      const formData = buildAboutFormData(values);

      if (id) {
        formData.append("_method", "PUT");

        const res = await api.post(`${URL}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data;
      }

      const res = await api.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
      toast.success("تم حفظ المحتوى بنجاح");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.data?.message ||
          "حدث خطأ أثناء حفظ المحتوى"
      );
    },
  });
};
