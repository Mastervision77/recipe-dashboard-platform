import { BilingualField } from "../BilingualField/BilingualField";
import { ImageUploadField } from "../ImageUploadField/ImageUploadField";
import { labelClass, textareaClass } from "../stylings/ClassesCss";

export default function WhyCard({ index }: { index: number }) {
    return (
        <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5">
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
    );
}