// import type { ReactNode } from "react";


// type Step = { id: string; label: string };

// export function Stepper({
//     steps,
//     currentStep,
//     openStep,
//     onStepClick,
//     isStepEnabled,
//     children,
// }: {
//     steps: Step[];
//     currentStep: number;
//     openStep: number;
//     onStepClick: (index: number) => void;
//     isStepEnabled: (index: number) => boolean;
//     children: (index: number) => ReactNode;
// }) {
//     return (
//         <div className="flex flex-col">
//             {steps.map((step, i) => {
//                 const isActive = i === currentStep;
//                 const isDone = i < currentStep;
//                 const isLast = i === steps.length - 1;
//                 const isOpen = openStep === i;
//                 const enabled = isStepEnabled(i);

//                 return (
//                     <div key={step.id} className="flex gap-3">
//                         <div className="flex flex-col items-center">
//                             <button
//                                 type="button"
//                                 disabled={!enabled}
//                                 onClick={() => enabled && onStepClick(i)}
//                                 className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold
//                   ${isDone || isActive ? "bg-teal-700 text-white" : "border-2 border-gray-300 text-gray-400"}
//                   ${enabled ? "cursor-pointer" : "cursor-not-allowed"}`}
//                             >
//                                 {isDone ? "✓" : i + 1}
//                             </button>
//                             {!isLast && (
//                                 <div className={`w-0.5 flex-1 ${isDone ? "bg-teal-700" : "border-l-2 border-dashed border-gray-300"}`} />
//                             )}
//                         </div>

//                         <div className="flex-1 pb-8">
//                             <span
//                                 onClick={() => enabled && onStepClick(i)}
//                                 className={`text-lg font-semibold ${isActive ? "text-teal-700" : "text-gray-400"} ${enabled ? "cursor-pointer" : ""}`}
//                             >
//                                 {step.label}
//                             </span>

//                             <div
//                                 className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
//                                     }`}
//                             >
//                                 <div className="overflow-hidden">{children(i)}</div>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

import { useEffect, useState, type ReactNode } from "react";

type Step = {
    id: string;
    label: string;
};

export function Stepper({
    steps,
    currentStep,
    openStep,
    onStepClick,
    onSave,
    saveLabel = "حفظ",
    saveMode = "fixed",
    isSaving = false,
    children,
}: {
    steps: Step[];
    currentStep: number;
    openStep: number;
    isStepEnabled: (index: number) => boolean;
    onStepClick: (index: number) => void;
    onSave?: (index: number) => void;
    saveLabel?: string;
    saveMode?: "section" | "fixed";
    isSaving?: boolean;
    children: (index: number) => ReactNode;
}) {
    // أي خطوة اتفتحت قبل كده تتحسب "تمت زيارتها"
    const [visited, setVisited] = useState<Set<number>>(
        () => new Set([currentStep, openStep]),
    );

    useEffect(() => {
        setVisited((prev) => {
            if (prev.has(openStep) && prev.has(currentStep)) return prev;
            const next = new Set(prev);
            next.add(openStep);
            next.add(currentStep);
            return next;
        });
    }, [openStep, currentStep]);

    const SaveButton = (index: number) => (
        <button
            type="button"
            disabled={isSaving}
            onClick={() => onSave?.(index)}
            className="rounded-lg bg-teal-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {isSaving ? "جاري الحفظ..." : saveLabel}
        </button>
    );

    return (
        <div className="flex flex-col">
            {steps.map((step, i) => {
                const isOpen = openStep === i;
                const isVisited = visited.has(i);
                const isLast = i === steps.length - 1;
                // الخط يتلوّن لما الخطوة اللي بعده تتزار
                const lineActive = visited.has(i + 1);

                return (
                    <div key={step.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <button
                                type="button"
                                onClick={() => onStepClick(i)}
                                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition-colors
                                    ${
                                        isVisited
                                            ? "bg-teal-700 text-white"
                                            : "border-2 border-gray-300 text-gray-400"
                                    }
                                    ${isOpen ? "ring-4 ring-teal-200" : ""}`}
                            >
                                {i + 1}
                            </button>

                            {!isLast && (
                                <div
                                    className={`w-0.5 flex-1 transition-colors ${
                                        lineActive
                                            ? "bg-teal-700"
                                            : "border-l-2 border-dashed border-gray-300"
                                    }`}
                                />
                            )}
                        </div>

                        <div className="flex-1 pb-8">
                            <span
                                onClick={() => onStepClick(i)}
                                className={`cursor-pointer text-lg font-semibold transition-colors ${
                                    isVisited
                                        ? "text-teal-700"
                                        : "text-gray-400"
                                }`}
                            >
                                {step.label}
                            </span>

                            <div
                                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                                    isOpen
                                        ? "grid-rows-[1fr] opacity-100 mt-4"
                                        : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    {children(i)}

                                    {saveMode === "section" && onSave && (
                                        <div className="mt-4 flex justify-end">
                                            {SaveButton(i)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

      
                <div className="sticky bottom-0 z-10 flex justify-end border-t border-gray-200 bg-white py-3">
                    {SaveButton(openStep)}
                </div>
        
        </div>
    );
}