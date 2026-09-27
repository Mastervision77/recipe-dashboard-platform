type FormLabelProps = {
    htmlFor: string;
    children: React.ReactNode;
    required?: boolean;
};

export function FormLabel({
    htmlFor,
    children,
    required = false,
}: FormLabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className="mb-1.5 block text-sm font-medium text-slate-700"
        >
            {children}

            {required && (
                <span className="ms-1 text-red-500">*</span>
            )}
        </label>
    );
}