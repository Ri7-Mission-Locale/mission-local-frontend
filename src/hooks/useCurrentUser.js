import { useQuery } from "@tanstack/react-query";
import api from "../api/fetcher";

export default function useCurrentUser() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            if (sessionStorage.getItem("access_token") === null) {
                return null;
            }
            const { data } = await api.get("/profile");
            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
}