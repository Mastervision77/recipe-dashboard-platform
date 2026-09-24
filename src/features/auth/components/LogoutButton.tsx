import { useLogout } from "../hooks/useLogout";

export function LogoutButton({ className }: { className?: string }) {
    const { mutate, isPending } = useLogout();

    return (
        <button
            type="button"
            onClick={() => mutate()}
            disabled={isPending}
            className={className}
        >
            تسجيل الخروج
        </button>
    );
}
