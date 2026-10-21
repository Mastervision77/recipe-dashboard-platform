import { useState } from "react";
import { useField } from "formik";
import { Button } from "../../../../../../shared/components/Button/Button";
import { labelClass, textareaClass } from "../../../../../informative-website/shared/stylings/ClassesCss";

// مؤقتًا: إضافة المنتجات بالـ ID لحد ما يتوفر products API لاختيارها من قائمة
export function ProductsTab() {
  const [field, , helpers] = useField<number[]>("product_ids");
  const [draft, setDraft] = useState("");
  const ids = field.value || [];

  const add = () => {
    const id = Number(draft);
    if (!Number.isInteger(id) || id <= 0 || ids.includes(id)) return;
    helpers.setValue([...ids, id]);
    setDraft("");
  };

  return (
    <div className="space-y-4" dir="rtl">
      <label className={labelClass} htmlFor="product-id">
        المنتجات المرتبطة (بالـ ID)
      </label>

      <div className="flex gap-3">
        <input
          id="product-id"
          type="number"
          min={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="مثال: 12"
          dir="ltr"
          className={textareaClass}
        />
        <Button
          type="button"
          onClick={add}
          className="cursor-pointer whitespace-nowrap rounded-full bg-[#0d5c34] px-5 py-2 text-sm font-semibold text-white hover:bg-[#094a29]"
        >
          + إضافة
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ids.length === 0 && (
          <p className="text-sm text-neutral-500">لا توجد منتجات مرتبطة</p>
        )}

        {ids.map((id) => (
          <span
            key={id}
            className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm text-[#0d5c34]"
          >
            #{id}
            <button
              type="button"
              onClick={() => helpers.setValue(ids.filter((x) => x !== id))}
              className="cursor-pointer text-red-500 hover:text-red-700"
              aria-label="إزالة"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
