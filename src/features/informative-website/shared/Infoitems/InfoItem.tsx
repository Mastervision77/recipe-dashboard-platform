export default function InfoItem({
    label,
    value,
     dir = "auto",
}: {
    label: string;
    value?: string | null;
     dir?: "ltr" | "rtl" | "auto";
}) {
    return (
        <div>
            <p className="mb-1 text-sm font-semibold text-gray-600">
                {label}
            </p>

            <div dir={dir} className="break-all whitespace-pre-wrap rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-800">
    {value || "—"}
</div>
        </div>
    );
}