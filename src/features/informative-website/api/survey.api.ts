import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/axios";
import type { SurveyResponse } from "../types/survey.types";

export const SurveyKey = ["survey"] as const;

async function fetchSurvey(page: number): Promise<SurveyResponse> {
  const { data } = await api.get("/surveys", { params: { page } });
  return (data);
}

export function useSurveyQuery(page: number) {
  return useQuery({
    // الـ page جوّه الـ key عشان كل صفحة تتكاشّ لوحدها
    queryKey: [...SurveyKey, page],
    queryFn: () => fetchSurvey(page),
    // يفضل يعرض الصفحة القديمة لحد ما الجديدة توصل (من غير وميض)
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}