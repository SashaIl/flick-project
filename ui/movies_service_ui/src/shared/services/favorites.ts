import type { MovieGenre, MovieType } from "../types/MovieType";

export const getFavoriteMovies = async (userId: number | undefined): Promise<MovieType[] | []> => {

    if(userId === undefined){
        throw new Error("user id is undefined")
    }
    const request = await fetch(`http://localhost:7159/api/movie/get_all_favorite_movies/${userId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        },
    })
    if(!request.ok){
        throw new Error("Can not fetch the favorite movies")
    }
    const output = await request.json();
    const data = output["data"] as any[];
    console.log(data);
    
    // Map backend DTO shape to frontend MovieType shape
    const movies: MovieType[] = data.map((m) => ({
        Id: m.movieId,
        Favorited: m.favorited ?? false,
        Title: m.Title ?? m.title ?? "None",
        ReleaseDate: new Date(m.releaseDate),
        Genres: (m.genres ?? []).map((g: MovieGenre) => ({ Name: g?.Name })) as any,
        Poster: m.poster ?? "None",
        Overview: m.overview ?? "None",
        Ratings: m.rating ? { voteAverage: m.rating.voteAverage, voteCount: m.rating.voteCount } : (m.rating ?? null),
        Details: m.details
            ? {
                  OriginalTitle: m.details.originalTitle ?? "None",
                  OriginalLanguage: m.details.originalLanguage ?? "None",
                  ProductionCountries: m.details.productionCountries ?? [],
                  IsReleased: m.details.isReleased ?? false,
                  Trailer: m.details.trailer ?? "None",
                  Revenue: m.details.revenue ?? 0,
                  Runtime: m.details.runtime ?? 0,
                  Director: m.details.director ?? "None",
                  Writers: m.details.writers ?? [],
                  Actors: m.details.actors ?? [],
              }
            : undefined,
    }));
    console.log(movies);
    
    return movies;
}

// export const getFavoriteIds = (): string[] => {
//     const favorites = localStorage.getItem(FAVORITES_KEY);
//     return favorites ? JSON.parse(favorites) : [];
// }

export const addToFavorites = async (movie: MovieType, userId: number) => {
        console.log(userId);
        
    const request = await fetch('http://localhost:7159/api/movie/add_movie_to_favorites', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        },
        body: JSON.stringify({
            movieId: movie.Id,
            userId: userId
        })
    })
    const response = await request.json()
    
    if(!request.ok){
        throw new Error(response["message"])
    }

    return;
}

export const removeFromFavorites = async (movieId: number, userId: number) => {
    console.log(movieId + " " + userId);
    
    const request = await fetch('http://localhost:7159/api/movie/remove_movie_from_favorites', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer"
        },
        body: JSON.stringify({
            movieId: movieId,
            userId: userId
        })
    })

    const response = await request.json()
    if(!request.ok){
        throw new Error(response["message"])
    }
    return
}

