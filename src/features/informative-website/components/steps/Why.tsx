import { FieldArray, useField } from "formik";

import { BilingualField } from "../../shared/BilingualField/BilingualField";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";
import {
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";

const emptyCard = {
    title: {
        ar: "",
        en: "",
    },
    subtitle: {
        ar: "",
        en: "",
    },
    img: "",
};

export default function Why() {
    const [cardsField] = useField("why_choose_us.cards");

    const cards = cardsField.value || [];

    return (
        <div className="space-y-8" dir="rtl">
            {/* Section Header */}
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    لماذا تختار ريسيبي؟
                </h3>

                <BilingualField
                    name="why_choose_us.title"
                    label="عنوان القسم"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />

                <BilingualField
                    name="why_choose_us.subtitle"
                    label="وصف القسم"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />
            </div>

            {/* Cards */}
            <FieldArray name="why_choose_us.cards">
                {({ push }) => (
                    <div className="space-y-5">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#0d5c34]">
                                أسباب اختيار ريسيبي
                            </h3>

                            <button
                                type="button"
                                onClick={() => push(emptyCard)}
                                className="rounded-full bg-[#0d5c34] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#094a29]"
                            >
                                + إضافة سبب
                            </button>
                        </div>

                        {/* Existing + New Cards */}
                        {cards.map((_: unknown, index: number) => (
                            <div
                                key={index}
                                className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5"
                            >
                                <h4 className="text-sm font-bold text-neutral-800">
                                    السبب {index + 1}
                                </h4>

                                <ImageUploadField
                                    name={`why_choose_us.cards[${index}].img`}
                                    label="صورة السبب"
                                />

                                <BilingualField
                                    name={`why_choose_us.cards[${index}].title`}
                                    label="عنوان السبب"
                                    labelName={labelClass}
                                    className={textareaClass}
                                    as="textarea"
                                />

                                <BilingualField
                                    name={`why_choose_us.cards[${index}].subtitle`}
                                    label="وصف السبب"
                                    labelName={labelClass}
                                    className={textareaClass}
                                    as="textarea"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </FieldArray>
        </div>
    );
}