import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/axios";
import type { LandingData } from "../types/landing.types";
import { buildLandingFormData } from "../utils/buildLandingFormData";

const landingKey = (id: number) => ["landing", id] as const;

// fetching data
async function fetchLanding(id: number): Promise<LandingData> {
    const { data } = await api.get<LandingData>(
        `/landings/${id}`
    );

    return data;
}
export function useLandingQuery(id: number) {
    return useQuery({
        queryKey: landingKey(id),
        queryFn: () => fetchLanding(id),
    });
}


// updating landing page api 
export function useUpdateLanding(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: LandingData) => {
            const formData = buildLandingFormData(values);
            const res = await api.put(`/landings/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data?.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(landingKey(id), data);
        },
    });
}