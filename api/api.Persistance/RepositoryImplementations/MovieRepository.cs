using api.Domain.Entities;
using api.Domain.Repositories;
using api.Persistance.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.RepositoryImplementations;

public class MovieRepository : IMovieRepository
{
    private readonly ApplicationContext _context;

    public MovieRepository(ApplicationContext context)
        => _context = context;
    public async Task AddGenres(params MovieGenre[] genres)
    {
        await _context.AddRangeAsync(genres);
        await _context.SaveChangesAsync();  
    }

    public async Task ToggleMovieFavorites(int userId, MovieInfo movie)
    {
        UserProfile user = (await _context.UserProfiles.FirstOrDefaultAsync(x => x.Id == userId))!;
        if(user == null) { return; }

        if(movie == null) { return; }

        bool isMovieInFavorites = (await IsMovieInFavorites(userId, movie.MovieId));
        if (isMovieInFavorites == true) {
            _context.MovieInfos.Remove(movie);
        }
        else
        {
            List<int> genreIds = movie.Genres.Select(x => x.GenreId).ToList();
            var existingGenres = await _context.MovieGenres
                .Where(g => genreIds.Contains(g.Id))
                .ToListAsync();
            movie.Genres = existingGenres;

            movie.Favorited = true;

            user.FavoriteMovies?.Add(movie!);

        }

        await _context.SaveChangesAsync(); 
    }


    public async Task<bool> IsMovieInFavorites(int userId, int movieId)
    {
        UserProfile user = (await _context.UserProfiles
            .Include(x => x.FavoriteMovies)
            .FirstOrDefaultAsync(x => x.Id == userId))!;
        if (user == null) { return false; }

        MovieInfo movie = user.FavoriteMovies?.FirstOrDefault(x => x.MovieId == movieId)!;
        if (movie == null) { return false; }
        else { return true; }
    }

    public IQueryable<MovieInfo>? GetFavoriteMovies(int userId)
    {
        IQueryable<MovieInfo> movies = _context.UserProfiles
            .Include(x => x.FavoriteMovies)
            .Where(x => x.Id == userId)
            .SelectMany(x => x.FavoriteMovies!);

        return movies;
    }

    public async Task<string?> GetGenreById(int id)
    {
        MovieGenre? output = (await _context.MovieGenres.FirstOrDefaultAsync(x => x.Id == id));
        return output?.Name;
    }

    public async Task<List<MovieGenre>> GetAllGenresAsync()
    {
        List<MovieGenre> genres = await _context.MovieGenres
            .AsNoTracking()
            .ToListAsync();
        return genres;
    }

    public async Task AddSeenMoviesAsync(List<SeenMovie> movies)
    {
        await _context.SeenMovies.AddRangeAsync(movies);
        await _context.SaveChangesAsync();
    }

    public async Task<List<SeenMovie>?> GetSeenMoviesAsync(int userId)
    {
        return await _context.SeenMovies
            .Where(x => x.UserId == userId)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task Remove200SeenMoviesAsync(int userId)
    {
        List<SeenMovie> seenMovies = await _context.SeenMovies
            .Where(x => x.UserId == userId).Take(200).ToListAsync();

        _context.SeenMovies.RemoveRange(seenMovies);
        await _context.SaveChangesAsync();
    }

    public async Task AddMovieOfTheDayAsync(int movieId)
    {
        MovieOfTheDay? movie = await _context.MoviesOfTheDay.FirstOrDefaultAsync(x => x.MovieId == movieId);
        if(movie != null) { return; }

        MovieOfTheDay movieAdd = new()
        {
            MovieId = movieId,
        };
        await _context.MoviesOfTheDay.AddAsync(movieAdd);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveMovieOfTheDayAsync(int movieId)
    {
        MovieOfTheDay? movie = await _context.MoviesOfTheDay.FirstOrDefaultAsync(x => x.MovieId == movieId);
        if (movie == null) { return; }

        _context.MoviesOfTheDay.Remove(movie);
        await _context.SaveChangesAsync();
    }

    public async Task<List<MovieOfTheDay>> GetMoviesOfTheDayAsync()
    {
        return await _context.MoviesOfTheDay.ToListAsync(); 
    }
}
