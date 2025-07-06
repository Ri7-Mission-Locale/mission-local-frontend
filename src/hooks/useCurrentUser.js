import { useQuery } from "@tanstack/react-query";
import api from "../api/fetcher";

export default function useCurrentUser() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const { data } = await api.get("/profile");
            console.log(data);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
}