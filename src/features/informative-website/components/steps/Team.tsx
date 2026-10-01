import { Field, FieldArray } from "formik";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

import { BilingualField } from "../../shared/BilingualField/BilingualField";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";
import {
    inputClass,
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";

const socialMediaOptions = [
    {
        value: "e-font-icon-svg e-fab-facebook-f",
        label: "Facebook",
        icon: FaFacebookF,
    },
    {
        value: "e-font-icon-svg e-fab-instagram",
        label: "Instagram",
        icon: FaInstagram,
    },
    {
        value: "e-font-icon-svg e-fab-tiktok",
        label: "TikTok",
        icon: FaTiktok,
    },
    {
        value: "e-font-icon-svg e-fab-twitter",
        label: "Twitter",
        icon: FaTwitter,
    },
] as const;

const emptyTeamMember = {
    title: {
        ar: "",
        en: "",
    },
    subtitle: {
        ar: "",
        en: "",
    },
    socailmedia: socialMediaOptions.map((social) => ({
        url: "",
        icon: social.value,
    })),
    img: "",
};

const normalizeSocialMedia = (socialmedia = []) => {
    return socialMediaOptions.map((social) => {
        const existing = socialmedia.find((item) => item.icon === social.value);

        return {
            url: existing?.url ?? "",
            icon: social.value,
        };
    });
};

export default function Team() {
    return (
        <div className="space-y-6" dir="rtl">
            <BilingualField
                name="our_team.section"
                label="اسم السكشن"
                labelName={labelClass}
                className={inputClass}
            />

            <BilingualField
                name="our_team.title"
                label="عنوان السكشن"
                labelName={labelClass}
                className={inputClass}
            />

            <BilingualField
                name="our_team.subtitle"
                label="الوصف التعريفي"
                labelName={labelClass}
                className={textareaClass}
                as="textarea"
            />

            <FieldArray name="our_team.cards">
                {({ push, remove, form }) => {
                    const cards = form.values.our_team?.cards ?? [];

                    return (
                        <div className="space-y-6">
                            {cards.map((card: any, index: number) => (
                                <div
                                    key={index}
                                    className="space-y-5 rounded-2xl border border-neutral-200 p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-[#0d5c34]">
                                            عضو الفريق {index + 1}
                                        </h3>

                                        {cards.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="rounded-full bg-red-50 px-4 py-2 text-sm text-red-600"
                                            >
                                                حذف العضو
                                            </button>
                                        )}
                                    </div>

                                    <ImageUploadField
                                        name={`our_team.cards.${index}.img`}
                                        label="صورة العضو"
                                    />

                                    <BilingualField
                                        name={`our_team.cards.${index}.title`}
                                        label="اسم العضو"
                                        labelName={labelClass}
                                        className={inputClass}
                                    />

                                    <BilingualField
                                        name={`our_team.cards.${index}.subtitle`}
                                        label="المنصب والوصف"
                                        labelName={labelClass}
                                        className={textareaClass}
                                        as="textarea"
                                    />

                                    {/* Social Media */}
                                    <div className="space-y-3">
                                        <label className={labelClass}>
                                            وسائل التواصل الاجتماعي
                                        </label>

                                        <div className="space-y-3">
                                            {socialMediaOptions.map((social, socialIndex) => {
                                                const Icon = social.icon;

                                                return (
                                                    <div
                                                        key={social.value}
                                                        className="flex items-center gap-3"
                                                    >
                                                        {/* Icon + Name */}
                                                        <div className="flex w-32 items-center gap-2 text-neutral-600">
                                                            <Icon size={18} />
                                                            <span>{social.label}</span>
                                                        </div>

                                                        {/* URL */}
                                                        <Field
                                                            type="url"
                                                            name={`our_team.cards.${index}.socailmedia[${socialIndex}].url`}
                                                            className={`${inputClass} flex-1`}
                                                            placeholder={`رابط ${social.label}`}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => push(emptyTeamMember)}
                                className="rounded-full bg-[#0d5c34] px-6 py-3 text-white"
                            >
                                + إضافة عضو جديد
                            </button>
                        </div>
                    );
                }}
            </FieldArray>
        </div>
    );
}
