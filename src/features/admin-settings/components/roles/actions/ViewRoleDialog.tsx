import { Button } from "../../../../../shared/components/Button/Button";
import InfoItem from "../../../../informative-website/shared/Infoitems/InfoItem";


type Role = {
    id: number;
    name: string;
    permissions: string[];
    created_at: string;
};

type Props = {
    role: Role | null;
    onClose: () => void;
};

export default function ViewRoleDialog({
    role,
    onClose,
}: Props) {
    if (!role) return null;

    return (
        <>
            {/* Header */}
            <div className="bg-[#0d5c34] p-5 text-white">
                <h2 className="text-lg font-bold">
                    بيانات الدور
                </h2>
            </div>

            {/* Content */}
            <div className="space-y-5 p-6">

                <div className="grid gap-4 sm:grid-cols-2">
                    <InfoItem
                        label="اسم الدور"
                        value={role.name}
                    />

                    <InfoItem
                        label="تاريخ الإنشاء"
                        value={new Date(role.created_at).toLocaleDateString("ar-EG")}
                    />
                </div>

                <div>
    <p className="mb-2 text-sm font-medium text-gray-500">
        الصلاحيات
    </p>

    <div className="flex flex-wrap gap-2">
        {role.permissions?.map((permission) => (
            <span
                key={permission.id}
                className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-[#0d5c34]"
            >
                {permission.label}
            </span>
        ))}
    </div>
</div>
                

            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-gray-100 p-4">
                <Button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-full border border-neutral-300 px-6 py-2 text-sm hover:bg-gray-50"
                >
                    إغلاق
                </Button>
            </div>
        </>
    );
}
