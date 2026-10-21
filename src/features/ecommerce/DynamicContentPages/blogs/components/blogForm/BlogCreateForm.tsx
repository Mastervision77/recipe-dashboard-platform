import { useState } from "react";
import { Form, Formik, setNestedObjectValues } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../shared/components/Button/Button";
import TabsBar from "../../../shared/TabsBar";
import { useCreateBlog } from "../../api/blogs.api";
import { createBlogSchema } from "../../schema/blogs.schema";
import type { BlogFormValues } from "../../types/blogs.types";
import {
  BLOGS_PATH,
  blogInitialValues,
  buildCreateFormData,
} from "../../utils/blogs.utils";
import { blogTabs } from "./blogTabs";

// الإضافة: كل الـ tabs في فورم واحد وحفظ واحد
export default function BlogCreateForm() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateBlog();
  const [active, setActive] = useState(blogTabs[0].id);

  const activeTab = blogTabs.find((t) => t.id === active) ?? blogTabs[0];

  return (
    <Formik<BlogFormValues>
      initialValues={blogInitialValues()}
      validationSchema={createBlogSchema}
      validateOnMount={false}
      onSubmit={async (values) => {
        try {
          await mutateAsync(buildCreateFormData(values));
          navigate(BLOGS_PATH);
        } catch {
          // رسالة الخطأ بتظهر من onError في الـ hook
        }
      }}
    >
      {({ errors, touched, validateForm, setTouched, submitForm }) => {
        const tabHasError = (fields: string[]) =>
          fields.some((f) => (errors as Record<string, unknown>)[f] && (touched as Record<string, unknown>)[f]);

        const handleSave = async () => {
          const errs = await validateForm();

          if (Object.keys(errs).length > 0) {
            // يظهر الأخطاء ويفتح أول tab فيه خطأ
            setTouched(setNestedObjectValues(errs, true), false);
            const firstBad = blogTabs.find((t) =>
              t.fields.some((f) => (errs as Record<string, unknown>)[f]),
            );
            if (firstBad) setActive(firstBad.id);
            return;
          }

          await submitForm();
        };

        return (
          <Form dir="rtl" className="space-y-6">
            <TabsBar
              tabs={blogTabs.map((t) => ({
                id: t.id,
                label: t.label,
                hasError: tabHasError(t.fields),
              }))}
              active={active}
              onChange={setActive}
            />

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              {blogTabs.map((tab) => (
                <div key={tab.id} className={tab.id === activeTab.id ? "" : "hidden"}>
                  <tab.Component />
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 z-10 flex justify-end gap-3 border-t border-gray-200 bg-white py-3">
              <Button
                type="button"
                onClick={() => navigate(BLOGS_PATH)}
                disabled={isPending}
                className="cursor-pointer rounded border border-neutral-300 px-6 py-2 hover:bg-gray-50 disabled:opacity-60"
              >
                إلغاء
              </Button>

              <Button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="cursor-pointer rounded bg-teal-700 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "جاري الحفظ..." : "حفظ المقال"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
