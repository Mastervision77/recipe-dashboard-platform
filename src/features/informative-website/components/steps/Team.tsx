import { FieldArray } from "formik";
import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaTwitter,
} from "react-icons/fa";

import { BilingualField } from "../../shared/BilingualField/BilingualField";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";
import {
    inputClass,
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";

const socialMediaOptions = [
    {
        value: "facebook",
        label: "Facebook",
        icon: FaFacebookF,
    },
    {
        value: "instagram",
        label: "Instagram",
        icon: FaInstagram,
    },
    {
        value: "tiktok",
        label: "TikTok",
        icon: FaTiktok,
    },
    {
        value: "twitter",
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
    socailmedia: {
        url: "",
        platform: "facebook",
    },
    img: "",
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

                                        <div className="flex items-center gap-3">
                                            {socialMediaOptions.map(
                                                (social) => {
                                                    const Icon = social.icon;

                                                    const isSelected =
                                                        card.socailmedia
                                                            ?.platform ===
                                                        social.value;

                                                    return (
                                                        <button
                                                            key={social.value}
                                                            type="button"
                                                            onClick={() =>
                                                                form.setFieldValue(
                                                                    `our_team.cards.${index}.socailmedia.platform`,
                                                                    social.value
                                                                )
                                                            }
                                                            className={`
                                                                flex h-11 w-11
                                                                items-center
                                                                justify-center
                                                                rounded-full
                                                                border
                                                                transition
                                                                ${
                                                                    isSelected
                                                                        ? "border-[#0d5c34] bg-[#0d5c34] text-white"
                                                                        : "border-neutral-300 bg-white text-neutral-500 hover:border-[#0d5c34]"
                                                                }
                                                            `}
                                                            title={social.label}
                                                        >
                                                            <Icon size={18} />
                                                        </button>
                                                    );
                                                }
                                            )}

                                            <input
                                                type="url"
                                                name={`our_team.cards.${index}.socailmedia.url`}
                                                value={
                                                    card.socailmedia?.url ?? ""
                                                }
                                                onChange={form.handleChange}
                                                className={`${inputClass} flex-1`}
                                                placeholder="رابط الحساب"
                                            />
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