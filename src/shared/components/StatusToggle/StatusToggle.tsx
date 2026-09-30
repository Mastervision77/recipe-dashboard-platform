import { useState } from "react";
import { Button } from "../Button/Button";

type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
};

export default function StatusToggle({
    value,
    onChange,
    disabled = false,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = async () => {
        if (disabled || isLoading) return;

        setIsLoading(true);

        try {
            await onChange(!value);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            type="button"
            onClick={handleChange}
            disabled={disabled || isLoading}
            className={`relative h-6 w-11 rounded-full transition-colors ${
                value ? "bg-[#0d5c34]" : "bg-gray-300"
            } ${disabled || isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
            <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                   value ? "translate-x-5"
                        : "translate-x-0.5"
                }`}
            />
        </Button>
    );
}