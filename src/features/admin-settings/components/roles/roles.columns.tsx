import { createColumnHelper } from "@tanstack/react-table";
import type { Role } from "../../types/roles.types";
import ViewButtons from "../../../../shared/components/view/ViewButtons";
import { ActionDropdown } from "../../../../shared/components/ActionDropdown/ActionDropdown";
import EditButton from "../../../../shared/components/edit/EditButton";
import DeleteButton from "../../../../shared/components/delete/DeleteButton";

const columnHelper = createColumnHelper<Role>();

export const generateRoleColumns = ({ onView, onEdit, onDelete }: {
    onView?: (role: Role) => void;
    onEdit?: (role: Role) => void;
    onDelete?: (role: Role) => void;
}) => [
        columnHelper.accessor("name", {
            header: "اسم الدور",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.display({
            id: "actions",
            header: "الاجراءات",
            cell: (info) => {
                const role = info.row.original;

                return (
                    // <ActionDropdown>
                        <div className="flex gap-1">
                            <ViewButtons onClick={() => onView?.(role)} />
                        <EditButton onClick={() => onEdit?.(role)} />
                        <DeleteButton onClick={() => onDelete?.(role)} />

                        </div>
                    // </ActionDropdown>

                );
            },
        }),
    ];
