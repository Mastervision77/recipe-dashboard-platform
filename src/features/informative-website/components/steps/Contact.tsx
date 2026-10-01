import { Field, FieldArray, useFormikContext } from "formik";

import { BilingualField } from "../../shared/BilingualField/BilingualField";
import {
    labelClass,
    inputClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";

import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function Contact() {
    const { values } = useFormikContext<any>();

    return (
        <div className="space-y-8" dir="rtl">
            {/* Section Title */}
            <div className="space-y-4">
                <BilingualField
                    name="contact.title"
                    label="عنوان قسم التواصل"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />

                <BilingualField
                    name="contact.subtitle"
                    label="الوصف التعريفي"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />
            </div>

            {/* Emails */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className={labelClass}>البريد الإلكتروني</h3>

                    <FieldArray name="contact.email">
                        {({ push }) => (
                            <button
                                type="button"
                                onClick={() => push({ email: "" })}
                                className="flex items-center gap-2 rounded-full bg-[#0d5c34] px-4 py-2 text-sm text-white"
                            >
                                <FiPlus />
                                إضافة بريد
                            </button>
                        )}
                    </FieldArray>
                </div>

                <FieldArray name="contact.email">
                    {({ remove }) => (
                        <div className="space-y-3">
                            {values.contact?.email?.map((_: any, index: number) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Field
                                        type="email"
                                        name={`contact.email[${index}].email`}
                                        placeholder="البريد الإلكتروني"
                                        className={`${inputClass} text-left`}
                                    />
                                    {values.contact?.email.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="rounded-full p-3 text-red-500 hover:bg-red-50"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </FieldArray>
            </div>

            {/* Phones */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className={labelClass}>أرقام الهاتف</h3>

                    <FieldArray name="contact.phone">
                        {({ push }) => (
                            <button
                                type="button"
                                onClick={() => push({ phone: "" })}
                                className="flex items-center gap-2 rounded-full bg-[#0d5c34] px-4 py-2 text-sm text-white"
                            >
                                <FiPlus />
                                إضافة رقم
                            </button>
                        )}
                    </FieldArray>
                </div>

                <FieldArray name="contact.phone">
                    {({ remove }) => (
                        <div className="space-y-3">
                            {values.contact?.phone?.map((_: any, index: number) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Field
                                        type="text"
                                        name={`contact.phone[${index}].phone`}
                                        placeholder="رقم الهاتف"
                                        className={`${inputClass} text-left`}
                                        style={{ direction: "ltr" }}

                                    />

                                    {values.contact?.phone.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="rounded-full p-3 text-red-500 hover:bg-red-50"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </FieldArray>
            </div>

            {/* Addresses */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className={labelClass}>العناوين</h3>

                    <FieldArray name="contact.address">
                        {({ push }) => (
                            <button
                                type="button"
                                onClick={() =>
                                    push({
                                        ar: "",
                                        en: "",
                                    })
                                }
                                className="flex items-center gap-2 rounded-full bg-[#0d5c34] px-4 py-2 text-sm text-white"
                            >
                                <FiPlus />
                                إضافة عنوان
                            </button>
                        )}
                    </FieldArray>
                </div>

                <FieldArray name="contact.address">
                    {({ remove }) => (
                        <div className="space-y-5">
                            {values.contact?.address?.map((_: any, index: number) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-neutral-200 p-5"
                                >

                                    {values.contact?.address.length > 1 && (
                                        <div className="mb-4 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="flex items-center gap-2 text-sm text-red-500"
                                            >
                                                <FiTrash2 />
                                                حذف العنوان
                                            </button>
                                        </div>
                                    )}

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Field
                                            name={`contact.address[${index}].en`}
                                            label="العنوان بالإنجليزية"
                                            labelName={labelClass}
                                            className={textareaClass}
                                            as="textarea"
                                            style={{ direction: "ltr" }}
                                        />

                                        <Field
                                            name={`contact.address[${index}].ar`}
                                            label="العنوان بالعربية"
                                            labelName={labelClass}
                                            className={textareaClass}
                                            as="textarea"
                                        />


                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </FieldArray>
            </div>
        </div>
    );
}