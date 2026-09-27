import type { ReactNode } from "react";


type Step = { id: string; label: string };

export function Stepper({
    steps,
    currentStep,
    openStep,
    onStepClick,
    isStepEnabled,
    children,
}: {
    steps: Step[];
    currentStep: number;
    openStep: number;
    onStepClick: (index: number) => void;
    isStepEnabled: (index: number) => boolean;
    children: (index: number) => ReactNode;
}) {
    return (
        <div className="flex flex-col">
            {steps.map((step, i) => {
                const isActive = i === currentStep;
                const isDone = i < currentStep;
                const isLast = i === steps.length - 1;
                const isOpen = openStep === i;
                const enabled = isStepEnabled(i);

                return (
                    <div key={step.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <button
                                type="button"
                                disabled={!enabled}
                                onClick={() => enabled && onStepClick(i)}
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold
                  ${isDone || isActive ? "bg-teal-700 text-white" : "border-2 border-gray-300 text-gray-400"}
                  ${enabled ? "cursor-pointer" : "cursor-not-allowed"}`}
                            >
                                {isDone ? "✓" : i + 1}
                            </button>
                            {!isLast && (
                                <div className={`w-0.5 flex-1 ${isDone ? "bg-teal-700" : "border-l-2 border-dashed border-gray-300"}`} />
                            )}
                        </div>

                        <div className="flex-1 pb-8">
                            <span
                                onClick={() => enabled && onStepClick(i)}
                                className={`text-lg font-semibold ${isActive ? "text-teal-700" : "text-gray-400"} ${enabled ? "cursor-pointer" : ""}`}
                            >
                                {step.label}
                            </span>

                            <div
                                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden">{children(i)}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
