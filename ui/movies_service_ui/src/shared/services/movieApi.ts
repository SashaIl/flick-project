import type { MovieType } from "../types/MovieType";

export const getRecommendedMovies = async (userId: number): Promise<MovieType[]> => {

    try {
        const request = await fetch(`http://localhost:7159/api/movie/get_recommended_movies?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${BEARER_TOKEN}`
            }
        });
        const data = (await request.json())["data"];

        const movies = data.map((item: any) => {
            const movie: MovieType = {
                Id: item.id,
                Title: item.title,
                Favorited: item.favorited,
                ReleaseDate: new Date(item.releaseDate),
                Genres: item.genres.map((i: any) => ({ Name: i.name, GenreId: i.genreId })),
                Poster: item.poster ?? "",
                Ratings: {
                    VoteAverage: Math.floor(item.rating.voteAverage * 10) / 10 || 0,
                    VoteCount: item.rating.voteCount || 0,
                }
            }
            
            return movie;
        })
        
        return movies;
    }
    catch (error) {
        throw new Error(`Error fetching movies: ${error}`);
    }
    // return MOVIES;
}

export const getMovieOfTheDay = async (): Promise<MovieType | null> => {
    try {
        const request = await fetch(`http://localhost:7159/api/movie/get_movie_of_the_day`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${BEARER_TOKEN}`
            }
        });
        const data = (await request.json())["data"];

        const movie: MovieType = {
            Id: data.movieId,
            Favorited: data.favorited,
            Title: data.title,
            ReleaseDate: new Date(data.details?.releaseDate)
                ? new Date(data.details.releaseDate)
                : null,

            Poster: data.poster,

            Genres: data.genres?.map((g: any) => ({
                GenreId: g.genreId,
                Name: g.name,
            })),

            Overview: data.overview,

            Ratings: data.rating
                ? {
                    VoteAverage: Math.floor(data.rating.voteAverage * 10) / 10 || 0,
                    VoteCount: data.rating.voteCount,
                }
                : undefined,

            Details: data.details
                ? {
                    OriginalTitle: data.details.originalTitle,
                    OriginalLanguage: data.details.originalLanguage,
                    ProductionCountries: data.details.productionCountries ?? [],
                    IsReleased: data.details.isRealesed,
                    Trailer: data.details.trailer,
                    Revenue: data.details.revenue,
                    Runtime: data.details.runtime,
                    Director: data.details.director,
                    Writers: data.details.writers ?? [],
                    Actors: data.details.actors ?? [],
                }
                : undefined,
        }
        return movie;
    }
    catch (error) {
        throw new Error("Can not to get movie of the day")
    }
}


export const getMovieById = async (movieId: number): Promise<MovieType | null> => {

    try {
        const request = await fetch(`http://localhost:7159/api/movie/get_specified_movie?movieId=${movieId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${BEARER_TOKEN}`
            }
        });
        const data = (await request.json())["data"];

        const movie: MovieType = {
            Id: data.movieId,
            Favorited: data.favorited,
            Title: data.title,
            ReleaseDate: new Date(data.details?.releaseDate)
                ? new Date(data.details.releaseDate)
                : null,

            Poster: data.poster,

            Genres: data.genres?.map((g: any) => ({
                GenreId: g.genreId,
                Name: g.name,
            })),

            Overview: data.overview,

            Ratings: data.rating
                ? {
                    VoteAverage: Math.floor(data.rating.voteAverage * 10) / 10 || 0,
                    VoteCount: data.rating.voteCount,
                }
                : undefined,

            Details: data.details
                ? {
                    OriginalTitle: data.details.originalTitle,
                    OriginalLanguage: data.details.originalLanguage,
                    ProductionCountries: data.details.productionCountries ?? [],
                    IsReleased: data.details.isRealesed,
                    Trailer: data.details.trailer,
                    Revenue: data.details.revenue,
                    Runtime: data.details.runtime,
                    Director: data.details.director,
                    Writers: data.details.writers ?? [],
                    Actors: data.details.actors ?? [],
                }
                : undefined,
        }
        console.log(movie);

        return movie;
    }
    catch (error) {
        throw new Error("Error fetching movie details: " + error)
    }
}



