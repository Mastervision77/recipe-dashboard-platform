import { Field } from "formik";
import { BilingualField } from "../../../../../informative-website/shared/BilingualField/BilingualField";
import { labelClass, textareaClass } from "../../../../../informative-website/shared/stylings/ClassesCss";
import { BilingualError, FieldError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";


export function BasicStep() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="space-y-2">
        <BilingualField
          name="title"
          label="عنوان الصفحة"
          labelName={labelClass}
          className={textareaClass}
          as="textarea"
        />
        <BilingualError name="title" />
      </div>

      <div className="space-y-2">
        <BilingualField
          name="subtitle"
          label="الوصف التعريفي"
          labelName={labelClass}
          className={textareaClass}
          as="textarea"
        />
        <BilingualError name="subtitle" />
      </div>

      <div className="space-y-2">
        <label className={labelClass} htmlFor="video_url">
          رابط الفيديو (اختياري)
        </label>
        <Field
          id="video_url"
          name="video_url"
          dir="ltr"
          placeholder="https://www.youtube.com/watch?v=..."
          className={textareaClass}
        />
        <FieldError name="video_url" />
      </div>
    </div>
  );
}
