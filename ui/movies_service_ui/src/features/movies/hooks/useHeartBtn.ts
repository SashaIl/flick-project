import { useAuth } from "@/shared/hooks/useAuth";
import { useToast } from "@/shared/hooks/useToast";
import { queryClient } from "@/shared/libs/react-query";
import { addToFavorites, removeFromFavorites } from "@/shared/services/favorites";
import type { MovieType } from "@/shared/types/MovieType";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useHeartBtn = (movie: MovieType) => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const favorites = queryClient.getQueryData<MovieType[]>(["favorites", user?.Id]) ?? [];
    const isFavorited = favorites.some(f => f.Id === movie.Id);

    const { mutate: removeFavorite } = useMutation({
        mutationFn: async ({ movieId }: { movieId: number }) =>
            await removeFromFavorites(movieId, user!.Id),
        onSuccess: (_, { movieId }) => {
            queryClient.setQueryData(["favorites", user?.Id], (old: MovieType[] | undefined) =>
                (old ?? []).filter(x => x.Id !== movieId)
            );
        }
    });

    const { mutate: addFavorite } = useMutation({
        mutationFn: async (movie: MovieType) =>
            await addToFavorites(movie, user?.Id ?? 0),
        onSuccess: (_, movie) => {
            queryClient.setQueryData(["favorites", user?.Id], (old: MovieType[] | undefined) =>
                [...(old ?? []), { ...movie, Favorited: true }]
            );
        },
        onError: (error: Error) =>
            showToast({ status: "error", title: "Error", description: error.message ?? "Can not add the movie" }),
    });

    const handleFavorite = useCallback(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (isFavorited) {
            removeFavorite({ movieId: movie.Id });
        } else {
            addFavorite(movie);
        }
    },[isAuthenticated, movie, isFavorited, removeFavorite, addFavorite]);

    return { handleFavorite, favorited: isFavorited };
};