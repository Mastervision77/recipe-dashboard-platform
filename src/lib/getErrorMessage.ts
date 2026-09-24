import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        return (
            error.response?.data?.message ??
            (error.response ? "حدث خطأ، حاول مرة أخرى" : "تعذر الاتصال بالسيرفر")
        );
    }
    return "حدث خطأ غير متوقع";
}
