import type { ComponentType } from "react";
import type * as Yup from "yup";
import type { BlogFormValues } from "../../types/blogs.types";
import {
  basicSchema,
  contentSchema,
  mediaSchema,
} from "../../schema/blogs.schema";
import {
  buildBasicFormData,
  buildContentFormData,
  buildMediaFormData,
} from "../../utils/blogs.utils";
import { BasicTab } from "./BasicTab";
import { ContentTab } from "./ContentTab";
import { MediaTab } from "./MediaTab";

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

const tab = (t: Omit<BlogTab, "fields">): BlogTab => ({
  ...t,
  fields: Object.keys(t.schema.fields),
});

// كل tab = حفظ مستقل في صفحة التعديل (نفس endpoint التحديث بـ keys الـ tab)
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
    id: "media",
    label: "الصور والمنتجات",
    savedMessage: "تم حفظ الصور والمنتجات بنجاح",
    schema: mediaSchema,
    build: (v) => buildMediaFormData(v),
    Component: MediaTab,
  }),
];
