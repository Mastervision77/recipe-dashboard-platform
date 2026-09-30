import { toast } from "sonner";
import Swal from "sweetalert2";

type DeleteAlertOptions = {
    message?: string;
    onConfirm: () => Promise<void>;
};

export async function deleteAlert({
    message = "هل أنت متأكد من حذف هذا العنصر؟",
    onConfirm,
}: DeleteAlertOptions) {
    const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "حذف",
        cancelButtonText: "إلغاء",
        reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
        await onConfirm();

        toast.success("تم الحذف")
    } catch {
        toast.error("فشل في الحذف")
    }
}