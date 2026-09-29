import {
    useTable,
    type ColumnDef,
} from "@tanstack/react-table";
import { features } from "./tableConfig";

type TableProps<T extends object> = {
    data: T[];
    columns: ColumnDef<typeof features, T>[];
};



export function Table<T extends object>({
    data,
    columns,
}: TableProps<T>) {
    const table = useTable({
        features,
        data,
        columns,
    });

    return (
        <div className="overflow-x-auto rounded-xl border-2 border-brand-primary/10 bg-white shadow-xl">
            <table className="min-w-full border-collapse">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border-b-2 border-brand-primary/20 px-2 py-2 text-right text-sm font-bold text-brand-primary"
                                >
                                    {header.isPlaceholder ? null : (
                                        <table.FlexRender header={header} />
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="text-right transition-all duration-200"
                        >
                            {row.getAllCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="border-b border-gray-100 px-5 py-2 text-sm font-medium text-gray-700"
                                >
                                    <table.FlexRender cell={cell} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}