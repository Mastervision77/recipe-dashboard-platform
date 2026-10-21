import { Button } from "../../../../../../shared/components/Button/Button";
import StatusBadge from "../../../shared/StatusBadge";
import { useToggleBlogStatus } from "../../api/blogs.api";
import type { BlogApi } from "../../types/blogs.types";

// الحالة API مستقل (toggle-status) — بيتنفذ فورًا من غير فورم
export function StatusTab({ record }: { record: BlogApi }) {
  const { mutate, isPending } = useToggleBlogStatus();
  const active = Boolean(record.is_active);

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">حالة المقال الحالية:</span>
        <StatusBadge active={active} />
      </div>

      <Button
        type="button"
        onClick={() => mutate(record.id)}
        disabled={isPending}
        className={`cursor-pointer rounded-full px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 ${
          active ? "bg-red-600 hover:bg-red-700" : "bg-[#0d5c34] hover:bg-[#094a29]"
        }`}
      >
        {isPending ? "جاري التغيير..." : active ? "تعطيل المقال" : "تفعيل المقال"}
      </Button>
    </div>
  );
}
