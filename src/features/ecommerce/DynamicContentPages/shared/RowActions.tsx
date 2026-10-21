import { FiEdit2, FiTrash2 } from "react-icons/fi";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function RowActions({ onEdit, onDelete, disabled }: Props) {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <button
          type="button"
          title="تعديل"
          onClick={onEdit}
          disabled={disabled}
          className="cursor-pointer rounded-full border border-neutral-200 p-2 text-[#0d5c34] transition hover:bg-green-50 disabled:opacity-50"
        >
          <FiEdit2 size={16} />
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          title="حذف"
          onClick={onDelete}
          disabled={disabled}
          className="cursor-pointer rounded-full border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        >
          <FiTrash2 size={16} />
        </button>
      )}
    </div>
  );
}
