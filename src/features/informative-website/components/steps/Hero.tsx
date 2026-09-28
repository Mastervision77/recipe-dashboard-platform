

import { BilingualField } from "../../shared/BilingualField/BilingualField";
import { labelClass, textareaClass } from "../../shared/stylings/ClassesCss";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";


export function HeroStep() {




  return (
    <div className="space-y-6" dir="rtl">
      <ImageUploadField
                    name="header.img"
                    label="صورة الرئيسية"
                />

      <BilingualField name="header.title" as="textarea" labelName={labelClass} className={textareaClass}  label="عنوان الواجهة الرئيسية" />

      <BilingualField
      labelName={labelClass} className={textareaClass} 
        name="header.subtitle"
        label="الوصف التعريفي"
        as="textarea"
      />
    </div>
  );
}
