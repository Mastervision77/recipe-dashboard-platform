import { BilingualField } from "../../../../../informative-website/shared/BilingualField/BilingualField";
import { BilingualError, FieldError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import { ImageUploadField } from "../../../../../informative-website/shared/ImageUploadField/ImageUploadField";
import { labelClass, textareaClass } from "../../../../../informative-website/shared/stylings/ClassesCss";


type Props = {
  name: "vision" | "mission";
  heading: string;
  imageLabel: string;
  titleLabel: string;
  subtitleLabel: string;
};

function SectionStep({ name, heading, imageLabel, titleLabel, subtitleLabel }: Props) {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <h3 className="text-base font-bold text-[#0d5c34]">{heading}</h3>

        <div className="space-y-2">
          <ImageUploadField name={`${name}.img`} label={imageLabel} />
          <FieldError name={`${name}.img`} />
        </div>

        <div className="space-y-2">
          <BilingualField
            name={`${name}.title`}
            label={titleLabel}
            labelName={labelClass}
            className={textareaClass}
            as="textarea"
          />
          <BilingualError name={`${name}.title`} />
        </div>

        <div className="space-y-2">
          <BilingualField
            name={`${name}.subtitle`}
            label={subtitleLabel}
            labelName={labelClass}
            className={textareaClass}
            as="textarea"
          />
          <BilingualError name={`${name}.subtitle`} />
        </div>
      </div>
    </div>
  );
}

export const VisionStep = () => (
  <SectionStep
    name="vision"
    heading="رؤيتنا"
    imageLabel="صورة الرؤية"
    titleLabel="عنوان الرؤية"
    subtitleLabel="نص الرؤية"
  />
);

export const MissionStep = () => (
  <SectionStep
    name="mission"
    heading="رسالتنا"
    imageLabel="صورة الرسالة"
    titleLabel="عنوان الرسالة"
    subtitleLabel="نص الرسالة"
  />
);
