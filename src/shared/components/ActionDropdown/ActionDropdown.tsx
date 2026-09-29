import React, { useState, useRef, useEffect } from "react";
import { Button } from "../Button/Button";
import { BsThreeDots } from "react-icons/bs";

export interface ActionItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive" | "warning";
    disabled?: boolean;
}

interface ActionDropdownProps {
    items?: ActionItem[];
    align?: "left" | "right";
    buttonClassName?: string;
    children?: React.ReactNode;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
    items = [],
    align = "right",
    buttonClassName = "",
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div
            className="relative inline-block text-left"
            ref={dropdownRef}
        >
            <Button
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className={`inline-flex items-center justify-center rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${buttonClassName}`}
            >
                <BsThreeDots />
            </Button>

            {isOpen && (
                <div
                    className={`absolute z-30 mt-1.5 w-14 p-2 rounded-xl bg-white shadow-xl ring-1 ring-black/5 ${align === "right" ? "right-0" : "left-0"
                        }`}
                    role="menu"
                >
                    {children}
                  

                     {items.map((item, idx) => {
                        const isDestructive =
                            item.variant === "destructive";
                        const isWarning = item.variant === "warning";

                        return (
                            <Button
                                key={idx}
                                type="button"
                                disabled={item.disabled}
                                onClick={() => {
                                    item.onClick();
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                                    isDestructive
                                        ? "text-red-600 hover:bg-red-50"
                                        : isWarning
                                          ? "text-amber-600 hover:bg-amber-50"
                                          : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </Button>
                        );
                    })}
                </div> 
           )}
        </div>
    );
};