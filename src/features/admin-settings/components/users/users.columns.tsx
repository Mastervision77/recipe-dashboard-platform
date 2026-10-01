import { createColumnHelper } from "@tanstack/react-table";
import ViewButtons from "../../../../shared/components/view/ViewButtons";
import EditButton from "../../../../shared/components/edit/EditButton";
import DeleteButton from "../../../../shared/components/delete/DeleteButton";
import type { User } from "../../types/users.types";
import StatusToggle from "../../../../shared/components/StatusToggle/StatusToggle";
import type { features } from "../../../../shared/components/Table/tableConfig";

const columnHelper = createColumnHelper<typeof features, User>();

export const generateUserColumns = ({ onView, onEdit, onDelete ,onStatusChange }: {
    onView?: (User: User) => void;
    onEdit?: (User: User) => void;
    onDelete?: (User: User) => void;
    onStatusChange?: (
        user: User,
        isActive: boolean
    ) => Promise<void>;
}) => [
        columnHelper.accessor("name", {
            header: "اسم الموظف",
            cell: (info) => info.getValue() || "—",
        }),
        columnHelper.accessor("role", {
            header: "الدور",
            cell: (info) => {
                const role = info.row.original.role.name || "-";

                return role;
            },
        }),
        columnHelper.accessor("is_active", {
    header: "الحالة",
    cell: (info) => {
        const user = info.row.original;

        return (
            <StatusToggle
                value={user.is_active}
                onChange={(value) =>
                    onStatusChange?.(user, value)
                }
            />
        );
    },
}),

        columnHelper.display({
            id: "actions",
            header: "الاجراءات",
            cell: (info) => {
                const User = info.row.original;

                return (
                    // <ActionDropdown>
                    <div className="flex gap-1">
                        <ViewButtons onClick={() => onView?.(User)} />
                        <EditButton onClick={() => onEdit?.(User)} />
                        <DeleteButton onClick={() => onDelete?.(User)} />
                    </div>
                    // </ActionDropdown>

                );
            },
        }),
    ];
