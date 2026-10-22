import { useState } from "react";
import { useField } from "formik";
import { BilingualError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import RichTextEditor from "../../../shared/RichTextEditor/RichTextEditor";

type EditorFieldProps = {
  name: "content.ar" | "content.en";
  dir: "rtl" | "ltr";
  visible: boolean;
};

// الاتنين متعمل لهم render والغير ظاهر بيتخفي بالـ CSS عشان اللي اتكتب ما يضيعش
function LocalizedEditor({ name, dir, visible }: EditorFieldProps) {
  const [field, , helpers] = useField<string>(name);

  return (
    <div className={visible ? "" : "hidden"}>
      <RichTextEditor
        value={field.value}
        onChange={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        dir={dir}
      />
    </div>
  );
}

const langs = [
  { id: "ar", label: "العربي" },
  { id: "en", label: "English" },
] as const;

export function ContentTab() {
  const [lang, setLang] = useState<"ar" | "en">("ar");

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-2">
        {langs.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLang(l.id)}
            className={`cursor-pointer rounded-full px-5 py-1.5 text-sm font-semibold transition ${
              lang === l.id
                ? "bg-[#0d5c34] text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <LocalizedEditor name="content.ar" dir="rtl" visible={lang === "ar"} />
      <LocalizedEditor name="content.en" dir="ltr" visible={lang === "en"} />

      <BilingualError name="content" />
    </div>
  );
}
