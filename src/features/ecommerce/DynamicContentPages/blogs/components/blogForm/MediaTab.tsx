import { ImagesTab } from "./ImagesTab";
import { ProductsTab } from "./ProductsTab";

// تاب واحد: صورة الكارت + صورة البانر + المنتجات المرتبطة
export function MediaTab() {
  return (
    <div className="space-y-10" dir="rtl">
      <section className="space-y-4">
        <h3 className="text-lg font-bold">صور المقال</h3>
        <ImagesTab />
      </section>

      <section className="space-y-4 border-t border-neutral-200 pt-8">
        <h3 className="text-lg font-bold">المنتجات المرتبطة</h3>
        <ProductsTab />
      </section>
    </div>
  );
}
