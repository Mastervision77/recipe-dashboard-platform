
import { BilingualField } from "../../shared/BilingualField/BilingualField";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";
import {
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";

export default function Catalog() {
    return (
        <div className="space-y-8" dir="rtl">
            <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    كتالوج المنتجات
                </h3>

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
            </div>
        </div>
    );
}
