import { createColumnHelper } from "@tanstack/react-table";
import type { ContactForm } from "../../types/contact.types";
import { Button } from "../../../../shared/components/Button/Button";

const columnHelper = createColumnHelper<ContactForm>();

export const generateColumns = ({
    onView,
}: {
    onView?: (contact: ContactForm) => void;
}) => {
    return [
        columnHelper.accessor("name", {
            header: "Name",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("email", {
            header: "Email",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("phone_number", {
            header: "Phone Number",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("topic", {
            header: "Topic",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("description", {
            header: "Description",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("message", {
            header: "Message",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => {
                const contact = info.row.original;

                return (
                    <Button
                        type="button"
                        onClick={() => onView?.(contact)}
                        className="rounded-md px-3 py-1 text-sm hover:bg-gray-100"
                    >
                        عرض
                    </Button>
                );
            },
        }),
    ];
};