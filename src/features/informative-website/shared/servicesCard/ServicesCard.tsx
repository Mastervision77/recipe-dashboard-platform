
import { useField } from "formik";
import { BilingualField } from "../BilingualField/BilingualField";
import {
    labelClass,
    textareaClass,
} from "../stylings/ClassesCss";

import {
    BsBox,
    BsWrenchAdjustableCircleFill,
} from "react-icons/bs";
import { LuFileBadge } from "react-icons/lu";

const CARD_ICONS = [
    {
        value: "box",
        label: "صندوق",
        Icon: BsBox,
    },
    {
        value: "wrench",
        label: "أدوات",
        Icon: BsWrenchAdjustableCircleFill,
    },
    {
        value: "badge",
        label: "شهادة",
        Icon: LuFileBadge,
    },
];

export default function ServicesCard({
    index,
}: {
    index: number;
}) {
    const [iconField, , iconHelpers] = useField(
        `services.cards[${index}].icon`
    );

    return (
        <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5">
            <h4 className="text-sm font-bold text-neutral-800">
                الخدمة {index + 1}
            </h4>

            {/* Icon */}
            <div>
                <label className={labelClass}>
                    أيقونة الخدمة
                </label>

                <div className="mt-3 grid grid-cols-3 gap-3">
                    {CARD_ICONS.map(({ value, label, Icon }) => {
                        const isSelected =
                            iconField.value === value;

                        return (
                            <button
                                key={value}
                                type="button"
                                onClick={() =>
                                    iconHelpers.setValue(value)
                                }
                                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition ${
                                    isSelected
                                        ? "border-[#0d5c34] bg-[#0d5c34]/10 text-[#0d5c34]"
                                        : "border-neutral-200 bg-white text-neutral-500 hover:border-[#0d5c34]"
                                }`}
                            >
                                <Icon className="h-7 w-7" />

                                <span className="text-xs font-medium">
                                    {label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Title */}
            <BilingualField
                name={`services.cards[${index}].title`}
                label="عنوان الخدمة"
                labelName={labelClass}
                className={textareaClass}
                as="textarea"
            />

            {/* Subtitle */}
            <BilingualField
                name={`services.cards[${index}].subtitle`}
                label="وصف الخدمة"
                labelName={labelClass}
                className={textareaClass}
                as="textarea"
            />
        </div>
    );
}

