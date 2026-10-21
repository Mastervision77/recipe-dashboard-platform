import { useMemo } from "react";
import { Form, Formik } from "formik";
import { Button } from "../../../../../../shared/components/Button/Button";
import { BilingualField } from "../../../../../informative-website/shared/BilingualField/BilingualField";
import { BilingualError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import {
  labelClass,
  textareaClass,
} from "../../../../../informative-website/shared/stylings/ClassesCss";
import { useSaveCategory } from "../../api/categories.api";
import { categorySchema } from "../../schema/categories.schema";
import type {
  CategoryApi,
  CategoryFormValues,
} from "../../types/categories.types";

type Props = {
  category: CategoryApi | null; // null => إضافة | موجود => تعديل
  onClose: () => void;
};

export default function CategoryFormDialog({ category, onClose }: Props) {
  const isEdit = !!category;
  const { mutateAsync, isPending } = useSaveCategory(category?.id);

  const initialValues = useMemo<CategoryFormValues>(
    () => ({
      name: { ar: category?.name?.ar ?? "", en: category?.name?.en ?? "" },
      is_active: category ? Boolean(category.is_active) : true,
    }),
    [category],
  );

  return (
    <Formik<CategoryFormValues>
      initialValues={initialValues}
      validationSchema={categorySchema}
      onSubmit={async (values) => {
        try {
          await mutateAsync(values);
          onClose();
        } catch {
          // رسالة الخطأ بتظهر من onError في الـ hook
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form dir="rtl">
          <div className="bg-[#0d5c34] p-5 text-white">
            <h2 className="text-lg font-bold">
              {isEdit ? "تعديل التصنيف" : "إضافة تصنيف"}
            </h2>
          </div>

          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <BilingualField
                name="name"
                label="اسم التصنيف"
                labelName={labelClass}
                className={textareaClass}
              />
              <BilingualError name="name" />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={values.is_active}
                onChange={(e) => setFieldValue("is_active", e.target.checked)}
                className="h-4 w-4 accent-[#0d5c34]"
              />
              مفعّل
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 p-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="cursor-pointer rounded-full border border-neutral-300 px-6 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
            >
              إلغاء
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer rounded-full bg-[#0d5c34] px-6 py-2 text-sm text-white hover:bg-[#094a29] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
