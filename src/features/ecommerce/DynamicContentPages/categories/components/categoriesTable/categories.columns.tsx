import { createColumnHelper } from "@tanstack/react-table";
import type { AppTableFeatures } from "../../../../../../shared/components/Table/tableConfig";
import type { CategoryApi } from "../../types/categories.types";
import RowActions from "../../../shared/RowActions";
import StatusBadge from "../../../shared/StatusBadge";

const columnHelper = createColumnHelper<AppTableFeatures, CategoryApi>();

type Params = {
  onEdit: (category: CategoryApi) => void;
  onDelete: (category: CategoryApi) => void;
};

export const generateColumns = ({ onEdit, onDelete }: Params) => [
  columnHelper.accessor((row) => row.name?.ar, {
    id: "name_ar",
    header: "الاسم بالعربي",
    cell: (info) => info.getValue() || "—",
  }),

  columnHelper.accessor((row) => row.name?.en, {
    id: "name_en",
    header: "الاسم بالإنجليزي",
    cell: (info) => info.getValue() || "—",
  }),

  columnHelper.accessor((row) => Boolean(row.is_active), {
    id: "is_active",
    header: "الحالة",
    cell: (info) => <StatusBadge active={info.getValue()} />,
  }),

  columnHelper.display({
    id: "actions",
    header: "الاجراءات",
    cell: (info) => {
      const category = info.row.original as CategoryApi;
      return (
        <RowActions
          onEdit={() => onEdit(category)}
          onDelete={() => onDelete(category)}
        />
      );
    },
  }),
];
