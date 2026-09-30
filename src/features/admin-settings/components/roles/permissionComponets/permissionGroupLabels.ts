/**
 * أسماء الجروبات بالعربي. الباك بيرجّع الـ key بس (مثلًا "landings").
 * لو جروب جديد ظهر ومش هنا، بيتعرض الـ key نفسه لحد ما تضيفيه.
 */
export const permissionGroupLabels: Record<string, string> = {
    landing_contact_forms: "نماذج التواصل",
    landings: "الموقع التعريفي",
    roles: "الأدوار",
    user: "المستخدمين",
};

export const getGroupLabel = (group: string) =>
    permissionGroupLabels[group] ?? group;
