
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";


import { useLogin } from "../hooks/useLogin";
import type { LoginPayload } from "../types/auth.types";
import { LuLoader } from "react-icons/lu";

const LoginSchema = Yup.object({
  phone: Yup.string().trim().required("رقم الهاتف مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});


export function LoginForm() {
  const { mutateAsync, isPending, errorMessage } = useLogin();

  const initialValues: LoginPayload = {
    phone: "",
    password: "",
  };

  const handleSubmit = async (values: LoginPayload) => {
    try {
      await mutateAsync(values);
    } catch {
      // الخطأ بيتعرض من errorMessage
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-5" noValidate>
        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            رقم الهاتف
          </label>

          <Field
            id="phone"
            name="phone"
            type="text"
            autoComplete="username"
            placeholder="01xxxxxxxxx"
            dir="ltr"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />

          <ErrorMessage
            name="phone"
            component="p"
            className="mt-1 text-sm text-red-600"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            كلمة المرور
          </label>

          <Field
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            dir="ltr"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />

          <ErrorMessage
            name="password"
            component="p"
            className="mt-1 text-sm text-red-600"
          />
        </div>

        {/* API Error */}
        {errorMessage && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600"
          >
            {errorMessage}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-gradient py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending && (
            <LuLoader size={16} className="animate-spin" />
          )}

          تسجيل الدخول
        </button>
      </Form>
    </Formik>
  );
}