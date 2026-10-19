import { useEffect, useMemo, useState } from "react";
import { Formik, Form, setNestedObjectValues, yupToFormErrors } from "formik";
import * as Yup from "yup";

import { useAboutQuery, useSaveAbout } from "../../api/about.api";
import type { AboutData } from "../../types/about.types";
import { aboutStepSchemas } from "../../schema/about.schema";
import { aboutInitialValues, mapAboutToForm } from "../../utils/about.utils";
import { BasicStep } from "../aboutSteps/BasicStep";
import { SliderStep } from "../aboutSteps/SliderStep";
import { VisionStep, MissionStep } from "../aboutSteps/SectionStep";
import { AboutValuesStep } from "../aboutSteps/AboutValuesStep";
import { Stepper } from "../../../../../informative-website/components/stepper/Stepper";
import { Button } from "../../../../../../shared/components/Button/Button";


const steps = [
  { id: "basic", label: "المعلومات الأساسية" },
  { id: "slider", label: "قسم السلايدر" },
  { id: "vision", label: "قسم الرؤية" },
  { id: "mission", label: "قسم الرسالة" },
  { id: "values", label: "قسم القيم" },
];

const stepComponents = [
  BasicStep,
  SliderStep,
  VisionStep,
  MissionStep,
  AboutValuesStep,
];

// بتفحص خطوة واحدة بالـ schema بتاعها وترجع الأخطاء ({} لو مفيش)
const validateStep = async (stepIndex: number, values: AboutData) => {
  try {
    await aboutStepSchemas[stepIndex].validate(values, { abortEarly: false });
    return {};
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return yupToFormErrors<AboutData>(err);
    }
    throw err;
  }
};

export function AboutForm() {
  const { data, isLoading } = useAboutQuery();

  // أول record = الموجود (تعديل)، ولو مفيش => إنشاء
  const record = data?.data?.[0];
  const { mutateAsync, isPending } = useSaveAbout(record?.id);

  const initialValues = useMemo(
    () => (record ? mapAboutToForm(record) : aboutInitialValues()),
    [record],
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [openStep, setOpenStep] = useState(0);

  useEffect(() => {
    setOpenStep(currentStep);
  }, [currentStep]);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  if (isLoading) return null;

  return (
    <Formik<AboutData>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={aboutStepSchemas[currentStep]}
      onSubmit={() => {}}
    >
      {({ values, setErrors, setTouched }) => {
        // يظهر الأخطاء في الحقول (errors + touched من غير re-validate)
        const showErrors = (errors: object) => {
          setErrors(errors);
          setTouched(setNestedObjectValues(errors, true), false);
        };

        const handleNext = async () => {
          const errors = await validateStep(currentStep, values);

          if (Object.keys(errors).length > 0) {
            showErrors(errors);
            return;
          }

          next();
        };

        const handleSave = async () => {
          // نفحص كل الخطوات بالترتيب، ونقف عند أول خطوة فيها خطأ
          for (let i = 0; i < aboutStepSchemas.length; i++) {
            const errors = await validateStep(i, values);

            if (Object.keys(errors).length > 0) {
              setCurrentStep(i); // يفتح الخطوة (الـ useEffect بيظبط openStep)
              showErrors(errors);
              return; // مفيش إرسال للباك
            }
          }

          await mutateAsync(values);
        };

        return (
          <Form dir="rtl" className="flex flex-1 flex-col">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              openStep={openStep}
              onStepClick={setOpenStep}
            >
              {(i) => {
                const StepComponent = stepComponents[i];
                return <StepComponent />;
              }}
            </Stepper>

            <div className="sticky bottom-0 z-10 mt-auto flex justify-end gap-3 border-t border-gray-200 bg-white py-3">
              {currentStep > 0 && (
                <Button type="button" onClick={back} disabled={isPending}>
                  السابق
                </Button>
              )}

              {currentStep < steps.length - 1 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isPending}
                  className="rounded bg-gray-600 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  التالي
                </Button>
              )}

              <Button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="rounded bg-teal-700 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
