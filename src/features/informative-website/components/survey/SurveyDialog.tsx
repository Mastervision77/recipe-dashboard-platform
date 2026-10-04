
import { Button } from "../../../../shared/components/Button/Button";
import { surveyQuestions } from "../../data/survey";
import InfoItem from "../../shared/Infoitems/InfoItem";
import type { Survey } from "../../types/survey.types";

type Props = {
    survey: Survey | null;
    onClose: () => void;
};



export default function SurveyDialog({
    survey,
    onClose,
}: Props) {
    if (!survey) return null;

    return (
        <>
            {/* Header */}
            <div className="bg-[#0d5c34] p-5 text-white">
                <h2 className="text-lg font-bold">
                    بيانات الاستبيان
                </h2>
            </div>

            {/* Content */}
            <div className="space-y-5 p-6">

                {/* Template */}
                <InfoItem
                    label="نوع الاستبيان"
                    value={survey.template?.title}
                />

                {/* Answers */}
                <div className="space-y-4">
                    {surveyQuestions.map((item, index) => {
                        const answer = survey.answers?.[index];

                        if (!answer) return null;

                        const answerText =
                            item.options[
                                answer as keyof typeof item.options
                            ];

                        return (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 p-4"
                            >
                                <p className="mb-2 text-sm font-semibold text-gray-700">
                                    {index + 1}. {item.question}
                                </p>

                                <div className="rounded-md bg-green-50 p-3">
                                    <p className="text-sm text-[#0d5c34]">
                                        {answerText}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Breakdown */}
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-700">
                        ملخص الإجابات
                    </h3>

                    <div className="grid grid-cols-4 gap-3">
                        {Object.entries(survey.breakdown ?? {}).map(
                            ([option, count]) => (
                                <div
                                    key={option}
                                    className="rounded-lg border border-gray-200 p-3 text-center"
                                >
                                    <p className="text-lg font-bold text-[#0d5c34]">
                                        {option}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {count} إجابة
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
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
