import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export function Button({
    children,
    onClick,
    className = "",
    type = "button",
    disabled = false,
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    );
}