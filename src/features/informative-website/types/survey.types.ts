export interface Survey {
    id: number;
    user_id: number | null;
    user: unknown | null;

    answers: string[];

    template: {
        id: number;
        code: string;
        key: string;
        title: string;
    };

    breakdown: {
        A: number;
        B: number;
        C: number;
        D: number;
    };

    deciding_question: string | null;
    ip_address: string;
    created_at: string;
}

export interface SurveyResponse {
    data: Survey[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}