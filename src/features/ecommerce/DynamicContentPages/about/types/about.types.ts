export type Localized = { ar: string; en: string };

// File = رفع جديد | string = URL جاي من الـ API (أو "" لو فاضي)
export type ImageValue = File | string;

export interface AboutSlide {
  title: Localized;
  subtitle: Localized;
  img: ImageValue;
}

export interface AboutSection {
  title: Localized;
  subtitle: Localized;
  img: ImageValue;
}

export interface AboutValueItem {
  title: Localized;
  subtitle: Localized;
}

export interface AboutValues {
  title: Localized;
  subtitle: Localized;
  content: AboutValueItem[];
}

// شكل الفورم (Formik values)
export interface AboutData {
  title: Localized;
  subtitle: Localized;
  video_url: string;
  slider: AboutSlide[];
  vision: AboutSection;
  mission: AboutSection;
  values: AboutValues;
}

// شكل الـ record اللي راجع من الـ API
export interface AboutApi extends Omit<AboutData, "video_url"> {
  video_url: string | null;
  id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AboutResponse {
  data: AboutApi[];
}
