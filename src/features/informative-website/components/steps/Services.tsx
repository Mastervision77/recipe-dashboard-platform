
import { useField } from "formik";
import { BilingualField } from "../../shared/BilingualField/BilingualField";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";
import {
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";
import ServicesCard from "../../shared/servicesCard/ServicesCard";

export default function Services() {
    const [cardsField] = useField("services.cards");

    const cards = cardsField.value || [];

    return (
        <div className="space-y-8" dir="rtl">
            {/* Section Header */}
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    خدماتنا وحلولنا
                </h3>

                <BilingualField
                    name="services.title"
                    label="عنوان القسم"
                    labelName={labelClass}
                    className={textareaClass}
                    as="textarea"
                />

                <ImageUploadField
                    name="services.img"
                    label="صورة القسم"
                />
            </div>

            {/* Services Cards */}
            <div className="space-y-5">
                <h3 className="text-base font-bold text-[#0d5c34]">
                    الخدمات
                </h3>

                {cards.map((_: unknown, index: number) => (
                    <ServicesCard
                        key={index}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

