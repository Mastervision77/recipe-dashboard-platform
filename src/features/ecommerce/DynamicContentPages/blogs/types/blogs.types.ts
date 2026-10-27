

export type Localized = { ar: string; en: string };

// File = رفع جديد | string = URL جاي من الـ API (أو "" لو فاضي)
export type ImageValue = File | string;

export interface BlogApi {
  id: number;
  category_id?: number | null;
  category?: { id: number; name: Localized | string } | null;
  title: Localized;
  subtitle: Localized;
  content: Localized;
  cover_image?: string | null;
  hero_banner?: string | null;
  is_featured: boolean | number;
  is_tips_secrets: boolean | number;
  is_active: boolean | number;
  product_ids?: number[];
  products?: { id: number }[];
  created_at?: string;
  updated_at?: string;
}

// شكل الفورم (Formik values) — بيتقسم على الـ tabs
export interface BlogFormValues {
  category_id: number | "";
  title: Localized;
  subtitle: Localized;
  is_featured: boolean;
  is_tips_secrets: boolean;
  content: Localized;
  cover: ImageValue;
  hero_banner: ImageValue;
  product_ids: number[];
}

export interface BlogsResponse {
  data: BlogApi[];
  meta?: unknown;
  links?: unknown;
}



export interface BlogShowResponse {
  data: BlogApi;
}
