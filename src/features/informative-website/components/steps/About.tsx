import { useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { BilingualField } from "../../shared/BilingualField/BilingualField";
import {
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";

export function AboutStep() {
    const [field, meta] = useField("about.img");
    const { setFieldValue } = useFormikContext();

    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (field.value instanceof File) {
            const url = URL.createObjectURL(field.value);
            setPreview(url);

            return () => URL.revokeObjectURL(url);
        }

        if (typeof field.value === "string" && field.value) {
            setPreview(field.value);
        } else {
            setPreview(null);
        }
    }, [field.value]);

    const handleFile = (file?: File) => {
        if (!file) return;

        setFieldValue("about.img", file);
    };

    return (
        <div className="space-y-8" dir="rtl">
            {/* About Image */}
            <div>
                <label className={labelClass}>صورة قسم من نحن</label>

                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleFile(e.dataTransfer.files?.[0]);
                    }}
                    className="relative flex h-44 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 bg-white text-center transition hover:border-[#0d5c34] hover:bg-neutral-50"
                >
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="معاينة الصورة"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
                                <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-neutral-800">
                                    تغيير الصورة
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <svg
                                className="h-8 w-8 text-neutral-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l4-4m-4 4l-4-4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="text-sm text-neutral-500">
                                اضغط أو اسحب الصورة هنا
                            </span>

                            <span className="text-xs text-neutral-400">
                                PNG, JPG بحد أقصى 5MB
                            </span>
                        </>
                    )}
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                />

                {meta.touched && meta.error && (
                    <p className="mt-1 text-xs text-red-500">
                        {meta.error as string}
                    </p>
                )}
            </div>

              {/* Our Story */}
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    قصتنا
                </h3>

                <BilingualField
                    name="about.ourstory.title"
                    label="عنوان قصتنا"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />

                <BilingualField
                    name="about.ourstory.subtitle"
                    label="نص قصتنا"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />
            </div>

            {/* Mission */}
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    رسالتنا
                </h3>

                <BilingualField
                    name="about.mission.title"
                    label="عنوان الرسالة"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />

                <BilingualField
                    name="about.mission.subtitle"
                    label="نص الرسالة"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />
            </div>

            {/* Vision */}
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    رؤيتنا
                </h3>

                <BilingualField
                    name="about.vision.title"
                    label="عنوان الرؤية"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />

                <BilingualField
                    name="about.vision.subtitle"
                    label="نص الرؤية"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />
            </div>

          
        </div>
    );
}