

import * as Yup from "yup";
export const RoleSchema = Yup.object({
    name: Yup.string().trim().required("اسم الدور مطلوب"),
    permissions: Yup.array()
        .of(Yup.number().required())
        .min(1, "اختاري صلاحية واحدة على الأقل"),
});
