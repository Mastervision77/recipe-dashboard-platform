import type { ComponentType } from "react";
import type * as Yup from "yup";
import type { BlogFormValues } from "../../types/blogs.types";
import {
  basicSchema,
  contentSchema,
  imagesSchema,
  productsSchema,
  quoteSchema,
} from "../../schema/blogs.schema";
import {
  buildBasicFormData,
  buildContentFormData,
  buildImagesFormData,
  buildProductsFormData,
  buildQuoteFormData,
} from "../../utils/blogs.utils";
import { BasicTab } from "./BasicTab";
import { ContentTab } from "./ContentTab";
import { QuoteTab } from "./QuoteTab";
import { ImagesTab } from "./ImagesTab";
import { ProductsTab } from "./ProductsTab";

export type BlogTab = {
  id: string;
  label: string;
  savedMessage: string;
  schema: Yup.ObjectSchema<any>;
  // الـ keys الخاصة بالـ tab (بتستخدم لتحديد أول tab فيه خطأ في الإضافة)
  fields: string[];
  build: (values: BlogFormValues) => FormData;
  Component: ComponentType;
};

const tab = (
  t: Omit<BlogTab, "fields">,
): BlogTab => ({ ...t, fields: Object.keys(t.schema.fields) });

// كل tab = API call مستقل في صفحة التعديل (نفس endpoint التحديث بـ keys الـ tab)
export const blogTabs: BlogTab[] = [
  tab({
    id: "basic",
    label: "البيانات الأساسية",
    savedMessage: "تم حفظ البيانات الأساسية بنجاح",
    schema: basicSchema,
    build: (v) => buildBasicFormData(v),
    Component: BasicTab,
  }),
  tab({
    id: "content",
    label: "المحتوى",
    savedMessage: "تم حفظ المحتوى بنجاح",
    schema: contentSchema,
    build: (v) => buildContentFormData(v),
    Component: ContentTab,
  }),
  tab({
    id: "quote",
    label: "الاقتباس",
    savedMessage: "تم حفظ الاقتباس بنجاح",
    schema: quoteSchema,
    build: (v) => buildQuoteFormData(v),
    Component: QuoteTab,
  }),
  tab({
    id: "images",
    label: "الصور",
    savedMessage: "تم حفظ الصور بنجاح",
    schema: imagesSchema,
    build: (v) => buildImagesFormData(v),
    Component: ImagesTab,
  }),
  tab({
    id: "products",
    label: "المنتجات المرتبطة",
    savedMessage: "تم حفظ المنتجات المرتبطة بنجاح",
    schema: productsSchema,
    build: (v) => buildProductsFormData(v),
    Component: ProductsTab,
  }),
];
