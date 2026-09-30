import { useMemo, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { isAxiosError } from "axios";
import { LuLoader } from "react-icons/lu";

import { Button } from "../../../../shared/components/Button/Button";
import { FormLabel } from "../../../../shared/components/FormLabel/FormLabel";
import { useCreateRole, usePermissionsQuery } from "../../api/roles.api";
import type { Permission, RolePayload } from "../../types/roles.types";

type Props = {
    onClose: () => void;
};

const RoleSchema = Yup.object({
    name: Yup.string().trim().required("اسم الدور مطلوب"),
    permissions: Yup.array()
        .of(Yup.number().required())
        .min(1, "اختاري صلاحية واحدة على الأقل"),
});

// لو الباك بيرجّع اسم مترجم/عنوان للصلاحية غيّريه هنا بس
const getPermissionLabel = (p: Permission) => p.name;

const inputClass =
    "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0d5c34] focus:outline-none focus:ring-2 focus:ring-[#0d5c34]/20";

export default function RoleFormDialog({ onClose }: Props) {
    const { mutateAsync, isPending } = useCreateRole();
    const { data: permissions = [], isLoading: permissionsLoading } =
        usePermissionsQuery();
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return permissions;
        return permissions.filter((p) =>
            getPermissionLabel(p).toLowerCase().includes(q),
        );
    }, [permissions, search]);

    const initialValues: RolePayload = { name: "", permissions: [] };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={RoleSchema}
            onSubmit={async (values, { setFieldError }) => {
                try {
                    await mutateAsync({
                        name: values.name.trim(),
                        permissions: values.permissions,
                    });
                    onClose();
                } catch (err) {
                    // أخطاء الـ validation اللي جاية من الباك (422)
                    if (isAxiosError(err)) {
                        const nameError = err.response?.data?.errors?.name?.[0];
                        if (nameError) setFieldError("name", nameError);
                    }
                }
            }}
        >
            {({ values, setFieldValue }) => {
                const selected = new Set(values.permissions);
                const allFilteredSelected =
                    filtered.length > 0 && filtered.every((p) => selected.has(p.id));

                const toggle = (id: number) => {
                    const next = new Set(selected);
                    if (next.has(id)) next.delete(id);
                    else next.add(id);
                    setFieldValue("permissions", [...next]);
                };

                const toggleAll = () => {
                    const next = new Set(selected);
                    filtered.forEach((p) =>
                        allFilteredSelected ? next.delete(p.id) : next.add(p.id),
                    );
                    setFieldValue("permissions", [...next]);
                };

                return (
                    <Form noValidate>
                        {/* Header */}
                        <div className="bg-[#0d5c34] p-5 text-white">
                            <h2 className="text-lg font-bold">إضافة دور جديد</h2>
                        </div>

                        {/* Content */}
                        <div className="space-y-5 p-6">
                            <div>
                                <FormLabel htmlFor="name" required>
                                    اسم الدور
                                </FormLabel>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="مثال: مستقبل"
                                    className={inputClass}
                                />
                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="mt-1 text-sm text-red-600"
                                />
                            </div>

                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700">
                                        الصلاحيات
                                        <span className="ms-1 text-red-500">*</span>
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        تم اختيار {values.permissions.length}
                                    </span>
                                </div>

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="بحث في الصلاحيات..."
                                    className={`${inputClass} mb-2`}
                                />

                                <div className="max-h-64 overflow-y-auto rounded-lg border border-slate-200">
                                    {permissionsLoading ? (
                                        <p className="p-4 text-sm text-slate-500">
                                            جاري التحميل...
                                        </p>
                                    ) : filtered.length === 0 ? (
                                        <p className="p-4 text-sm text-slate-500">
                                            لا توجد صلاحيات
                                        </p>
                                    ) : (
                                        <>
                                            <label className="flex cursor-pointer items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-sm font-semibold">
                                                <input
                                                    type="checkbox"
                                                    checked={allFilteredSelected}
                                                    onChange={toggleAll}
                                                    className="size-4 accent-[#0d5c34]"
                                                />
                                                تحديد الكل
                                            </label>

                                            {filtered.map((p) => (
                                                <label
                                                    key={p.id}
                                                    className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.has(p.id)}
                                                        onChange={() => toggle(p.id)}
                                                        className="size-4 accent-[#0d5c34]"
                                                    />
                                                    {getPermissionLabel(p)}
                                                </label>
                                            ))}
                                        </>
                                    )}
                                </div>

                                <ErrorMessage
                                    name="permissions"
                                    component="p"
                                    className="mt-1 text-sm text-red-600"
                                />
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
                                disabled={isPending}
                                className="flex cursor-pointer items-center gap-2 rounded-full bg-primary-gradient px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isPending && (
                                    <LuLoader size={16} className="animate-spin" />
                                )}
                                حفظ
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}
