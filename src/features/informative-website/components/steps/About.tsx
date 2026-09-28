
import { BilingualField } from "../../shared/BilingualField/BilingualField";
import {
    labelClass,
    textareaClass,
} from "../../shared/stylings/ClassesCss";
import { ImageUploadField } from "../../shared/ImageUploadField/ImageUploadField";

export function AboutStep() {
   

    return (
        <div className="space-y-8" dir="rtl">
            {/* About Image */}
            <div>
                <ImageUploadField
                    name="about.img"
                    label="صورة من نحن"
                />
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