import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../../lib/axios";
import { getErrorMessage } from "../../shared/getErrorMessage";
import type {
  CategoriesResponse,
  CategoryFormValues,
} from "../types/categories.types";

const URL = "/ecommerce-article-categories";
export const categoriesKey = ["ecommerce-article-categories"];

export const PER_PAGE = 10;

// قائمة بالـ pagination (الجدول)
export const useCategoriesQuery = (page: number) =>
  useQuery({
    queryKey: [...categoriesKey, "list", page],
    queryFn: async () =>
      (
        await api.get<CategoriesResponse>(URL, {
          params: { page, per_page: PER_PAGE },
        })
      ).data,
    placeholderData: keepPreviousData,
  });

// كل التصنيفات (للـ select في فورم المقال)
export const useCategoryOptions = () =>
  useQuery({
    queryKey: [...categoriesKey, "options"],
    queryFn: async () =>
      (
        await api.get<CategoriesResponse>(URL, {
          params: { per_page: 100 },
        })
      ).data,
    select: (res) => res.data,
  });

// id موجود => تعديل | مفيش => إضافة
export const useSaveCategory = (id?: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      const body = {
        name: { ar: values.name.ar.trim(), en: values.name.en.trim() },
        is_active: values.is_active,
      };

      const res = id
        ? await api.put(`${URL}/${id}`, body)
        : await api.post(URL, body);

      return res.data;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKey });
      toast.success(id ? "تم تعديل التصنيف بنجاح" : "تم إضافة التصنيف بنجاح");
    },

    onError: (error: any) => {
      toast.error(
        getErrorMessage(
          error,
          id ? "حدث خطأ أثناء تعديل التصنيف" : "حدث خطأ أثناء إضافة التصنيف",
        ),
      );
    },
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => (await api.delete(`${URL}/${id}`)).data,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKey });
      toast.success("تم حذف التصنيف بنجاح");
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error, "حدث خطأ أثناء حذف التصنيف"));
    },
  });
};
