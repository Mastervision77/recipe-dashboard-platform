
import { Field, ErrorMessage } from "formik";

export function BilingualField({
  name,
  label,
  as = "input",
  className,
  labelName
}: {
  name: string;
  label: string;
  as?: "input" | "textarea";
  className: string;
  labelName: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(["en", "ar"] as const).map((lang) => (
        <div key={lang}>
          <label className={labelName}>
            {label} ({lang.toUpperCase()})
          </label>
          <Field as={as} name={`${name}.${lang}`} dir={lang === "ar" ? "rtl" : "ltr"} className={`input ${className}`} />
          <ErrorMessage name={`${name}.${lang}`} component="span" className="text-red-500 text-xs" />
        </div>
      ))}
    </div>
  );
}
