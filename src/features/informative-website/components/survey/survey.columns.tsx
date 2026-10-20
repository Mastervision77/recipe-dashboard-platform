import { createColumnHelper } from "@tanstack/react-table";

import ViewButtons from "../../../../shared/components/view/ViewButtons";
import type { AppTableFeatures } from "../../../../shared/components/Table/tableConfig";
import type { Survey } from "../../types/survey.types";


const columnHelper = createColumnHelper<AppTableFeatures, Survey>();

export const generateColumns = ({
    onView,
}: {
    onView?: (survey: Survey) => void;
}) => {
    return [
        columnHelper.accessor("job_role", {
            header: "المسمى الوظيفي",
            cell: (info) => info.getValue()?.label || "—",
        }),

        columnHelper.accessor("activity", {
            header: "نوع النشاط",
            cell: (info) => info.getValue()?.label || "—",
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