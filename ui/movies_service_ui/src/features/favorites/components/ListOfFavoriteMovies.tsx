import MovieCard from '@/features/movies/components/MovieCard';
import { ArrowLeft, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { UseListOfFavoriteMovies } from '../hooks/useListOfFavoriteMovies';

const ListOfFavoriteMovies = () => {


    const {favorites} = UseListOfFavoriteMovies();

    return (
        <div className="flex min-h-screen flex-col">
            {/* Main Content */}
            <div className="flex-1">
                <div className="container mx-auto px-4 py-6 max-w-6xl">
                    {/* Header */}
                    <div className="py-4">
                    <NavLink
                        to={"/"}
                        // onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Movies
                    </NavLink>
                </div>
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Heart size={24} className="text-primary fill-primary" />
                            </div>
                            <h1>My Favorites</h1>
                        </div>
                        <p className="text-muted-foreground">
                            Your collection of favorite movies ({favorites.length} movies)
                        </p>
                    </div>
                    {favorites.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[calc(100vh-400px)]">
                            {favorites.map((movie) => (
                                
                                <MovieCard movie={movie} key={movie.Id}/>
                            ))}
                        </div>
                    )}

                    {favorites.length === 0 && (
                        <div className="text-center py-16 bg-primary rounded-2xl shadow-sm min-h-[calc(100vh-400px)] flex flex-col items-center justify-center">
                            <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
                            <h2 className="mb-2">No favorites yet</h2>
                            <p className="text-muted-foreground mb-6">
                                Start adding books to your favorites to see them here
                            </p>
                            <NavLink
                                to={"/"}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                Browse Books
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default ListOfFavoriteMovies;
