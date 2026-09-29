import { createColumnHelper } from "@tanstack/react-table";
import type { ContactForm } from "../../types/contact.types";
import ViewButtons from "../../../../shared/components/view/ViewButtons";


const columnHelper = createColumnHelper<ContactForm>();

export const generateColumns = ({
    onView,
}: {
    onView?: (contact: ContactForm) => void;
}) => {
    return [
        columnHelper.accessor("name", {
            header: "الاسم",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("email", {
            header: "البريد الالكتروني",
            cell: (info) => {
                const email = info.getValue();

                if (!email) return "—";

                const subject = "بخصوص طلب التواصل";

                return (
                    <a
                        target="_blank"
                        href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
                        className="text-brand-primary underline"
                    >
                        {email}
                    </a>
                );
            },
        }),

        columnHelper.accessor("phone_number", {
            header: "رقم الهاتف",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("topic", {
            header: "موضوع",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("description", {
            header: "الوصف",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.accessor("message", {
            header: "الرسالة",
            cell: (info) => info.getValue() || "—",
        }),

        columnHelper.display({
            id: "actions",
            header: "الاجراءات",
            cell: (info) => {
                const contact = info.row.original;

                return (
                    <ViewButtons onClick={() => onView?.(contact)} />
                );
            },
        }),
    ];
};