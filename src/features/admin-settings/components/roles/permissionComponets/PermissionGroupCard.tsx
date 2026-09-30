import { useEffect, useRef } from "react";
import type { PermissionGroup } from "../../../types/roles.types";
import { getGroupLabel } from "./permissionGroupLabels";

type Props = {
    group: PermissionGroup;
    selected: Set<number>;
    onToggle: (id: number) => void;
    onToggleGroup: (ids: number[], checked: boolean) => void;
};

export default function PermissionGroupCard({
    group,
    selected,
    onToggle,
    onToggleGroup,
}: Props) {
    const ids = group.permissions.map((p) => p.id);
    const selectedCount = ids.filter((id) => selected.has(id)).length;
    const allSelected = ids.length > 0 && selectedCount === ids.length;
    const someSelected = selectedCount > 0 && !allSelected;

    // حالة "جزئي" للـ checkbox (indeterminate لازم تتظبط من الـ DOM)
    const groupCheckboxRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (groupCheckboxRef.current) {
            groupCheckboxRef.current.indeterminate = someSelected;
        }
    }, [someSelected]);

    return (
        <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <header className="flex items-center justify-between gap-3 border-b border-gray-100 bg-slate-50 px-5 py-3.5">
                <label className="flex cursor-pointer items-center gap-3">
                    <input
                        ref={groupCheckboxRef}
                        type="checkbox"
                        checked={allSelected}
                        onChange={(e) => onToggleGroup(ids, e.target.checked)}
                        className="size-4 accent-[#0d5c34]"
                    />
                    <span className="text-sm font-bold text-gray-800">
                        {getGroupLabel(group.group)}
                    </span>
                </label>

                <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-gray-500 ring-1 ring-gray-200">
                    {selectedCount} / {ids.length}
                </span>
            </header>

            <ul className="divide-y divide-gray-50">
                {group.permissions.map((p) => (
                    <li key={p.id}>
                        <label className="flex cursor-pointer items-center gap-3 px-5 py-3 text-sm text-gray-700 transition-colors hover:bg-slate-50">
                            <input
                                type="checkbox"
                                checked={selected.has(p.id)}
                                onChange={() => onToggle(p.id)}
                                className="size-4 accent-[#0d5c34]"
                            />
                            {p.label}
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    );
}
