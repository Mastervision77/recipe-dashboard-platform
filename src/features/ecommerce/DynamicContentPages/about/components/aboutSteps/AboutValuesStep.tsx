import { FieldArray, useField } from "formik";

import { createEmptyValue } from "../../utils/about.utils";
import { BilingualField } from "../../../../../informative-website/shared/BilingualField/BilingualField";
import { labelClass, textareaClass } from "../../../../../informative-website/shared/stylings/ClassesCss";
import { ArrayError, BilingualError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import { Button } from "../../../../../../shared/components/Button/Button";

export function AboutValuesStep() {
  const [field] = useField("values.content");
  const items = field.value || [];

  return (
    <div className="space-y-8" dir="rtl">
      {/* Section header */}
      <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <h3 className="text-base font-bold text-[#0d5c34]">عنوان قسم القيم</h3>

        <div className="space-y-2">
          <BilingualField
            name="values.title"
            label="عنوان القسم"
            labelName={labelClass}
            className={textareaClass}
            as="textarea"
          />
          <BilingualError name="values.title" />
        </div>

        <div className="space-y-2">
          <BilingualField
            name="values.subtitle"
            label="وصف القسم"
            labelName={labelClass}
            className={textareaClass}
            as="textarea"
          />
          <BilingualError name="values.subtitle" />
        </div>
      </div>

      {/* Values */}
      <FieldArray name="values.content">
        {({ push, remove }) => (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0d5c34]">القيم الأساسية</h3>

              <button
                type="button"
                onClick={() => push(createEmptyValue())}
                className="rounded-full bg-[#0d5c34] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#094a29]"
              >
                + إضافة قيمة
              </button>
            </div>

            <ArrayError name="values.content" />

            {items.map((_: unknown, index: number) => (
              <div
                key={index}
                className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-800">
                    القيمة {index + 1}
                  </h4>

                  {items.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      حذف
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <BilingualField
                    name={`values.content[${index}].title`}
                    label="عنوان القيمة"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                  />
                  <BilingualError name={`values.content[${index}].title`} />
                </div>

                <div className="space-y-2">
                  <BilingualField
                    name={`values.content[${index}].subtitle`}
                    label="وصف القيمة"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                  />
                  <BilingualError name={`values.content[${index}].subtitle`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    </div>
  );
}
