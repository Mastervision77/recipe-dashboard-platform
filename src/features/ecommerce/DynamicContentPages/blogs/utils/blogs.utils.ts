import type {
  BlogApi,
  BlogFormValues,
  Localized,
} from "../types/blogs.types";

export const emptyLoc = (): Localized => ({ ar: "", en: "" });

const loc = (v?: Partial<Localized> | null): Localized => ({
  ar: v?.ar ?? "",
  en: v?.en ?? "",
});

export const blogInitialValues = (): BlogFormValues => ({
  category_id: "",
  title: emptyLoc(),
  subtitle: emptyLoc(),
  is_featured: false,
  is_tips_secrets: false,
  content: emptyLoc(),
  cover: "",
  hero_banner: "",
  product_ids: [],
});

// من الـ API للفورم
export const mapBlogToForm = (b: BlogApi): BlogFormValues => ({
  category_id: b.category_id ?? b.category?.id ?? "",
  title: loc(b.title),
  subtitle: loc(b.subtitle),
  is_featured: Boolean(b.is_featured),
  is_tips_secrets: Boolean(b.is_tips_secrets),
  content: loc(b.content),
  cover: b.cover_image ?? "",
  hero_banner: b.hero_banner ?? "",
  product_ids: b.product_ids ?? b.products?.map((p) => p.id) ?? [],
});

// اسم التصنيف للعرض في الجدول
export const getCategoryName = (b: BlogApi): string => {
  const name = b.category?.name;
  if (!name) return "—";
  return typeof name === "string" ? name : name.ar || name.en || "—";
};

// ---------- FormData بنفس keys الـ Postman ----------
const bool = (v: boolean) => (v ? "1" : "0");

const appendLoc = (fd: FormData, key: string, v: Localized) => {
  fd.append(`${key}[ar]`, v.ar.trim());
  fd.append(`${key}[en]`, v.en.trim());
};

// الصورة بتتبعت بس لو File جديد؛ لو string يبقى القديمة زي ما هي
const appendImg = (fd: FormData, key: string, v: File | string) => {
  if (v instanceof File) fd.append(key, v);
};

// كل دالة بتبني الـ keys الخاصة بـ tab واحد بس (تحديث جزئي)
export const buildBasicFormData = (v: BlogFormValues, fd = new FormData()) => {
  fd.append("category_id", String(v.category_id));
  appendLoc(fd, "title", v.title);
  appendLoc(fd, "subtitle", v.subtitle);
  fd.append("is_featured", bool(v.is_featured));
  fd.append("is_tips_secrets", bool(v.is_tips_secrets));
  return fd;
};

export const buildContentFormData = (v: BlogFormValues, fd = new FormData()) => {
  appendLoc(fd, "content", v.content);
  return fd;
};

export const buildImagesFormData = (v: BlogFormValues, fd = new FormData()) => {
  appendImg(fd, "cover", v.cover_image);
  appendImg(fd, "hero_banner", v.hero_banner);
  return fd;
};

export const buildProductsFormData = (v: BlogFormValues, fd = new FormData()) => {
  v.product_ids.forEach((id, i) => fd.append(`product_ids[${i}]`, String(id)));
  return fd;
};

// تاب الصور + المنتجات: الاتنين بيتبعتوا في نفس الـ request
export const buildMediaFormData = (v: BlogFormValues, fd = new FormData()) => {
  buildImagesFormData(v, fd);
  buildProductsFormData(v, fd);
  return fd;
};

// الإضافة: كل الـ tabs في request واحد
export const buildCreateFormData = (v: BlogFormValues) => {
  const fd = new FormData();
  buildBasicFormData(v, fd);
  buildContentFormData(v, fd);
  buildImagesFormData(v, fd);
  buildProductsFormData(v, fd);
  fd.append("is_active", "1");
  return fd;
};

// مسارات صفحات المدونة 
export const BLOGS_PATH = "/admin/shop/blog-page";
