import { getIn, useFormikContext } from "formik";

type FormShape = Record<string, unknown>;

// خطأ حقل واحد (نص عادي أو صورة): name="why_choose_us.cards.0.img"
export function FieldError({ name }: { name: string }) {
    const { errors, touched } = useFormikContext<FormShape>();

    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    if (typeof error !== "string" || !isTouched) return null;

    return <p className="text-sm text-red-600">{error}</p>;
}

// خطأ حقل ثنائي اللغة (ar + en): name="why_choose_us.cards.0.title"
export function BilingualError({ name }: { name: string }) {
    const { errors, touched } = useFormikContext<FormShape>();

    const messages = (["ar", "en"] as const)
        .map((lang) => {
            const error = getIn(errors, `${name}.${lang}`);
            const isTouched = getIn(touched, `${name}.${lang}`);
            return typeof error === "string" && isTouched ? error : null;
        })
        .filter(Boolean) as string[];

    if (messages.length === 0) return null;

    return (
        <div className="space-y-1">
            {messages.map((message) => (
                <p key={message} className="text-sm text-red-600">
                    {message}
                </p>
            ))}
        </div>
    );
}

// خطأ على مستوى الـ array نفسه (مثلاً: لازم عنصر واحد على الأقل)
export function ArrayError({ name }: { name: string }) {
    return <FieldError name={name} />;
}