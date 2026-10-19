import { FieldArray, useField } from "formik";
import { createEmptySlide } from "../../utils/about.utils";
import { ArrayError, BilingualError, FieldError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import { Button } from "../../../../../../shared/components/Button/Button";
import { ImageUploadField } from "../../../../../informative-website/shared/ImageUploadField/ImageUploadField";
import { BilingualField } from "../../../../../informative-website/shared/BilingualField/BilingualField";
import { labelClass, textareaClass } from "../../../../../informative-website/shared/stylings/ClassesCss";

export function SliderStep() {
  const [field] = useField("slider");
  const slides = field.value || [];

  return (
    <FieldArray name="slider">
      {({ push, remove }) => (
        <div className="space-y-5" dir="rtl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0d5c34]">شرائح السلايدر</h3>

            <button
              type="button"
              onClick={() => push(createEmptySlide())}
              className="rounded-full bg-[#0d5c34] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#094a29]"
            >
              + إضافة شريحة
            </button>
          </div>

          <ArrayError name="slider" />

          {slides.map((_: unknown, index: number) => (
            <div
              key={index}
              className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-neutral-800">
                  الشريحة {index + 1}
                </h4>

                {slides.length > 1 && (
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
                <ImageUploadField
                  name={`slider[${index}].img`}
                  label="صورة الشريحة"
                />
                <FieldError name={`slider[${index}].img`} />
              </div>

              <div className="space-y-2">
                <BilingualField
                  name={`slider[${index}].title`}
                  label="عنوان الشريحة"
                  labelName={labelClass}
                  className={textareaClass}
                  as="textarea"
                />
                <BilingualError name={`slider[${index}].title`} />
              </div>

              <div className="space-y-2">
                <BilingualField
                  name={`slider[${index}].subtitle`}
                  label="وصف الشريحة"
                  labelName={labelClass}
                  className={textareaClass}
                  as="textarea"
                />
                <BilingualError name={`slider[${index}].subtitle`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  );
}
