import { BilingualField } from "../../../../../informative-website/shared/BilingualField/BilingualField";
import { BilingualError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import {
  labelClass,
  textareaClass,
} from "../../../../../informative-website/shared/stylings/ClassesCss";

export function QuoteTab() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="space-y-2">
        <BilingualField
          name="quote"
          label="الاقتباس (اختياري)"
          labelName={labelClass}
          className={textareaClass}
          as="textarea"
        />
        <BilingualError name="quote" />
      </div>

      <div className="space-y-2">
        <BilingualField
          name="quote_author"
          label="صاحب الاقتباس (اختياري)"
          labelName={labelClass}
          className={textareaClass}
          as="textarea"
        />
        <BilingualError name="quote_author" />
      </div>
    </div>
  );
}
