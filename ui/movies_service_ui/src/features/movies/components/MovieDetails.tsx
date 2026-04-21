import { ArrowLeft, Star, Film, Pen, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import HeartBtn from "./HeartBtn";

const MovieDetails = () => {

    const {movie, formatRevenue, formatRuntime} = useMovieDetails();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <div className="flex-1 container mx-auto px-4 max-w-6xl">
                {/* Back Button */}
                <div className="py-4">
                    <NavLink
                        to={"/"}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Movies
                    </NavLink>
                </div>

                {/* Movie Detail Content */}
                <div className="pb-12 min-h-[calc(100vh-200px)]">
                    <div className="bg-gradient-to-br from-[#17181a] to-[#2b2c2e] rounded-2xl shadow-lg overflow-hidden mb-8">
                        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                            {/* Movie Poster */}
                            <div className="flex justify-center">
                                <img
                                    src={movie?.Poster}
                                    className="w-full max-w-md h-auto rounded-2xl shadow-xl object-cover"
                                />
                            </div>
                            

                            {/* Movie Information */}
                            <div className="flex flex-col items-center gap-6 justify-center">
                                
                                <div className="flex gap-8">
                                    <span className="mb-2 text-3xl">{movie?.Title}</span>
                                    {movie!=null && <HeartBtn movie={movie}/>}
                                </div>
                                <div className="mb-4">
                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="flex items-center">
                                            {[...Array(10)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={20}
                                                    className={
                                                        i < Math.floor(movie?.Ratings?.VoteAverage || 0)
                                                            ? "fill-white"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <span className="text-foreground">
                                            {movie?.Ratings?.VoteAverage}
                                        </span>
                                    </div>
                                </div>

                                {/* Genres & Description */}
                                <div className="mb-6 flex-1">
                                    {movie?.Genres.map((genre) => (
                                        <span
                                            key={genre.Name}
                                            className="inline-block px-3 py-1 shadow-xs shadow-white text-foreground rounded-full text-sm mr-2 mb-2"
                                        >
                                            {genre.Name}
                                        </span>
                                    ))}
                                    <h3 className="mb-3 mt-6">Description</h3>
                                    <p className="text-foreground leading-relaxed">{movie?.Overview}</p>
                                </div>

                                {/* Quick Stats */}
                                <div className="w-full grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                    {/* Runtime */}
                                    <div className="flex  gap-2 bg-white/5 rounded-xl px-4 py-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Runtime</p>
                                            <p className="text-sm font-medium text-foreground">
                                                {movie?.Details?.Runtime && formatRuntime(movie?.Details?.Runtime)}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Revenue */}
                                    <div className="flex gap-2 bg-white/5 rounded-xl px-4 py-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Revenue</p>
                                            <p className="text-sm font-medium text-foreground">
                                                {movie?.Details?.Revenue && formatRevenue(movie?.Details?.Revenue)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trailer */}
                    <div className="max-w-3xl mx-auto mb-8">
                        {movie?.Details?.Trailer !== "" ? (
                            <div className="w-full aspect-video rounded-xl overflow-hidden">
                                <iframe
                                    className="w-full h-full"
                                    src={movie?.Details?.Trailer}
                                    title="Trailer"
                                    // allowFullScreena
                                />
                            </div>
                        ) : (
                            <p className="text-center">no trailer</p>
                        )}
                    </div>

                    {/* Director, Writers, Actors */}
                    <div className="bg-gradient-to-br from-[#17181a] to-[#2b2c2e] rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                        <h2 className="mb-6">Cast & Crew</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Director */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-white/20">
                                    <Film size={18} />
                                    <h3 className="text-base font-semibold">Director</h3>
                                </div>
                                <p className="text-foreground bg-white/5 rounded-xl px-4 py-3 text-sm">
                                    {movie?.Details?.Director}
                                </p>
                            </div>

                            {/* Writers */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-white/20">
                                    <Pen size={18} />
                                    <h3 className="text-base font-semibold">Writers</h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {movie?.Details?.Writers?.length ? (
                                        movie.Details.Writers.map((writer, i) => (
                                            <span
                                                key={i}
                                                className="text-foreground bg-white/5 rounded-xl px-4 py-2 text-sm"
                                            >
                                                {writer}
                                            </span>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>

                            {/* Actors */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-white/20">
                                    <Users size={18} />
                                    <h3 className="text-base font-semibold">Actors</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {movie?.Details?.Actors?.length ? (
                                        movie.Details.Actors.map((actor, i) => (
                                            <span
                                                key={i}
                                                className="text-foreground bg-white/5 rounded-xl px-3 py-1.5 text-xs"
                                            >
                                                {actor}
                                            </span>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Reviews Section */}
                    <div className="bg-gradient-to-br from-[#17181a] to-[#2b2c2e] rounded-2xl shadow-lg p-6 md:p-8">
                        <h2 className="mb-6">User Reviews</h2>

                        {/* Reviews List */}
                        {/*<div className="space-y-6">
                            {[].map((review) => (
                                <div className="border-b border-border pb-6 last:border-b-0">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User size={24} className="text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="text-muted-foreground text-sm">•</span>
                                            </div>

                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-foreground leading-relaxed mb-3"></p>

                                            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                                <ThumbsUp size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>*/}

                        {/* Write Review Button */}
                        <div className="mt-8 pt-6 border-t border-border">
                            <button className="w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                                Write a Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;