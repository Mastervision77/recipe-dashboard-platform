import { createColumnHelper } from "@tanstack/react-table";
import type { AppTableFeatures } from "../../../../../../shared/components/Table/tableConfig";
import type { BlogApi } from "../../types/blogs.types";
import { getCategoryName } from "../../utils/blogs.utils";
import RowActions from "../../../shared/RowActions";

const columnHelper = createColumnHelper<AppTableFeatures, BlogApi>();

type Params = {
  onEdit: (blog: BlogApi) => void;
  onDelete: (blog: BlogApi) => void;
  onToggle: (blog: BlogApi) => void;
  togglingId?: number | null;
};

export const generateColumns = ({
  onEdit,
  onDelete,
  onToggle,
  togglingId,
}: Params) => [
  columnHelper.display({
    id: "cover",
    header: "الصورة",
    cell: (info) => {
      const cover = (info.row.original as BlogApi).cover;
      return cover ? (
        <img src={cover} alt="" className="h-12 w-16 rounded-md object-cover" />
      ) : (
        "—"
      );
    },
  }),

  columnHelper.accessor((row) => row.title?.ar, {
    id: "title",
    header: "العنوان",
    cell: (info) => info.getValue() || "—",
  }),

  columnHelper.display({
    id: "category",
    header: "التصنيف",
    cell: (info) => getCategoryName(info.row.original as BlogApi),
  }),

  columnHelper.accessor((row) => Boolean(row.is_featured), {
    id: "is_featured",
    header: "مميز",
    cell: (info) => (info.getValue() ? "نعم" : "لا"),
  }),

  // زرار تفعيل/تعطيل مباشر من الجدول (toggle-status)
  columnHelper.display({
    id: "is_active",
    header: "الحالة",
    cell: (info) => {
      const blog = info.row.original as BlogApi;
      const active = Boolean(blog.is_active);

      return (
        <button
          type="button"
          role="switch"
          aria-checked={active}
          disabled={togglingId === blog.id}
          onClick={() => onToggle(blog)}
          className={`relative h-6 w-11 cursor-pointer rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${
            active ? "bg-[#0d5c34]" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
              active ? "right-0.5" : "right-[1.375rem]"
            }`}
          />
        </button>
      );
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "الاجراءات",
    cell: (info) => {
      const blog = info.row.original as BlogApi;
      return (
        <RowActions onEdit={() => onEdit(blog)} onDelete={() => onDelete(blog)} />
      );
    },
  }),
];
