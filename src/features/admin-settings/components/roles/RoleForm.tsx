import { Form, Formik, Field, ErrorMessage } from "formik";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { Button } from "../../../../shared/components/Button/Button";
import { FormLabel } from "../../../../shared/components/FormLabel/FormLabel";
import { useCreateRole, usePermissionsQuery } from "../../api/roles.api";
import type { RolePayload } from "../../types/roles.types";
import PermissionGroupCard from "./PermissionGroupCard";
import { RoleSchema } from "../../schema/roles.schema";
import { inputClass } from "../../../informative-website/shared/stylings/ClassesCss";
import Loading from "../../../../shared/components/Loading/Loading";



const LIST_PATH = "/admin/settings/roles";

export default function RoleForm() {
    const navigate = useNavigate();
    const { mutateAsync, isPending  } = useCreateRole();
    const { data: groups = [], isLoading, isError } = usePermissionsQuery();

    const allIds = groups.flatMap((g) => g.permissions.map((p) => p.id));

    const initialValues: RolePayload = { name: "", permissions: [] };


    if(isLoading) return <Loading />;

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
                    navigate(LIST_PATH);
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
                const allSelected =
                    allIds.length > 0 && allIds.every((id) => selected.has(id));

                const toggle = (id: number) => {
                    const next = new Set(selected);
                    if (next.has(id)) next.delete(id);
                    else next.add(id);
                    setFieldValue("permissions", [...next]);
                };

                const toggleGroup = (ids: number[], checked: boolean) => {
                    const next = new Set(selected);
                    ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
                    setFieldValue("permissions", [...next]);
                };

                const toggleAll = () =>
                    setFieldValue("permissions", allSelected ? [] : allIds);

                return (
                    <Form noValidate className="space-y-6">
                        {/* اسم الدور */}
                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                            <FormLabel htmlFor="name" required>
                                اسم الدور
                            </FormLabel>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                placeholder="مثال: ادمن"
                                className={`${inputClass} max-w-md`}
                            />
                            <ErrorMessage
                                name="name"
                                component="p"
                                className="mt-1 text-sm text-red-600"
                            />
                        </div>

                        {/* الصلاحيات */}
                        <div>
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-base font-bold text-gray-800">
                                        الصلاحيات
                                        <span className="ms-1 text-red-500">*</span>
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        تم اختيار {values.permissions.length} من{" "}
                                        {allIds.length}
                                    </p>
                                </div>

                                {allIds.length > 0 && (
                                    <Button
                                        type="button"
                                        onClick={toggleAll}
                                        className="cursor-pointer rounded-full border border-[#0d5c34] px-4 py-1.5 text-sm font-semibold text-[#0d5c34] transition-colors hover:bg-[#0d5c34] hover:text-white"
                                    >
                                        {allSelected ? "إلغاء تحديد الكل" : "تحديد كل الصلاحيات"}
                                    </Button>
                                )}
                            </div>

                            {isLoading ? (
                                <p className="text-sm text-gray-500">جاري التحميل...</p>
                            ) : isError ? (
                                <p className="text-sm text-red-600">
                                    تعذر تحميل الصلاحيات
                                </p>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {groups.map((g) => (
                                        <PermissionGroupCard
                                            key={g.group}
                                            group={g}
                                            selected={selected}
                                            onToggle={toggle}
                                            onToggleGroup={toggleGroup}
                                        />
                                    ))}
                                </div>
                            )}

                            <ErrorMessage
                                name="permissions"
                                component="p"
                                className="mt-2 text-sm text-red-600"
                            />
                        </div>

                        {/* Actions */}
                        <div className="sticky bottom-0 -mx-1 flex justify-end gap-3 border-t border-gray-100 bg-background/90 px-1 py-4 backdrop-blur">
                            <Button
                                type="button"
                                onClick={() => navigate(LIST_PATH)}
                                className="cursor-pointer rounded-full border border-neutral-300 px-6 py-2 text-sm hover:bg-gray-50"
                            >
                                إلغاء
                            </Button>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="flex cursor-pointer items-center gap-2 rounded-full bg-secondary-gradient px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
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
