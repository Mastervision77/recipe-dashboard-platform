
import { Button } from "../../../../../shared/components/Button/Button";
import InfoItem from "../../../../informative-website/shared/Infoitems/InfoItem";
import type { User } from "../../../types/users.types";


type Props = {
    user: User | null;
    onClose: () => void;
};

export default function ViewUserDialog({
    user,
    onClose,
}: Props) {
    if (!user) return null;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-[#0d5c34] p-5 text-white">
                <h2 className="text-lg font-bold">
                    بيانات الموظف
                </h2>
            </div>

            {/* Content */}
            <div className="grid gap-5 p-6 sm:grid-cols-2">
                <InfoItem
                    label="الاسم"
                    value={user.name}
                />

                <InfoItem
                    label="رقم الهاتف"
                    value={user.phone}
                />

                <InfoItem
                    label="البريد الإلكتروني"
                    value={user.email}
                />

                <InfoItem
                    label="الدور"
                    value={user.role?.name}
                />

                <InfoItem
                    label="الحالة"
                    value={user.is_active ? "نشط" : "غير نشط"}
                />

                <InfoItem
                    label="النوع"
                    value={user.type}
                />

                <div className="col-span-2">
                    <p className="mb-2 text-sm font-medium text-gray-500">
                    الصلاحيات
                </p>

                <div className="flex flex-wrap gap-2">
                    {user.permissions?.map((permission) => (
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
        </div>
    );
}
