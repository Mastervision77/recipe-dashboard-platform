import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export function Button({
    children,
    onClick,
    className = "",
    type = "button",
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    );
}