import type { AboutApi, AboutData, Localized } from "../types/about.types";

const emptyLoc = (): Localized => ({ ar: "", en: "" });

// دوال بترجع object جديد كل مرة عشان الـ arrays متشاركش نفس الـ reference
export const createEmptySlide = () => ({
  title: emptyLoc(),
  subtitle: emptyLoc(),
  img: "" as string,
});

export const createEmptyValue = () => ({
  title: emptyLoc(),
  subtitle: emptyLoc(),
});

export const aboutInitialValues = (): AboutData => ({
  title: emptyLoc(),
  subtitle: emptyLoc(),
  video_url: "",
  slider: [createEmptySlide()],
  vision: { title: emptyLoc(), subtitle: emptyLoc(), img: "" },
  mission: { title: emptyLoc(), subtitle: emptyLoc(), img: "" },
  values: {
    title: emptyLoc(),
    subtitle: emptyLoc(),
    content: [createEmptyValue()],
  },
});

// من الـ API للفورم: بنشيل الـ id/is_active/timestamps ونظبط الـ null
export const mapAboutToForm = (d: AboutApi): AboutData => {
  const init = aboutInitialValues();
  return {
    title: d.title ?? init.title,
    subtitle: d.subtitle ?? init.subtitle,
    video_url: d.video_url ?? "",
    slider: d.slider?.length
      ? d.slider.map((s) => ({ ...s, img: s.img ?? "" }))
      : init.slider,
    vision: { ...init.vision, ...d.vision, img: d.vision?.img ?? "" },
    mission: { ...init.mission, ...d.mission, img: d.mission?.img ?? "" },
    values: {
      title: d.values?.title ?? init.values.title,
      subtitle: d.values?.subtitle ?? init.values.subtitle,
      content: d.values?.content?.length
        ? d.values.content
        : init.values.content,
    },
  };
};

// ---------- FormData بنفس keys الـ Postman ----------
const appendLoc = (fd: FormData, key: string, v: Localized) => {
  fd.append(`${key}[ar]`, v.ar.trim());
  fd.append(`${key}[en]`, v.en.trim());
};

// الصورة بتتبعت بس لو File جديد؛ لو string يبقى القديمة زي ما هي
const appendImg = (fd: FormData, key: string, v: File | string) => {
  if (v instanceof File) fd.append(key, v);
};

export const buildAboutFormData = (v: AboutData) => {
  const fd = new FormData();

  appendLoc(fd, "title", v.title);
  appendLoc(fd, "subtitle", v.subtitle);
  if (v.video_url.trim()) fd.append("video_url", v.video_url.trim());

  v.slider.forEach((s, i) => {
    appendLoc(fd, `slider[${i}][title]`, s.title);
    appendLoc(fd, `slider[${i}][subtitle]`, s.subtitle);
    appendImg(fd, `slider[${i}][img]`, s.img);
  });

  appendLoc(fd, "vision_title", v.vision.title);
  appendLoc(fd, "vision_subtitle", v.vision.subtitle);
  appendImg(fd, "vision_img", v.vision.img);

  appendLoc(fd, "mission_title", v.mission.title);
  appendLoc(fd, "mission_subtitle", v.mission.subtitle);
  appendImg(fd, "mission_img", v.mission.img);

  appendLoc(fd, "values_title", v.values.title);
  appendLoc(fd, "values_subtitle", v.values.subtitle);
  v.values.content.forEach((c, i) => {
    appendLoc(fd, `values_content[${i}][title]`, c.title);
    appendLoc(fd, `values_content[${i}][subtitle]`, c.subtitle);
  });

  return fd;
};
