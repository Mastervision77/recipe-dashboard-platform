import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .required("الاسم مطلوب"),

    phone: Yup.string()
        .trim()
        .required("رقم الهاتف مطلوب"),

    email: Yup.string()
        .email("البريد الإلكتروني غير صحيح")
        .required("البريد الإلكتروني مطلوب"),

    password: Yup.string().when("$isEdit", {
        is: false,
        then: (schema) =>
            schema
                .required("كلمة المرور مطلوبة")
                .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
        otherwise: (schema) => schema.notRequired(),
    }),

    role_id: Yup.number()
        .required("الدور مطلوب")
        .positive("يجب اختيار الدور"),

    is_active: Yup.boolean().required(),
});
