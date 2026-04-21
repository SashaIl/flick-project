import { useCallback, useRef } from "react";

export const useRecentlyViewedMovies = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollCarousel = useCallback((direction: "left" | "right")  => {

        if (!scrollRef.current) return; 

        const scrollAmount = 300;

        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    },[])

    return {scrollRef, scrollCarousel};
}