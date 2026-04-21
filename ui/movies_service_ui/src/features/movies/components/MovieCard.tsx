import { Star } from 'lucide-react';
import type { MovieType } from '../../../shared/types/MovieType';
import { NavLink } from 'react-router-dom';
import HeartBtn from './HeartBtn';
import type React from 'react';
import { memo } from 'react';

type MovieCardProps = {
    movie: MovieType;
    setFavorites?: React.Dispatch<React.SetStateAction<MovieType[]>>
}

const MovieCard = ({movie}: MovieCardProps) => {
    
    return (
        <div className="group cursor-pointer overflow-hidden bg-card rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <NavLink to={`/movie/${movie.Id}`}>

                <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                        <HeartBtn movie={movie} />

                        
                        <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1 text-white text-center text-xl font-medium justify-center">
                                {movie.Title}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1 text-white text-xl font-medium ">
                                {movie.Ratings?.VoteAverage !== 0 && (
                                    <>
                                        {movie.Ratings?.VoteAverage}
                                        <Star size={16} />
                                    </>
                                )}
                            </span>
                            <span className="text-white text-xl font-medium">
                                {movie.Genres[0]?.Name}
                            </span>
                            <span className="text-white text-lg">
                                {movie.Details?.ProductionCountries?.[0]}
                            </span>
                            <span className="text-white text-lg">
                                {movie.ReleaseDate !== null ? movie.ReleaseDate?.getFullYear().toString() : ''}
                            </span>
                        </div>  
                    </div>
                </div>
            </NavLink>
        </div>
    );

}

export default memo(MovieCard);
