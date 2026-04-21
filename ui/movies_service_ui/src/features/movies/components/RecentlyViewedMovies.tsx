import type { MovieType } from '@/shared/types/MovieType';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import MovieCard from './MovieCard';
import { useRecentlyViewedMovies } from '../hooks/useRecentlyViewedMovies';

const RecentlyViewedMovies = ({ recentlyViewedMovies } : { recentlyViewedMovies: MovieType[] }) => {

    const {scrollRef, scrollCarousel} = useRecentlyViewedMovies();

    return (
        
        <div className="mb-8 ">
            {recentlyViewedMovies.length > 0  && (
            <>
                <div className="flex items-center gap-2 mb-6">
                    <Clock size={24} className="text-primary" />
                    <h2 className="text-xl md:text-2xl">Recently Viewed</h2>
                </div>

                <div className="relative group flex items-center">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollCarousel("left")}
                        className="top-1/2 -translate-y-1/2 z-10 w-20 h-10 border border-border rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white hover:border-primary"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Carousel Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
                        style={{ scrollbarWidth: "none"}}
                    >
                        {recentlyViewedMovies.map((movie) => (
                            <div key={movie.Id} className="flex-shrink-0 w-48">
                                <MovieCard movie={movie} key={movie.Id}/>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollCarousel("right")}
                        className="top-1/2 -translate-y-1/2 z-10 w-20 h-10 border border-border rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white hover:border-primary"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </>
            )}
        </div>
    );
}

export default RecentlyViewedMovies;
