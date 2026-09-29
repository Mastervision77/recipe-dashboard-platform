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
        <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full border-collapse text-right text-xs md:text-sm">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="border-b border-gray-100 bg-white"
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-gray-400"
                                >
                                    {header.isPlaceholder ? null : (
                                        <table.FlexRender header={header} />
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="divide-y divide-gray-50">
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="transition-colors duration-150 hover:bg-slate-50/70"
                        >
                            {row.getAllCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-5 py-3.5 text-sm font-medium text-gray-700"
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