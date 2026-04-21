// useAiSearchBar.ts
import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPrompt } from "../services/aiSearchService";
import { useToast } from "@/shared/hooks/useToast";
import type { MovieType } from "@/shared/types/MovieType";
import { queryClient } from "@/shared/libs/react-query";

const MAX_CHARS = 100;

export const useAiSearchBar = () => {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { showToast } = useToast();

    const { data: movies } = useQuery<MovieType[]>({
        queryKey: ["aiMovies"],
        queryFn: () => [],
        enabled: false,
        staleTime: Infinity,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (prompt: string) => fetchPrompt(prompt),
        onError: (error) => showToast({ status: "error", title: error.message}),
        onSuccess: (data) => {
            queryClient.setQueryData(["aiMovies"], data);
        },
    });

    const charsUsed = query.length;
    const isOverLimit = charsUsed > MAX_CHARS;

    const canSubmit = query.trim().length > 0 && !isOverLimit && !isPending;

    const counterColor = useMemo(() => {
        if (isOverLimit) return "#e57373";
        if (charsUsed > MAX_CHARS - 20) return "rgba(255,255,255,0.6)";
        return "rgba(255,255,255,0.25)";
    }, [isOverLimit, charsUsed]);

    const handleSubmit = () => {
        if (!canSubmit) return;
        mutate(query.trim()); 
        
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit(); 
    };

    return {
        query,
        setQuery,
        isFocused,
        setIsFocused,
        inputRef,
        charsUsed,
        isOverLimit,
        canSubmit,
        counterColor,
        isLoading: isPending,
        handleSubmit,
        handleKeyDown,
        movies: movies ?? []
    };
};