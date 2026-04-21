import { getMovieById } from "@/shared/services/movieApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { formatRevenue, formatRuntime } from "../services/MovieDetailsService";

export const useMovieDetails = () => {
    const {id} = useParams<{id: string}>();
    
    const { data: movie, isPending } = useQuery({
        queryKey: ["movie", id],
        queryFn: async () => getMovieById(Number(id)),
        staleTime: 1000 * 60 * 60,
        retry: 1
    })


    return { 
        movie,
        formatRevenue,
        formatRuntime,
        isPending,
    }
}