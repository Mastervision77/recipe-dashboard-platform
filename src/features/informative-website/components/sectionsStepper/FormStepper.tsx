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




const steps = [{ id: "hero", label: "قسم الرئيسي" } , 
  {id:"about" , label:"قسم من نحن"} ,
  {id: "values" , label: "قسم القيم"}, 
  {id: "why_choose_us" , label:"قسم لماذا نحن"},
  {id:"services" , label:"قسم الخدمات"},
  { id: "catalog", label: "قسم الكتالوج" },
  /*, ...more */];


const stepComponents = [HeroStep , AboutStep , ValuesStep , Why , Services ,Catalog /*, AboutStep */];

export function LandingForm() {
  const { data, isLoading } = useLandingQuery(1);
  const { mutateAsync } = useUpdateLanding(1);
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
                        <button type="button" onClick={back}>
                          السابق
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-teal-700 text-white px-6 py-2 rounded"
                      >
                        {isLast ? "حفظ" : "التالي"}
                      </button>
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
