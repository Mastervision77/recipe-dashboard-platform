// features/dynamic-website/schema/landing.schema.ts
import * as Yup from "yup";

const localizedText = Yup.object({
  en: Yup.string().required("English text is required"),
  ar: Yup.string().required("النص العربي مطلوب"),
});

export const heroSchema = Yup.object({
  header: Yup.object({
    img: Yup.mixed().required(),
    title: localizedText,
    subtitle: localizedText,
  }),
});

export const aboutSchema = Yup.object({
  about: Yup.object({
    img: Yup.mixed().required("About image is required"),

    mission: Yup.object({
      title: localizedText,
      subtitle: localizedText,
    }),

    vision: Yup.object({
      title: localizedText,
      subtitle: localizedText,
    }),

    ourstory: Yup.object({
      title: localizedText,
      subtitle: localizedText,
    }),
  }),
});

export const valuesSchema = Yup.object({
    values: Yup.object({
        title: localizedText,

        cards: Yup.array()
            .of(
                Yup.object({
                    title: localizedText,
                    subtitle: localizedText,
                    icon: Yup.string().required("Icon is required"),
                })
            )
            .min(1, "At least one value card is required")
            .required("Values cards are required"),
    }),
});

export const whyChooseUsSchema = Yup.object({
    why_choose_us: Yup.object({
        title: localizedText,

        subtitle: localizedText,

        cards: Yup.array()
            .of(
                Yup.object({
                    title: localizedText,

                    subtitle: localizedText,

                    img: Yup.mixed().required(
                        "Why choose us image is required"
                    ),
                })
            )
            .min(1, "At least one card is required")
            .required("Why choose us cards are required"),
    }),
});


// Combine into a full schema for final submit, and an array
// (one entry per step) so "Next" can validate just that slice.
export const stepSchemas = [heroSchema , aboutSchema , valuesSchema , whyChooseUsSchema /*, servicesSchema */];
