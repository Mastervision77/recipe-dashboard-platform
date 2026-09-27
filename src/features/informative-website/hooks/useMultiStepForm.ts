
import { useState } from "react";

export function useMultiStepForm(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const goTo = (i: number) => setCurrentStep(i);

  return { currentStep, next, back, goTo, isFirst: currentStep === 0, isLast: currentStep === totalSteps - 1 };
}
