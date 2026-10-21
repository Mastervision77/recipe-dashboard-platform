import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../../lib/axios";
import { getErrorMessage } from "../../shared/getErrorMessage";
import type { BlogShowResponse, BlogsResponse } from "../types/blogs.types";

const URL = "/ecommerce-articles";
export const blogsKey = ["ecommerce-articles"];

export const PER_PAGE = 10;

const multipart = { headers: { "Content-Type": "multipart/form-data" } };

// قائمة بالـ pagination (الجدول)
export const useBlogsQuery = (page: number) =>
  useQuery({
    queryKey: [...blogsKey, "list", page],
    queryFn: async () =>
      (
        await api.get<BlogsResponse>(URL, {
          params: { page, per_page: PER_PAGE },
        })
      ).data,
    placeholderData: keepPreviousData,
  });

// مقال واحد (صفحة التعديل)
export const useBlogQuery = (id?: number) =>
  useQuery({
    queryKey: [...blogsKey, "show", id],
    queryFn: async () => (await api.get<BlogShowResponse>(`${URL}/${id}`)).data,
    select: (res) => res.data,
    enabled: !!id,
  });

export const useCreateBlog = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) =>
      (await api.post<BlogShowResponse>(URL, formData, multipart)).data,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: blogsKey });
      toast.success("تم إضافة المقال بنجاح");
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error, "حدث خطأ أثناء إضافة المقال"));
    },
  });
};

// تحديث جزئي: كل tab بيبعت الـ keys بتاعته بس (POST زي الـ Postman)
export const useUpdateBlogPart = (id: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
    }: {
      formData: FormData;
      message: string;
    }) => (await api.post(`${URL}/${id}`, formData, multipart)).data,

    onSuccess: (_data, { message }) => {
      qc.invalidateQueries({ queryKey: blogsKey });
      toast.success(message);
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error, "حدث خطأ أثناء حفظ التعديلات"));
    },
  });
};

export const useToggleBlogStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) =>
      (await api.post(`${URL}/${id}/toggle-status`)).data,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: blogsKey });
      toast.success("تم تغيير حالة المقال بنجاح");
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error, "حدث خطأ أثناء تغيير الحالة"));
    },
  });
};

export const useDeleteBlog = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => (await api.delete(`${URL}/${id}`)).data,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: blogsKey });
      toast.success("تم حذف المقال بنجاح");
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error, "حدث خطأ أثناء حذف المقال"));
    },
  });
};
