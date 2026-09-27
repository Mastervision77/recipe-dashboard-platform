import { LandingForm } from "../components/sectionsStepper/FormStepper";


export default function Informative() {

    return (
        <div className="space-y-6" dir="rtl">
            <div>
                <h1 className="text-2xl font-bold">
                    إدارة محتوى الموقع
                </h1>

                <p className="text-gray-500">
                    إدارة وتحديث محتوى أقسام الموقع
                </p>
            </div>

            <LandingForm />
        </div>
    );
}