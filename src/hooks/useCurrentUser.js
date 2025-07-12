import { useQuery } from "@tanstack/react-query";
import api from "../api/fetcher";

export default function useCurrentUser() {
    const token = sessionStorage.getItem("access_token");

    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const { data } = await api.get("/profile");
            return data;
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
}