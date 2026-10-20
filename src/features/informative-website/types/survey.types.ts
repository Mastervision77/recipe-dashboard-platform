// types/survey.types.ts
export type Option = {
    value: string;
    label: string;
};

export type Survey = {
    id: number;
    user_id: number | null;
    name: string;
    email: string;
    country_code: string;
    phone_number: string;
    user: unknown | null;
    job_role: Option | null;
    activity: Option | null;
    branches_count: Option | null;
    location: Option | null;
    biggest_challenge: Option[];
    result_message: string | null;
    answers: Record<string, string | string[]> | null;
    template: {
        id: number;
        code: string;
        key: string;
        title: string;
    } | null;
    breakdown: Record<string, number> | null;
    deciding_question: string | null;
    ip_address: string | null;
    created_at: string;
};


export interface SurveyResponse {
    data: Survey[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}