import { CiGlobe, CiSettings } from "react-icons/ci";
import { LuChefHat, LuClipboardList, LuFileText, LuLayoutDashboard, LuMessageSquare, LuNewspaper, LuPackage, LuShoppingBag, LuTags, LuUsers, LuUtensils } from "react-icons/lu";


export type NavItem = {
  title: string;
  /** For a group with children, this is just the URL prefix used to detect "active". */
  href: string;
  icon?: LucideIcon;
  /** Match the exact path only (use for dashboard / index pages). */
  exact?: boolean;
  children?: NavItem[];
};

export type NavSection = { title?: string; items: NavItem[] };

export type AdminModule = {
  key: "main" | "ecommerce" | "website" | "recipes";
  title: string;
  icon: LucideIcon;
  /** URL prefix that owns this module. `main` is the fallback module. */
  basePath: string;
  sections: NavSection[];
};

/**
 * Single source of truth for: the module rail, the module panel,
 * the page title and the breadcrumbs.
 * Adding a page = adding one line here.
 */
export const adminModules: AdminModule[] = [
  // {
  //   key: "main",
  //   title: "الرئيسية",
  //   icon: LuLayoutDashboard,
  //   basePath: "/admin",
  //   sections: [
  //     {
  //       items: [
  //         { title: "لوحة التحكم", href: "/admin", icon: LuLayoutDashboard, exact: true },
  //         { title: "المستخدمين", href: "/admin/users", icon: LuUsers },
  //         { title: "الإعدادات", href: "/admin/settings", icon: CiSettings },
  //       ],
  //     },
  //   ],
  // },
  {
    key: "website",
    title: "الموقع التعريفي",
    icon: CiGlobe,
    basePath: "/admin/website",
    sections: [
      {
        items: [
          { title: "الصفحات", href: "/admin/website", icon: LuFileText },
          // { title: "المدونة", href: "/admin/website/blog", icon: LuNewspaper },
          // { title: "رسائل التواصل", href: "/admin/website/messages", icon: LuMessageSquare },
        ],
      },
    ],
  },
  // {
  //   key: "ecommerce",
  //   title: "المتجر",
  //   icon: LuShoppingBag,
  //   basePath: "/admin/ecommerce",
  //   sections: [
  //     {
  //       items: [
  //         { title: "نظرة عامة", href: "/admin/ecommerce", icon: LuLayoutDashboard, exact: true },
  //         {
  //           title: "الكتالوج",
  //           href: "/admin/ecommerce/catalog",
  //           icon: LuPackage,
  //           children: [
  //             { title: "المنتجات", href: "/admin/ecommerce/catalog/products" },
  //             { title: "التصنيفات", href: "/admin/ecommerce/catalog/categories" },
  //           ],
  //         },
  //         { title: "الطلبات", href: "/admin/ecommerce/orders", icon: LuClipboardList },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   key: "recipes",
  //   title: "منصة الوصفات",
  //   icon: LuChefHat,
  //   basePath: "/admin/recipes",
  //   sections: [
  //     {
  //       items: [
  //         { title: "الوصفات", href: "/admin/recipes/list", icon: LuUtensils },
  //         { title: "التصنيفات", href: "/admin/recipes/categories", icon: LuTags },
  //       ],
  //     },
  //   ],
  // },
];
