import * as Yup from "yup";

const text = (label: string, max: number) =>
  Yup.string()
    .trim()
    .required(`${label} مطلوب`)
    .max(max, `${label} طويل جدًا (الحد الأقصى ${max} حرف)`);

export const categorySchema = Yup.object({
  name: Yup.object({
    ar: text("اسم التصنيف بالعربي", 255),
    en: text("اسم التصنيف بالإنجليزي", 255),
  }),
  is_active: Yup.boolean(),
});
