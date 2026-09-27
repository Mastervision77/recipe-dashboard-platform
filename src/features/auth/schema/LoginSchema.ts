import * as Yup from "yup";

export const LoginSchema = Yup.object({
  phone: Yup.string().trim().required("رقم الهاتف مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});