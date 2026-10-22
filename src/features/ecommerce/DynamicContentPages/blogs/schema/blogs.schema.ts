import * as Yup from "yup";

const text = (label: string, max: number) =>
  Yup.string()
    .trim()
    .required(`${label} مطلوب`)
    .max(max, `${label} طويل جدًا (الحد الأقصى ${max} حرف)`);

const bilingual = (label: string, max = 255) =>
  Yup.object({
    ar: text(`${label} بالعربي`, max),
    en: text(`${label} بالإنجليزي`, max),
  });

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

// الصورة مطلوبة: File جديد أو URL قديم
const image = (label: string) =>
  Yup.mixed<File | string>()
    .test("required", `${label} مطلوبة`, (v) =>
      v instanceof File ? true : typeof v === "string" && v.trim() !== "",
    )
    .test("type", "الصيغة لازم تكون JPG أو PNG أو WebP", (v) =>
      v instanceof File ? ALLOWED.includes(v.type) : true,
    )
    .test("size", "حجم الصورة لازم يكون أقل من 5MB", (v) =>
      v instanceof File ? v.size <= MAX_SIZE : true,
    );

// ---------- كل tab له schema مستقل (بيتفحص ويتحفظ لوحده) ----------
export const basicSchema = Yup.object({
  category_id: Yup.number()
    .typeError("التصنيف مطلوب")
    .required("التصنيف مطلوب"),
  title: bilingual("العنوان"),
  subtitle: bilingual("العنوان الفرعي", 500),
  is_featured: Yup.boolean(),
  is_tips_secrets: Yup.boolean(),
});

// المحتوى HTML من الـ editor: مطلوب بس من غير حد أقصى للطول (ممكن يحتوي صور)
const richText = (label: string) =>
  Yup.string().trim().required(`${label} مطلوب`);

export const contentSchema = Yup.object({
  content: Yup.object({
    ar: richText("المحتوى بالعربي"),
    en: richText("المحتوى بالإنجليزي"),
  }),
});

export const imagesSchema = Yup.object({
  cover_image: image("صورة الكارت"),
  hero_banner: image("صورة البانر"),
});

export const productsSchema = Yup.object({
  product_ids: Yup.array().of(Yup.number().required()),
});

// تاب الصور + المنتجات (بيتحفظ مع بعض)
export const mediaSchema = imagesSchema.concat(productsSchema);

// الإضافة: كل الـ tabs في فورم واحد
export const createBlogSchema = basicSchema
  .concat(contentSchema)
  .concat(mediaSchema);
