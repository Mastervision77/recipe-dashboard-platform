import type { ListResponse } from "../../../../../lib/pagination";

export type Localized = { ar: string; en: string };

export interface CategoryApi {
  id: number;
  name: Localized;
  is_active: boolean | number;
  created_at?: string;
  updated_at?: string;
}

// شكل الفورم
export interface CategoryFormValues {
  name: Localized;
  is_active: boolean;
}

// export interface CategoriesResponse {
//   data: CategoryApi[];
//   meta?: unknown;
//   links?: unknown;
// }


export type CategoriesResponse = ListResponse<CategoryApi>;