import { useMemo } from "react";
import { Form, Formik } from "formik";
import { Button } from "../../../../../../shared/components/Button/Button";
import { useUpdateBlogPart } from "../../api/blogs.api";
import type { BlogApi, BlogFormValues } from "../../types/blogs.types";
import { mapBlogToForm } from "../../utils/blogs.utils";
import type { BlogTab } from "./blogTabs";

type Props = { tab: BlogTab; record: BlogApi };

// فورم مستقل لكل tab: validation + حفظ خاص بيه
export default function BlogPartForm({ tab, record }: Props) {
  const { mutateAsync, isPending } = useUpdateBlogPart(record.id);

  const initialValues = useMemo(() => mapBlogToForm(record), [record]);
  const { Component } = tab;

  return (
    <Formik<BlogFormValues>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={tab.schema}
      onSubmit={async (values) => {
        try {
          await mutateAsync({
            formData: tab.build(values),
            message: tab.savedMessage,
          });
          
        } catch {
          // رسالة الخطأ بتظهر من onError في الـ hook
        }
      }}
    >
      {({ dirty }) => (
        <Form dir="rtl" className="space-y-6">
          <Component />

          <div className="flex justify-end border-t border-gray-200 pt-4">
            <Button
              type="submit"
              disabled={isPending || !dirty}
              className="cursor-pointer rounded bg-teal-700 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
