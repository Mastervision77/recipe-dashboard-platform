import { createColumnHelper } from "@tanstack/react-table";
import type { Role } from "../../types/roles.types";
import ViewButtons from "../../../../shared/components/view/ViewButtons";
import { ActionDropdown } from "../../../../shared/components/ActionDropdown/ActionDropdown";
import EditButton from "../../../../shared/components/edit/EditButton";

const columnHelper = createColumnHelper<Role>();

export const generateRoleColumns = ({onView , onEdit}: {
    onView?: (role: Role) => void;
    onEdit?: (role: Role) => void;
}) => [
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

    columnHelper.display({
        id: "actions",
        header: "الاجراءات",
        cell: (info) => {
            const role = info.row.original;

            return (
                <ActionDropdown>
                    <ViewButtons onClick={() => onView?.(role)} />
                        <EditButton onClick={() => onEdit?.(role)} />

                </ActionDropdown>
                
            );
        },
    }),
];
