
import type { User, UserPayload } from "../../../types/users.types";
import { useCreateUser, useUpdateUser } from "../../../api/users.api";
import {
    Field,
    Form,
    Formik,
    ErrorMessage,
} from "formik";
import { validationSchema } from "../../../schema/users.schema";
import RoleSelect from "../select/RoleSelect";
import { Button } from "../../../../../shared/components/Button/Button";

type Props = {
    user: User | null;
    onClose: () => void;
};

type FormValues = {
    name: string;
    phone: string;
    email: string;
    password: string;
    role_id: number;
    is_active: boolean;
};

export default function UpateAddDialog({
    user,
    onClose,
}: Props) {
    const isEdit = !!user;

    const { mutateAsync: createUser } = useCreateUser();
    const { mutateAsync: updateUser } = useUpdateUser();

    const initialValues: FormValues = {
        name: user?.name ?? "",
        phone: user?.phone ?? "",
        email: user?.email ?? "",
        password: "",
        role_id: user?.role_id ?? 0,
        is_active: user?.is_active ?? true,
    };

    const handleSubmit = async (values: FormValues) => {
        const payload: UserPayload = {
            name: values.name.trim(),
            phone: values.phone.trim(),
            email: values.email.trim(),
            type: "admin",
            role_id: values.role_id,
            country_code: "EG",
            currency: "EGP",
            is_active: values.is_active,
            ...(values.password
                ? { password: values.password }
                : {}),
        };

        try {
            if (isEdit && user) {
                await updateUser({
                    id: user.id,
                    values: payload,
                });
            } else {
                await createUser(payload);
            }

            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Formik
            key={user?.id ?? "new"}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="w-full ">

                    {/* Header */}
                    <div className="bg-[#0d5c34] p-5 text-white">
                        <h2 className="text-lg font-bold">
                            {isEdit ? "تعديل موظف" : "إضافة موظف"}
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="grid gap-5 p-6 sm:grid-cols-2">

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                الاسم
                            </label>

                            <Field
                                id="name"
                                name="name"
                                type="text"
                                placeholder="محمد أحمد"
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-[#0d5c34]"
                            />

                            <ErrorMessage
                                name="name"
                                component="p"
                                className="mt-1 text-xs text-red-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                رقم الهاتف
                            </label>

                            <Field
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="01000050400000"
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-[#0d5c34]"
                            />

                            <ErrorMessage
                                name="phone"
                                component="p"
                                className="mt-1 text-xs text-red-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                البريد الإلكتروني
                            </label>

                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@recipe.com"
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-[#0d5c34]"
                            />

                            <ErrorMessage
                                name="email"
                                component="p"
                                className="mt-1 text-xs text-red-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                {isEdit
                                    ? "كلمة المرور الجديدة"
                                    : "كلمة المرور"}
                            </label>

                            <Field
                                id="password"
                                name="password"
                                type="password"
                                placeholder={
                                    isEdit
                                        ? "اتركها فارغة إذا لم ترد تغييرها"
                                        : "••••••••"
                                }
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-[#0d5c34]"
                            />

                            <ErrorMessage
                                name="password"
                                component="p"
                                className="mt-1 text-xs text-red-500"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label
                                htmlFor="role_id"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                الدور
                            </label>

                            <RoleSelect name="role_id" />

                            <ErrorMessage
                                name="role_id"
                                component="p"
                                className="mt-1 text-xs text-red-500"
                            />
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-3 self-end pb-2">
                            <Field
                                id="is_active"
                                name="is_active"
                                type="checkbox"
                                className="h-4 w-4 accent-[#0d5c34]"
                            />

                            <label
                                htmlFor="is_active"
                                className="text-sm font-medium text-gray-700"
                            >
                                المستخدم نشط
                            </label>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-gray-100 p-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-full border border-neutral-300 px-6 py-2 text-sm hover:bg-gray-50"
                        >
                            إلغاء
                        </Button>

                        <Button
                            type="submit"
                            className="cursor-pointer rounded-full bg-[#0d5c34] px-6 py-2 text-sm text-white hover:opacity-90"
                        >
                            {isEdit
                                ? "حفظ التعديلات"
                                : "إضافة موظف"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
