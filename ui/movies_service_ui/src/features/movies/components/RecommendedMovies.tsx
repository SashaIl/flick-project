import { useMemo, useState } from "react";
import { useRecommendedMovies } from "../hooks/useRecommendedMovies";
import MovieCard from "./MovieCard";
import FilterSidebar from "@/features/movieFilter/components/FilterSidebar";

const RecommendedMovies = () => {
    const { movies, isFetchingNextPage, loading, fetchNextPage } = useRecommendedMovies();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const filteredMovies = useMemo(() => {
        if (selectedGenres.length === 0) return movies;
        return movies.filter(movie =>
            movie.Genres.some(g => selectedGenres.includes(g.Name))
        );
    }, [movies, selectedGenres]);
    
    return (
        <>
            <div className="relative my-10">
                
                <div style={{
                    height: "1px",
                    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)"
                }} />

                <div style={{
                    height: "4px",
                    marginTop: "-2px",
                    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
                    filter: "blur(4px)"
                }} />

                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className="px-5 py-1 text-xs tracking-widest uppercase rounded-full"
                        style={{
                            background: "rgba(33,35,39,1)",
                            color: "rgba(255,255,255,0.45)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        Recommended for you
                    </span>
                </div>
            </div>

            <FilterSidebar
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                onClear={() => setSelectedGenres([])}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.Id} />
                ))}
            </div>


            <div className="flex justify-center tracking-widest ">
                <button
                    className="bg-primary rounded-full text-xs px-8 py-3 mt-10 tracking-widest cursor-pointer uppercase disabled:cursor-not-allowed disabled:bg-primary/50"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? "Loading..." : "More"}
                </button>
            </div>

            {loading && <p>Loading...</p>}
        </>
    );
};
export default RecommendedMovies;