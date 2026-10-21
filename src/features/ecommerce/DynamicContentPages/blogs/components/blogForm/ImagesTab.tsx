import { FieldError } from "../../../../../informative-website/shared/fielderrors/Fielderrors";
import { ImageUploadField } from "../../../../../informative-website/shared/ImageUploadField/ImageUploadField";

export function ImagesTab() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="space-y-2">
        <ImageUploadField name="cover" label="صورة الكارت (الخارجية)" />
        <FieldError name="cover" />
      </div>

      <div className="space-y-2">
        <ImageUploadField name="hero_banner" label="صورة البانر (الداخلية)" />
        <FieldError name="hero_banner" />
      </div>
    </div>
  );
}
