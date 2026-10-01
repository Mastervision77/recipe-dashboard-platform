import { FieldArray } from "formik";

import { BilingualField } from "../../shared/BilingualField/BilingualField";
import {
    inputClass,
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";
import { Button } from "../../../../shared/components/Button/Button";

const emptyFaq = {
    title: {
        ar: "",
        en: "",
    },
    subtitle: {
        ar: "",
        en: "",
    },
};

export default function FAQ() {
    return (
        <div className="space-y-6" dir="rtl">
            {/* FAQ Description */}
            <BilingualField
                name="faq.description"
                label="الوصف التعريفي"
                labelName={labelClass}
                className={textareaClass}
                as="textarea"
            />

            {/* Questions */}
            <FieldArray name="faq.faq">
                {({ push, remove, form }) => {
                    const questions = form.values.faq?.faq ?? [];

                    return (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-[#0d5c34]">
                                    الأسئلة والأجوبة
                                </h3>


                                <button
                                    type="button"
                                    onClick={() => push(emptyFaq)}
                                    className="rounded-full bg-[#0d5c34] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#094a2a]"
                                >
                                    + إضافة سؤال
                                </button>
                            </div>

                            {questions.map(
                                (_: unknown, index: number) => (
                                    <div
                                        key={index}
                                        className="space-y-5 rounded-2xl border border-neutral-200 p-5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-neutral-700">
                                                السؤال {index + 1}
                                            </h4>
                                            {questions.length > 1 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="rounded-full bg-red-50 px-4 py-2 text-sm text-red-600 transition hover:bg-red-100"
                                                >
                                                    حذف السؤال
                                                </Button>
                                            )}
                                        </div>

                                        <BilingualField
                                            name={`faq.faq.${index}.title`}
                                            label="السؤال"
                                            labelName={labelClass}
                                            className={inputClass}
                                        />

                                        <BilingualField
                                            name={`faq.faq.${index}.subtitle`}
                                            label="الإجابة"
                                            labelName={labelClass}
                                            className={textareaClass}
                                            as="textarea"
                                        />
                                    </div>
                                )
                            )}

                            {questions.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
                                    لا توجد أسئلة حاليًا
                                </div>
                            )}
                        </div>
                    );
                }}
            </FieldArray>
        </div>
    );
}