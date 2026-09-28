import type { LandingData } from "../types/landing.types";


type Bilingual = { ar?: string; en?: string };

function appendBilingual(fd: FormData, key: string, value?: Bilingual) {
  if (!value) return;
  if (value.ar !== undefined) fd.append(`${key}[ar]`, value.ar ?? "");
  if (value.en !== undefined) fd.append(`${key}[en]`, value.en ?? "");
}

function appendImg(fd: FormData, key: string, value?: File | string) {
  if (!value) return;
  if (value instanceof File) fd.append(key, value);
  // لو لسه رابط string (المستخدم مغيرش الصورة) من غير الأفضل متبعتيهاش خالص
  // لإن الباك اند هيفضل محتفظ بالقديمة لو الحقل مش موجود في الريكوست
}

export function buildLandingFormData(values: LandingData): FormData {
  const fd = new FormData();

  // ===== Header =====
  appendBilingual(fd, "headersectiontitle", values.header?.title);
  appendBilingual(fd, "headersectionsubtitle", values.header?.subtitle);
  appendImg(fd, "headersectionimg", values.header?.img);

  // ===== About =====
  appendBilingual(fd, "aboutsection[mission][title]", values.about?.mission?.title);
  appendBilingual(fd, "aboutsection[mission][subtitle]", values.about?.mission?.subtitle);
  appendBilingual(fd, "aboutsection[vision][title]", values.about?.vision?.title);
  appendBilingual(fd, "aboutsection[vision][subtitle]", values.about?.vision?.subtitle);
  appendBilingual(fd, "aboutsection[ourstory][title]", values.about?.ourstory?.title);
  appendBilingual(fd, "aboutsection[ourstory][subtitle]", values.about?.ourstory?.subtitle);
  appendImg(fd, "aboutsectionimg", values.about?.img);

  // // ===== Values (لاحظي: "value" مفرد مش "values") =====
  appendBilingual(fd, "valuesectiontitle", values.values?.title);
  values.values?.cards?.forEach((card, i) => {
    appendBilingual(fd, `valuesectioncard[${i}][title]`, card.title);
    appendBilingual(fd, `valuesectioncard[${i}][subtitle]`, card.subtitle);
    if (card.icon) fd.append(`valuesectioncard[${i}][icon]`, card.icon);
  });

  // // ===== Why Choose Us =====
  appendBilingual(fd, "whychoosesectiontitle", values.why_choose_us?.title);
  appendBilingual(fd, "whychoosesectionsubtitle", values.why_choose_us?.subtitle);
  values.why_choose_us?.cards?.forEach((card, i) => {
    appendBilingual(fd, `whychoosesectioncard[${i}][title]`, card.title);
    appendBilingual(fd, `whychoosesectioncard[${i}][subtitle]`, card.subtitle);
    appendImg(fd, `whychoosesectioncard[${i}][img]`, card.img);
  });

  // // ===== Services (لاحظي: "service" مفرد) =====
  appendBilingual(fd, "servicesectiontitle", values.services?.title);
  appendImg(fd, "servicesectionimg", values.services?.img);
  values.services?.cards?.forEach((card, i) => {
    appendBilingual(fd, `servicesectioncard[${i}][title]`, card.title);
    appendBilingual(fd, `servicesectioncard[${i}][subtitle]`, card.subtitle);
    if (card.icon) fd.append(`servicesectioncard[${i}][icon]`, card.icon);
  });

  // // ===== Catalog =====
  appendBilingual(fd, "catalogsectiontitle", values.catalog?.title);
  appendBilingual(fd, "catalogsectionsubtitle", values.catalog?.subtitle);
  appendImg(fd, "catalogsectionimg", values.catalog?.img);

  // // ===== Our Team =====
  appendBilingual(fd, "ourteamsection", values.our_team?.section); // حقل السكشن نفسه bilingual
  appendBilingual(fd, "ourteamsectiontitle", values.our_team?.title);
  appendBilingual(fd, "ourteamsectionsubtitle", values.our_team?.subtitle);
  values.our_team?.cards?.forEach((card, i) => {
    appendBilingual(fd, `ourteamsectioncard[${i}][title]`, card.title);
    appendBilingual(fd, `ourteamsectioncard[${i}][subtitle]`, card.subtitle);
    if (card.socailmedia?.url) fd.append(`ourteamsectioncard[${i}][socailmedia][url]`, card.socailmedia.url);
    if (card.socailmedia?.icon) fd.append(`ourteamsectioncard[${i}][socailmedia][icon]`, card.socailmedia.icon);
    appendImg(fd, `ourteamsectioncard[${i}][img]`, card.img);
  });

  // // ===== FAQ =====
  appendBilingual(fd, "faqsectiondescription", values.faq?.description);
  values.faq?.faq?.forEach((item, i) => {
    appendBilingual(fd, `faqsectionfaq[${i}][title]`, item.title);
    appendBilingual(fd, `faqsectionfaq[${i}][subtitle]`, item.subtitle);
  });

  // // ===== Contact =====
  // appendBilingual(fd, "contactsectiontitle", values.contact?.title);
  // appendBilingual(fd, "contactsectionsubtitle", values.contact?.subtitle);
  // values.contact?.email?.forEach((item, i) => {
  //   if (item.email) fd.append(`contactsectionemail[${i}][email]`, item.email);
  // });
  // values.contact?.phone?.forEach((item, i) => {
  //   if (item.phone) fd.append(`contactsectionphone[${i}][phone]`, item.phone);
  // });
  // values.contact?.address?.forEach((item, i) => {
  //   if (item.ar) fd.append(`contactsectionaddress[${i}][ar]`, item.ar);
  //   if (item.en) fd.append(`contactsectionaddress[${i}][en]`, item.en);
  // });

  // Method spoofing لإن الـ endpoint فعليًا PUT
  fd.append("_method", "PUT");

  return fd;
}
