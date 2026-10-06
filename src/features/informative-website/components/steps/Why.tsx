import { FieldArray, useField } from "formik";

import { BilingualField } from "../../shared/BilingualField/BilingualField";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";

import {
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";
import { Button } from "../../../../shared/components/Button/Button";
import { ArrayError, BilingualError, FieldError } from "../../shared/fielderrors/Fielderrors";

// دالة بترجع object جديد كل مرة عشان الكروت الجديدة متشاركش نفس الـ reference
const createEmptyCard = () => ({
    title: { ar: "", en: "" },
    subtitle: { ar: "", en: "" },
    img: "",
});

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

                <div className="space-y-2">
                    <BilingualField
                        name="why_choose_us.title"
                        label="عنوان القسم"
                        labelName={labelClass}
                        className={textareaClass}
                        as="textarea"
                    />
                    <BilingualError name="why_choose_us.title" />
                </div>

                <div className="space-y-2">
                    <BilingualField
                        name="why_choose_us.subtitle"
                        label="وصف القسم"
                        labelName={labelClass}
                        className={textareaClass}
                        as="textarea"
                    />
                    <BilingualError name="why_choose_us.subtitle" />
                </div>
            </div>

            {/* Cards */}
            <FieldArray name="why_choose_us.cards">
                {({ push, remove }) => (
                    <div className="space-y-5">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#0d5c34]">
                                أسباب اختيار ريسيبي
                            </h3>

                            <button
                                type="button"
                                onClick={() => push(createEmptyCard())}
                                className="rounded-full bg-[#0d5c34] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#094a29]"
                            >
                                + إضافة سبب
                            </button>
                        </div>

                        <ArrayError name="why_choose_us.cards" />

                        {/* Existing + New Cards */}
                        {cards.map((_: unknown, index: number) => (
                            <div
                                key={index}
                                className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-neutral-800">
                                        السبب {index + 1}
                                    </h4>
                                    {cards.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                        >
                                            حذف
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <ImageUploadField
                                        name={`why_choose_us.cards[${index}].img`}
                                        label="صورة السبب"
                                    />
                                    <FieldError
                                        name={`why_choose_us.cards[${index}].img`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <BilingualField
                                        name={`why_choose_us.cards[${index}].title`}
                                        label="عنوان السبب"
                                        labelName={labelClass}
                                        className={textareaClass}
                                        as="textarea"
                                    />
                                    <BilingualError
                                        name={`why_choose_us.cards[${index}].title`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <BilingualField
                                        name={`why_choose_us.cards[${index}].subtitle`}
                                        label="وصف السبب"
                                        labelName={labelClass}
                                        className={textareaClass}
                                        as="textarea"
                                    />
                                    <BilingualError
                                        name={`why_choose_us.cards[${index}].subtitle`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </FieldArray>
        </div>
    );
}