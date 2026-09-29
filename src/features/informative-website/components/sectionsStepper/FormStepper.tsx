import { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import { Stepper } from "../stepper/Stepper";
import { useLandingQuery, useUpdateLanding } from "../../api/auth.api";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import type { LandingData } from "../../types/landing.types";
import { stepSchemas } from "../../schema/landing.schema";
import { HeroStep } from "../steps/hero";
import { AboutStep } from "../steps/About";
import { ValuesStep } from "../steps/Values";
import Why from "../steps/Why";
import Services from "../steps/Services";
import Catalog from "../steps/Catalog";
import Team from "../steps/Team";
import FAQ from "../steps/FAQ";
import { Button } from "../../../../shared/components/Button/Button";
import Contact from "../steps/Contact";




const steps = [{ id: "hero", label: "قسم الرئيسي" } , 
  {id:"about" , label:"قسم من نحن"} ,
  {id: "values" , label: "قسم القيم"}, 
  {id: "why_choose_us" , label:"قسم لماذا نحن"},
  {id:"services" , label:"قسم الخدمات"},
  { id: "catalog", label: "قسم الكتالوج" },
  { id: "our_team", label: "قسم فريقنا" },
  { id: "faq", label: "قسم الاسئلة و الاجوبة" },
  { id: "contact", label: "قسم التواصل" },
];


const stepComponents = [HeroStep , AboutStep , ValuesStep , Why , Services ,Catalog , Team , FAQ , Contact /*, AboutStep */];

export function LandingForm() {
  const { data, isLoading } = useLandingQuery(1);
  const { mutateAsync , isPending } = useUpdateLanding(1);
  const { currentStep, next, back, isLast } = useMultiStepForm(steps.length);

  const [openStep, setOpenStep] = useState(0);
  

  useEffect(() => {
    setOpenStep(currentStep);
  }, [currentStep]);

  if (isLoading || !data?.data) return null;


  console.log(data)

  return (
    <Formik<LandingData>
      initialValues={data?.data}
      enableReinitialize
      validationSchema={stepSchemas[currentStep]}
      onSubmit={async (values) => {
        if (!isLast) {
          next();
          return;
        }
        console.log("values when supmittting",values);
        await mutateAsync(values);
      }}
    >
      {({values}) => {

return( <Form dir="rtl" className="flex-1">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            openStep={openStep}
            onStepClick={setOpenStep}
            isStepEnabled={(i) => i <= currentStep}
          >
            {(i) => {
              const StepComponent = stepComponents[i];
              return (
                <>
                  <StepComponent />

                  {i === currentStep && (
                    <div className="mt-6 flex gap-3">
                      {currentStep > 0 && (
                        <Button type="button" onClick={back}>
                         { 
                          isPending ? "" : "السابق"
                         }
                        </Button>
                      )}
                      <Button
  type="submit"
  disabled={isPending}
  className="bg-teal-700 text-white px-6 py-2 rounded disabled:cursor-not-allowed disabled:opacity-60"
>
  {isPending ? "جاري الحفظ..." : isLast ? "حفظ" : "التالي"}
</Button>
                    </div>
                  )}
                </>
              );
            }}
          </Stepper>
        </Form>)
      }}
    </Formik>
  );
}
