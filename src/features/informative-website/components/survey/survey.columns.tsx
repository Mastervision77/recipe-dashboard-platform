import { createColumnHelper } from "@tanstack/react-table";

import ViewButtons from "../../../../shared/components/view/ViewButtons";
import type { AppTableFeatures } from "../../../../shared/components/Table/tableConfig";
import type { Survey } from "../../types/survey.types";


const columnHelper = createColumnHelper<AppTableFeatures , Survey>();

export const generateColumns = ({
    onView,
}: {
    onView?: (survey: Survey) => void;
}) => {
    return [
        columnHelper.accessor("id", {
            header: "id",
            cell: (info) => info.getValue() || "—",
        }),
        columnHelper.accessor("template.title", {
            header: "عنوان",
            cell: (info) => info.getValue() || "—",
        }),

       
        columnHelper.display({
            id: "actions",
            header: "الاجراءات",
            cell: (info) => {
                const survey = info.row.original as Survey;

                return (
                    <ViewButtons onClick={() => onView?.(survey)} />
                );
            },
        }),
    ];
};