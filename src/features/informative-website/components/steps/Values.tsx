import { useField, useFormikContext } from "formik";
import { BilingualField } from "../../shared/BilingualField/BilingualField";
import {
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";

import { IoShieldCheckmark } from "react-icons/io5";
import { FaRegUser, FaRegHandshake } from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";

const CARD_ICONS = [
    {
        component: IoShieldCheckmark,
        value: "shield",
        label: "الجودة وسلامة الغذاء",
    },
    {
        component: LuHeartHandshake,
        value: "heart-handshake",
        label: "المسؤولية المجتمعية",
    },
    {
        component: FaRegUser,
        value: "user",
        label: "رأس المال البشري",
    },
    {
        component: FaRegHandshake,
        value: "handshake",
        label: "التجارة العادلة",
    },
];

export function ValuesStep() {
    const [cardsField] = useField("values.cards");
    const { setFieldValue } = useFormikContext();

    const cards = cardsField.value || [];

    return (
        <div className="space-y-8" dir="rtl">
            {/* Values Header */}
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    عنوان قسم القيم
                </h3>

                <BilingualField
                    name="values.title"
                    label="عنوان القسم"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />
            </div>

            {/* Values Cards */}
            <div className="space-y-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    القيم الأساسية
                </h3>

                {cards.map((_: unknown, index: number) => (
                    <div
                        key={index}
                        className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5"
                    >
                        {/* Card Header */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d5c34]/10 text-[#0d5c34]">
                                {(() => {
                                    const Icon =
                                        CARD_ICONS[index]?.component;

                                    return Icon ? (
                                        <Icon className="h-5 w-5" />
                                    ) : null;
                                })()}
                            </div>

                            <h4 className="text-sm font-bold text-neutral-800">
                                القيمة {index + 1}
                            </h4>
                        </div>

                        {/* Title */}
                        <BilingualField
                            name={`values.cards[${index}].title`}
                            label="عنوان القيمة"
                            labelName={labelClass}
                            className={textareaClass}
                            as="textarea"
                        />

                        {/* Subtitle */}
                        <BilingualField
                            name={`values.cards[${index}].subtitle`}
                            label="وصف القيمة"
                            labelName={labelClass}
                            className={textareaClass}
                            as="textarea"
                        />

                        {/* Icon */}
                        <div>
                            <label className={labelClass}>
                                الأيقونة
                            </label>

                            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {CARD_ICONS.map((icon) => {
                                    const Icon = icon.component;
                                    const selected =
                                        cards[index]?.icon === icon.value;

                                    return (
                                        <button
                                            key={icon.value}
                                            type="button"
                                            onClick={() =>
                                                setFieldValue(
                                                    `values.cards[${index}].icon`,
                                                    icon.value
                                                )
                                            }
                                            className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition ${
                                                selected
                                                    ? "border-[#0d5c34] bg-[#0d5c34]/10"
                                                    : "border-neutral-200 hover:border-[#0d5c34]"
                                            }`}
                                        >
                                            <Icon className="h-6 w-6 text-[#0d5c34]" />

                                            <span className="text-xs text-neutral-600">
                                                {icon.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}