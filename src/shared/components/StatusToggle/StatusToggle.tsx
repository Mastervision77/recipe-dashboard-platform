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
            disabled={disabled || isLoading}
            onClick={handleChange}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${value ? "bg-[#0d5c34]" : "bg-gray-300"
                }`}
        >
            <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${value ? "right-0.5" : "right-[1.375rem]"
                    }`}
            />
        </Button>
    );
}