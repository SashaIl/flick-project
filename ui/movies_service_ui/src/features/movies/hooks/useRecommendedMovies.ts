import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/hooks/useAuth";
import { getRecommendedMovies } from "@/shared/services/movieApi";
import { useMemo } from "react";

export const useRecommendedMovies = () => {
  const { user } = useAuth();

  const {
    data,
    fetchNextPage,
    isLoading,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["recommended-movies", user?.Id],
    queryFn: () => getRecommendedMovies(user?.Id ?? 0),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, 
  });

  const movies = useMemo(() => 
    data?.pages.flat() ?? [],
    [data?.pages]
  )
  


  return {
    movies,
    loading: isLoading,
    isFetchingNextPage,
    fetchNextPage
  };
};