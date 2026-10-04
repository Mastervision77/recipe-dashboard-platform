import { BilingualField } from "../../shared/BilingualField/BilingualField";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";
import {
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";
import { useFormikContext } from "formik";
import { BsFileEarmarkPdf, BsUpload, BsCheckCircle } from "react-icons/bs";

export default function Catalog() {
    const { setFieldValue, values } = useFormikContext<any>();

    const pdf = values.catalog?.pdf;
    const hasPdf = pdf instanceof File || typeof pdf === "string";

    return (
        <div className="space-y-8" dir="rtl">
            <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">

                <div className="border-b border-neutral-100 pb-4">
                    <h3 className="text-base font-bold text-[#0d5c34]">
                        كتالوج المنتجات
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                        أضف صورة الكتالوج والعنوان والوصف وملف الـ PDF الخاص به.
                    </p>
                </div>

                <ImageUploadField
                    name="catalog.img"
                    label="صورة الكتالوج"
                />

                <BilingualField
                    name="catalog.title"
                    label="عنوان الكتالوج"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />

                <BilingualField
                    name="catalog.subtitle"
                    label="وصف الكتالوج"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />

                {/* PDF Upload */}
                <div className="space-y-3">
                    <label className={labelClass}>
                        ملف الكتالوج PDF
                    </label>

                    <label
                        htmlFor="catalog-pdf"
                        className="group flex cursor-pointer items-center justify-between gap-4 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-5 py-4 transition-all hover:border-[#0d5c34]/40 hover:bg-[#0d5c34]/[0.03]"
                    >
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <BsFileEarmarkPdf size={24} />
                            </div>

                            <div className="min-w-0">
                                {pdf instanceof File ? (
                                    <>
                                        <p className="truncate text-sm font-semibold text-neutral-800">
                                            {pdf.name}
                                        </p>

                                        <p className="mt-1 text-xs text-neutral-500">
                                            {(pdf.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </>
                                ) : typeof pdf === "string" ? (
                                    <>
                                        <p className="text-sm font-semibold text-neutral-800">
                                            ملف الكتالوج الحالي
                                        </p>

                                        <p className="mt-1 text-xs text-[#0d5c34]">
                                            الملف مرفوع بالفعل
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-semibold text-neutral-700">
                                            رفع ملف PDF
                                        </p>

                                        <p className="mt-1 text-xs text-neutral-500">
                                            اضغط لاختيار ملف الكتالوج
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 rounded-lg bg-[#0d5c34] px-4 py-2 text-xs font-semibold text-white transition-opacity group-hover:opacity-90">
                            <BsUpload size={14} />
                            {hasPdf ? "تغيير الملف" : "اختيار ملف"}
                        </div>

                        <input
                            id="catalog-pdf"
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.currentTarget.files?.[0];

                                if (file) {
                                    setFieldValue("catalog.pdf", file);
                                }
                            }}
                        />
                    </label>

                    {typeof pdf === "string" && (
                        <a
                            href={pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0d5c34] hover:underline"
                        >
                            <BsFileEarmarkPdf size={14} />
                            عرض ملف PDF الحالي
                        </a>
                    )}

                    {pdf instanceof File && (
                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                            <BsCheckCircle size={14} />
                            تم اختيار الملف بنجاح
                        </div>
                    )}

                    <p className="text-xs text-neutral-400">
                        PDF فقط • يُفضل أن يكون حجم الملف أقل من 10MB
                    </p>
                </div>
            </div>
        </div>
    );
}