import { createColumnHelper } from "@tanstack/react-table";
import type { Role } from "../../types/roles.types";

const columnHelper = createColumnHelper<Role>();

export const generateRoleColumns = () => [
    columnHelper.accessor("name", {
        header: "اسم الدور",
        cell: (info) => info.getValue() || "—",
    }),

    columnHelper.display({
        id: "permissions",
        header: "عدد الصلاحيات",
        cell: (info) => {
            const count = info.row.original.permissions?.length;
            return count === undefined ? "—" : count;
        },
    }),
];
