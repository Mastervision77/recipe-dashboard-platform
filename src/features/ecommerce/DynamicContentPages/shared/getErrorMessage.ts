// بيطلع أوضح رسالة خطأ من رد الـ API (validation errors ثم message ثم fallback)
export const getErrorMessage = (error: any, fallback: string): string => {
  const d = error?.response?.data;

  const firstValidation = d?.errors
    ? (Object.values(d.errors).flat()[0] as string | undefined)
    : undefined;

  return firstValidation || d?.data?.message || d?.message || fallback;
};
