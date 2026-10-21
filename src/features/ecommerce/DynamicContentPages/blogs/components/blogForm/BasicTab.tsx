import { Field } from "formik";
import { BilingualField } from "../../../../../informative-website/shared/BilingualField/BilingualField";
import {
  BilingualError,
  FieldError,
} from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import {
  labelClass,
  textareaClass,
} from "../../../../../informative-website/shared/stylings/ClassesCss";
import { useCategoryOptions } from "../../../categories/api/categories.api";

export function BasicTab() {
  const { data: categories = [], isLoading } = useCategoryOptions();

  return (
    <div className="space-y-6" dir="rtl">
      <div className="space-y-2">
        <label className={labelClass} htmlFor="category_id">
          التصنيف
        </label>
        <Field
          as="select"
          id="category_id"
          name="category_id"
          disabled={isLoading}
          className={textareaClass}
        >
          <option value="">
            {isLoading ? "جاري التحميل..." : "اختاري التصنيف"}
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name?.ar || c.name?.en}
            </option>
          ))}
        </Field>
        <FieldError name="category_id" />
      </div>

      <div className="space-y-2">
        <BilingualField
          name="title"
          label="عنوان المقال"
          labelName={labelClass}
          className={textareaClass}
          as="textarea"
        />
        <BilingualError name="title" />
      </div>

      <div className="space-y-2">
        <BilingualField
          name="subtitle"
          label="العنوان الفرعي"
          labelName={labelClass}
          className={textareaClass}
          as="textarea"
        />
        <BilingualError name="subtitle" />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <Field
            type="checkbox"
            name="is_featured"
            className="h-4 w-4 accent-[#0d5c34]"
          />
          مقال مميز
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <Field
            type="checkbox"
            name="is_tips_secrets"
            className="h-4 w-4 accent-[#0d5c34]"
          />
          نصائح وأسرار
        </label>
      </div>
    </div>
  );
}
