import { useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";

interface ImageUploadFieldProps {
    name: string;
    label: string;
}

export function ImageUploadField({
    name,
    label,
}: ImageUploadFieldProps) {
    const [field, meta] = useField(name);
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

        setFieldValue(name, file);
    };

    return (
        <div>
            <label className="text-xs font-semibold uppercase text-transparent bg-linear-to-r from-[#0d5c34] to-[#0d8f50] bg-clip-text">
                {label}
            </label>

            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();

                    handleFile(e.dataTransfer.files?.[0]);
                }}
                className="relative mt-2 flex h-44 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 bg-white text-center transition hover:border-[#0d5c34] hover:bg-neutral-50"
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt={label}
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
                onChange={(e) =>
                    handleFile(e.target.files?.[0])
                }
            />

            {meta.touched && meta.error && (
                <p className="mt-1 text-xs text-red-500">
                    {meta.error as string}
                </p>
            )}
        </div>
    );
}