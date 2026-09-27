
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLogin } from "../hooks/useLogin";
import type { LoginPayload } from "../types/auth.types";
import { LuLoader } from "react-icons/lu";
import { Button } from "../../../shared/components/Button/Button";
import { LoginSchema } from "../schema/LoginSchema";
import { FormLabel } from "../../../shared/components/FormLabel/FormLabel";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";


export function LoginForm() {
  const { mutateAsync, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: LoginPayload = {
    phone: "",
    password: "",
  };

  const handleSubmit = async (values: LoginPayload) => {
    await mutateAsync(values);
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

          <FormLabel htmlFor="phone" required>
            رقم الهاتف
          </FormLabel>

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
          <FormLabel htmlFor="password" required>
            كلمة المرور
          </FormLabel>

          <div className="relative">
            <Field
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              dir="ltr"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />

            <Button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-s-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            >

              {
                showPassword ? (
                  <LuEye size={18} />
                ) : (
                  <LuEyeOff size={18} />
                )
              }
            </Button>
          </div>


          <ErrorMessage
            name="password"
            component="p"
            className="mt-1 text-sm text-red-600"
          />
        </div>


        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center cursor-pointer gap-2 rounded-lg bg-primary-gradient py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending && (
            <LuLoader size={16} className="animate-spin" />
          )}

          تسجيل الدخول
        </Button>
      </Form>
    </Formik>
  );
}