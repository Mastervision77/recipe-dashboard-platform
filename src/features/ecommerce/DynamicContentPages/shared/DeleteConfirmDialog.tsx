import { Button } from "../../../../shared/components/Button/Button";

type Props = {
  title: string;
  message: string;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteConfirmDialog({
  title,
  message,
  isPending,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div dir="rtl">
      <div className="bg-red-600 p-5 text-white">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="p-6 text-sm text-neutral-700">{message}</div>

      <div className="flex justify-end gap-3 border-t border-gray-100 p-4">
        <Button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="cursor-pointer rounded-full border border-neutral-300 px-6 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
        >
          إلغاء
        </Button>

        <Button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className="cursor-pointer rounded-full bg-red-600 px-6 py-2 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "جاري الحذف..." : "حذف"}
        </Button>
      </div>
    </div>
  );
}
