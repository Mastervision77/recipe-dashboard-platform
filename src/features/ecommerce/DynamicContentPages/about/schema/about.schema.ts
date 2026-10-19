import * as Yup from "yup";

const text = (label: string, max: number) =>
  Yup.string()
    .trim()
    .required(`${label} مطلوب`)
    .max(max, `${label} طويل جدًا (الحد الأقصى ${max} حرف)`);

// عنوان/وصف بالعربي والإنجليزي
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

// ---------- step 1: أساسي ----------
export const basicSchema = Yup.object({
  title: bilingual("العنوان"),
  subtitle: bilingual("العنوان الفرعي", 500),
  video_url: Yup.string().trim().url("رابط الفيديو غير صالح"), // اختياري
});

// ---------- step 2: السلايدر ----------
export const sliderSchema = Yup.object({
  slider: Yup.array()
    .of(
      Yup.object({
        title: bilingual("عنوان الشريحة"),
        subtitle: bilingual("وصف الشريحة", 500),
        img: image("صورة الشريحة"),
      }),
    )
    .min(1, "لازم تضيف شريحة واحدة على الأقل"),
});

// ---------- step 3 + 4: الرؤية / الرسالة ----------
const sectionSchema = (name: string) =>
  Yup.object({
    title: bilingual(`عنوان ${name}`),
    subtitle: bilingual(`وصف ${name}`, 500),
    img: image(`صورة ${name}`),
  });

export const visionSchema = Yup.object({ vision: sectionSchema("الرؤية") });
export const missionSchema = Yup.object({ mission: sectionSchema("الرسالة") });

// ---------- step 5: القيم ----------
export const valuesSchema = Yup.object({
  values: Yup.object({
    title: bilingual("عنوان القسم"),
    subtitle: bilingual("وصف القسم", 500),
    content: Yup.array()
      .of(
        Yup.object({
          title: bilingual("عنوان القيمة"),
          subtitle: bilingual("وصف القيمة", 500),
        }),
      )
      .min(1, "لازم تضيف قيمة واحدة على الأقل"),
  }),
});

// الترتيب لازم يطابق ترتيب الـ steps في AboutFormStepper
export const aboutStepSchemas = [
  basicSchema,
  sliderSchema,
  visionSchema,
  missionSchema,
  valuesSchema,
];
