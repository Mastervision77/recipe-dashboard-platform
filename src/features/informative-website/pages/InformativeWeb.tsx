import { Link } from "react-router-dom";
import { LandingForm } from "../components/sectionsStepper/FormStepper";
import { FiExternalLink } from "react-icons/fi";


export default function Informative() {

    return (
        <div className="space-y-6" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">
                    إدارة محتوى الموقع
                </h1>

                <p className="text-gray-500">
                    إدارة وتحديث محتوى أقسام الموقع
                </p>
                </div>


                    <Link
    to="https://recipe-platform-latest-front.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0d5c34] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0a4b2b] hover:shadow-md"
>
    <FiExternalLink size={16} />
    عرض الموقع
</Link>

                 
            </div>

            <LandingForm />
        </div>
    );
}