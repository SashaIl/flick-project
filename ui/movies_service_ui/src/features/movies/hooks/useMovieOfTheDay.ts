import { getMovieOfTheDay } from "@/shared/services/movieApi";
import { useQuery } from "@tanstack/react-query";

export const useMovieOfTheDay = () => {

    const {data: movie} = useQuery({
        queryKey: ["movieOfTheDay"],
        queryFn: async () => getMovieOfTheDay(),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        retry: 1,
    });
    return {movie};
}