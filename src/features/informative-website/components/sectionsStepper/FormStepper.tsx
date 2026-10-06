
// import { useEffect, useState } from "react";
// import { Formik, Form } from "formik";
// import { Stepper } from "../stepper/Stepper";
// import { useLandingQuery, useUpdateLanding } from "../../api/auth.api";
// import { useMultiStepForm } from "../../hooks/useMultiStepForm";
// import type { LandingData } from "../../types/landing.types";
// import { stepSchemas } from "../../schema/landing.schema";
// import { AboutStep } from "../steps/About";
// import { ValuesStep } from "../steps/Values";
// import Why from "../steps/Why";
// import Services from "../steps/Services";
// import Catalog from "../steps/Catalog";
// import Team from "../steps/Team";
// import FAQ from "../steps/FAQ";
// import Contact from "../steps/Contact";
// import { Button } from "../../../../shared/components/Button/Button";
// import { HeroStep } from "../steps/Hero";

// const steps = [
//   { id: "hero", label: "قسم الرئيسي" },
//   { id: "about", label: "قسم من نحن" },
//   { id: "values", label: "قسم القيم" },
//   { id: "why_choose_us", label: "قسم لماذا نحن" },
//   { id: "services", label: "قسم الخدمات" },
//   { id: "catalog", label: "قسم الكتالوج" },
//   { id: "our_team", label: "قسم فريقنا" },
//   { id: "faq", label: "قسم الاسئلة و الاجوبة" },
//   { id: "contact", label: "قسم التواصل" },
// ];

// const stepComponents = [
//   HeroStep,
//   AboutStep,
//   ValuesStep,
//   Why,
//   Services,
//   Catalog,
//   Team,
//   FAQ,
//   Contact,
// ];

// export function LandingForm() {
//   const { data, isLoading } = useLandingQuery(1);
//   const { mutateAsync, isPending } = useUpdateLanding(1);

//   const { currentStep, next, back } = useMultiStepForm(steps.length);

//   const [openStep, setOpenStep] = useState(0);

//   useEffect(() => {
//     setOpenStep(currentStep);
//   }, [currentStep]);

//   if (isLoading || !data?.data) return null;

//   return (
//     <Formik<LandingData>
//       initialValues={data.data}
//       enableReinitialize
//       validationSchema={stepSchemas[currentStep]}
//       onSubmit={() => {}}
//     >
//       {({ values, validateForm }) => {
//         const handleSave = async () => {
//           await mutateAsync(values);
//         };

//         const handleNext = async () => {
//           const errors = await validateForm();

//           if (Object.keys(errors).length > 0) {
//             return;
//           }

//           next();
//         };

//         return (
//           <Form dir="rtl" className="flex flex-1 flex-col">
//             <Stepper
//               steps={steps}
//               currentStep={currentStep}
//               openStep={openStep}
//               onStepClick={setOpenStep}
//             >
//               {(i) => {
//                 const StepComponent = stepComponents[i];

//                 return <StepComponent />;
//               }}
//             </Stepper>

//             <div className="sticky bottom-0 z-10 mt-auto flex justify-end gap-3 border-t border-gray-200 bg-white py-3">
//               {currentStep > 0 && (
//                 <Button
//                   type="button"
//                   onClick={back}
//                   disabled={isPending}
//                 >
//                   السابق
//                 </Button>
//               )}

//               {/* التالي */}
//               <Button
//                 type="button"
//                 onClick={handleNext}
//                 disabled={isPending}
//                 className="rounded bg-gray-600 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 التالي
//               </Button>

//               {/* حفظ */}
//               <Button
//                 type="button"
//                 onClick={handleSave}
//                 disabled={isPending}
//                 className="rounded bg-teal-700 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {isPending ? "جاري الحفظ..." : "حفظ"}
//               </Button>
//             </div>
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// }

import { useEffect, useState } from "react";
import { Formik, Form, setNestedObjectValues, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { Stepper } from "../stepper/Stepper";
import { useLandingQuery, useUpdateLanding } from "../../api/auth.api";
import type { LandingData } from "../../types/landing.types";
import { stepSchemas } from "../../schema/landing.schema";
import { AboutStep } from "../steps/About";
import { ValuesStep } from "../steps/Values";
import Why from "../steps/Why";
import Services from "../steps/Services";
import Catalog from "../steps/Catalog";
import Team from "../steps/Team";
import FAQ from "../steps/FAQ";
import Contact from "../steps/Contact";
import { Button } from "../../../../shared/components/Button/Button";
import { HeroStep } from "../steps/Hero";

const steps = [
  { id: "hero", label: "قسم الرئيسي" },
  { id: "about", label: "قسم من نحن" },
  { id: "values", label: "قسم القيم" },
  { id: "why_choose_us", label: "قسم لماذا نحن" },
  { id: "services", label: "قسم الخدمات" },
  { id: "catalog", label: "قسم الكتالوج" },
  { id: "our_team", label: "قسم فريقنا" },
  { id: "faq", label: "قسم الاسئلة و الاجوبة" },
  { id: "contact", label: "قسم التواصل" },
];

const stepComponents = [
  HeroStep,
  AboutStep,
  ValuesStep,
  Why,
  Services,
  Catalog,
  Team,
  FAQ,
  Contact,
];

// بتفحص خطوة واحدة بالـ schema بتاعها وترجع الأخطاء ({} لو مفيش)
const validateStep = async (stepIndex: number, values: LandingData) => {
  try {
    await stepSchemas[stepIndex].validate(values, { abortEarly: false });
    return {};
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return yupToFormErrors<LandingData>(err);
    }
    throw err;
  }
};

export function LandingForm() {
  const { data, isLoading } = useLandingQuery(1);
  const { mutateAsync, isPending } = useUpdateLanding(1);

  const [currentStep, setCurrentStep] = useState(0);
  const [openStep, setOpenStep] = useState(0);

  useEffect(() => {
    setOpenStep(currentStep);
  }, [currentStep]);

  const next = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  if (isLoading || !data?.data) return null;

  return (
    <Formik<LandingData>
      initialValues={data.data}
      enableReinitialize
      validationSchema={stepSchemas[currentStep]}
      onSubmit={() => {}}
    >
      {({ values, setErrors, setTouched }) => {
        // يظهر الأخطاء في الحقول (errors + touched من غير ما يعمل re-validate)
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
          // نفحص كل الخطوات بالترتيب، ونوقف عند أول خطوة فيها خطأ
          for (let i = 0; i < stepSchemas.length; i++) {
            const errors = await validateStep(i, values);

            if (Object.keys(errors).length > 0) { // بيفتح الخطوة (الـ useEffect بيظبط openStep)
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

              {/* التالي */}
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

              {/* حفظ */}
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