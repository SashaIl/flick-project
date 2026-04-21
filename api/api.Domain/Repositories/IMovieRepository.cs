using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Repositories;

public interface IMovieRepository
{
    Task AddGenres(params MovieGenre[] genres);
    Task<string?> GetGenreById(int id);
    Task<List<MovieGenre>> GetAllGenresAsync();
    Task ToggleMovieFavorites(int userId, MovieInfo movie);
    Task<bool> IsMovieInFavorites(int userId, int movieId);
    IQueryable<MovieInfo>? GetFavoriteMovies(int userId);
    Task AddSeenMoviesAsync(List<SeenMovie> movies);
    Task<List<SeenMovie>?> GetSeenMoviesAsync(int userId);
    Task Remove200SeenMoviesAsync(int userId);
    Task AddMovieOfTheDayAsync(int movieId);
    Task RemoveMovieOfTheDayAsync(int movieId);
    Task<List<MovieOfTheDay>> GetMoviesOfTheDayAsync();
}
