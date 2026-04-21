import type { MovieType } from "@/shared/types/MovieType";


export const fetchPrompt = async (prompt: string) => {
     const request = await fetch(`http://localhost:7159/api/movie/get_movie_from_ai?prompt=${prompt}`)
    if (!request.ok) {
        throw new Error("Failed to find movies");
    }
    
    const response = (await request.json())["data"];
    console.log(response);
    
    const movies = response.map((item: any) => {
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