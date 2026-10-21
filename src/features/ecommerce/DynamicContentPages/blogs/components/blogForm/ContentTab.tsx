import { BilingualField } from "../../../../../informative-website/shared/BilingualField/BilingualField";
import { BilingualError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import {
  labelClass,
  textareaClass,
} from "../../../../../informative-website/shared/stylings/ClassesCss";

export function ContentTab() {
  return (
    <div className="space-y-4" dir="rtl">
      <p className="text-sm text-neutral-500">
        المحتوى بيتخزن كـ HTML (مثال: &lt;p&gt;نص الفقرة&lt;/p&gt;).
      </p>

      <div className="space-y-2">
        <BilingualField
          name="content"
          label="محتوى المقال"
          labelName={labelClass}
          className={`${textareaClass} min-h-[260px]`}
          as="textarea"
        />
        <BilingualError name="content" />
      </div>
    </div>
  );
}
