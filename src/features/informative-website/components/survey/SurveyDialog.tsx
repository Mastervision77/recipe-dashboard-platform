import { Button } from "../../../../shared/components/Button/Button";
import InfoItem from "../../shared/Infoitems/InfoItem";
import type { Survey } from "../../types/survey.types";

type Props = {
    survey: Survey | null;
    onClose: () => void;
};

export default function SurveyDialog({ survey, onClose }: Props) {
    if (!survey) return null;


    return (
        <>
            {/* Header */}
            <div className="bg-[#0d5c34] p-5 text-white">
                <h2 className="text-lg font-bold">بيانات الاستبيان</h2>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
                {/* بيانات المستجيب */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">
                        بيانات المستجيب
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InfoItem label="الاسم" value={survey.name} />
                        <InfoItem label="البريد الإلكتروني" value={survey.email} />
                        <InfoItem
                            dir="ltr"
                            label="رقم الهاتف"
                            value={`${survey.country_code} ${survey.phone_number}`}
                        />
                        <InfoItem label="نوع الاستبيان" value={survey.template?.title} />


                    </div>
                </section>

                {/* الإجابات */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">الإجابات</h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InfoItem label="الوظيفة" value={survey.job_role?.label} />
                        <InfoItem label="النشاط" value={survey.activity?.label} />
                        <InfoItem
                            label="عدد الفروع"
                            value={survey.branches_count?.label}
                        />
                        <InfoItem label="الموقع" value={survey.location?.label} />
                    </div>

                    {/* أكبر التحديات (multi) */}
                    <div className="rounded-lg border border-gray-200 p-4">
                        <p className="mb-2 text-sm font-semibold text-gray-700">
                            أكبر التحديات
                        </p>

                        {survey.biggest_challenge?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {survey.biggest_challenge.map((item) => (
                                    <span
                                        key={item.value}
                                        className="rounded-full bg-green-50 px-3 py-1 text-sm text-[#0d5c34]"
                                    >
                                        {item.label}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">—</p>
                        )}
                    </div>
                </section>




            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-gray-100 p-4">
                <Button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-full border border-neutral-300 px-6 py-2 text-sm hover:bg-gray-50"
                >
                    إغلاق
                </Button>
            </div>
        </>
    );
}