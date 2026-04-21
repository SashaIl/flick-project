using api.Application.Common.Dtos;
using api.Application.Common.Parse;
using api.Application.Common.Services;
using api.Domain.Entities;
using api.Domain.Repositories;
using api.Infrastructure.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using static System.Net.WebRequestMethods;

namespace api.Infrastructure.ServiceImplementations;

public class MovieService : IMovieService
{
    private readonly HttpClient _httpClient;
    private readonly IMovieRepository _movieRepository;
    private readonly IMapper _mapper;
    private readonly string API_KEY;
    private readonly string JWT_BEARER;
    private const int MaxInteractionsToAnalyze = 4;
    private const int MaxRecommendedMovies = 30;
    private const int MaxSeenMovies = 200;



    public MovieService(IHttpClientFactory http, IConfiguration conf, IMovieRepository movieRepository, IMapper mapper)
    {
        API_KEY = conf["TMDbApiKey"] ?? throw new Exception("Api key is null");
        JWT_BEARER = conf["TMDbBearerToken"] ?? throw new Exception("Api key is null");
        _movieRepository = movieRepository;
        _mapper = mapper;

        _httpClient = http.CreateClient();
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", JWT_BEARER);
    }


    private List<RecommendedMovieDto> ShaffleMovies(List<RecommendedMovieDto> movies)
    {
        Random rnd = new();
        RecommendedMovieDto temp = new();
        for (int i = movies.Count - 1; i > 0; i--)
        {
            int j = rnd.Next(i + 1);
            (movies[i], movies[j]) = (movies[j], movies[i]);
        }
        return movies;
    }

    private List<MovieGenreDto> ParseGenres(List<int>? ids, Dictionary<int, MovieGenre> genresMap)
    {

        if (ids == null) { return new List<MovieGenreDto>(); }

        return ids
            .Where(id => genresMap.ContainsKey(id))
            .Select(id => new MovieGenreDto
            {
                GenreId = id,
                Name = genresMap[id].Name,

            })
            .ToList();
    }

    private async Task<List<RecommendedMovieDto>> MapParsedMovies(List<RecommendedMovieParse> fetchedMovies)
    {
        List<MovieGenre> genres = await _movieRepository.GetAllGenresAsync();
        Dictionary<int, MovieGenre> genresMap = genres.ToDictionary(x => x.GenreId);
        List<RecommendedMovieDto> movies = [];

        foreach (var movie in fetchedMovies)
        {
            movies.Add(new RecommendedMovieDto()
            {
                MovieId = movie.MovieId,
                Favorited = false,
                Title = movie.Title ?? "Unknown",
                ReleaseDate = DateTime.TryParse(movie.ReleaseDate, out var date)
                    ? date
                    : (DateTime?)null,
                Poster = $"https://image.tmdb.org/t/p/original{movie.PosterPath}",
                Overview = movie.Overview ?? "Unknown",
                Rating = new MovieRatingDto
                {
                    VoteAverage = (float)movie.VoteAverage,
                    VoteCount = (float)movie.VoteCount,
                },
                Genres = ParseGenres(movie.GenreIds, genresMap)
            });
        }
        return movies;
    }

    private async Task<WrapeprParse<RecommendedMovieParse>> FetchPopularMovies()
    {
        string[] MOVIE_ENDPOINS = ["movie/top_rated", "movie/popular"];
        Random rnd = new Random();


        WrapeprParse<RecommendedMovieParse> popularMoviesParse = new();
        try
        {
            List<Task<WrapeprParse<RecommendedMovieParse>?>> tasks = new();
            for (int i = 0; i < 2; i++)
            {
                tasks.Add(_httpClient.GetFromJsonAsync<WrapeprParse<RecommendedMovieParse>>(
                    $"https://api.themoviedb.org/3/{MOVIE_ENDPOINS[rnd.Next(0, 2)]}?api_key={API_KEY}&page={rnd.Next(1, 100)}"));
            }
            var results = await Task.WhenAll(tasks);
            if (results.Any(x => x == null)) { throw new Exception("Can not fetch movies from external api"); }

            popularMoviesParse.Results.AddRange(results
                .Where(r => r != null)
                .SelectMany(x => x!.Results));
        }
        catch (HttpRequestException ex)
        {
            throw new Exception($"Failed to fetch", ex);
        }
        return popularMoviesParse;
    }

    private async Task<int?>GetPersonIdAsync(string name)
    {
        string url = $"https://api.themoviedb.org/3/search/person?language=en-US&query={Uri.EscapeDataString(name)}";
        TmdbPersonResponse? response = await _httpClient.GetFromJsonAsync<TmdbPersonResponse>(url);
        return response?.Results.FirstOrDefault()?.Id;
    }
    private async Task<List<int>> GetKeywordIdAsync(string keyword)
    {
        var url = $"https://api.themoviedb.org/3/search/keyword?query={Uri.EscapeDataString(keyword)}";
        var response = await _httpClient.GetFromJsonAsync<TmdbKeywordResponse>(url);
        return response?.Results.Take(3).Select(k => k.Id).ToList() ?? [];
    }

    public async Task<MovieAllInfoDto> GetAllInfoMovieByIdAsync(int movieId)
    {

        List<MovieGenreDto> genres = _mapper.Map<List<MovieGenreDto>>(await _movieRepository.GetAllGenresAsync());

        TmdbMovieParse? tmdb;
        try
        {

            tmdb = await _httpClient.GetFromJsonAsync<TmdbMovieParse>(
                $"https://api.themoviedb.org/3/movie/{movieId}?api_key={API_KEY}&append_to_response=credits,videos");
        }
        catch (HttpRequestException ex)
        {
            throw new Exception($"Failed to fetch movie {movieId}",ex);
        }
        if (tmdb is null)
                throw new NullReferenceException($"Movie {movieId} not found");

        string trailerKey = tmdb.Videos.Results
            .FirstOrDefault(v => v.Type == "Trailer" && v.Site == "YouTube")?.Key ?? "";

        string director = tmdb.Credits.Crew
            .FirstOrDefault(c => c.Job == "Director")?.Name ?? "";

        List<string> writers = tmdb.Credits.Crew
            .Where(c => c.KnownForDepartment == "Writing")
            .Select(c => c.Name)
            .ToList();

        List<string> actors = tmdb.Credits.Cast
            .Select(c => c.Name)
            .ToList();

        return new MovieAllInfoDto
        {
            MovieId = movieId,
            Favorited = false,
            Title = tmdb.Title,
            ReleaseDate = DateTime.Parse(tmdb.ReleaseDate),
            Poster = $"https://image.tmdb.org/t/p/original{tmdb.PosterPath}",
            Overview = tmdb.Overview,
            Rating = new MovieRatingDto
            {
                VoteAverage = (float)tmdb.VoteAverage,
                VoteCount = (float)tmdb.VoteCount,
            },
            Genres = genres.Where(x => tmdb.Genres.Any(g => g.GenreId == x.GenreId)).ToList(),
            Details = new MovieDetailDto
            {
                OriginalTitle = tmdb.OriginalTitle,
                OriginalLanguage = tmdb.OriginalLanguage,
                IsRealesed = true,
                Trailer = string.IsNullOrEmpty(trailerKey) ? "" : $"https://www.youtube.com/embed/{trailerKey}",
                Revenue = (float)tmdb.Revenue,
                Runtime = tmdb.Runtime,
                Director = director,
                Writers = writers,
                Actors = actors,
                ProductionCountries = tmdb.ProductionCountries.Select(c => c.Name).ToList()
            }
        };
       
    }

    public async Task<List<RecommendedMovieDto>> GetPopularMoviesAsync(int userId = 0)
    {
        WrapeprParse<RecommendedMovieParse> popularMoviesParse = await FetchPopularMovies();
        if (userId != 0)
        {
            List<int> seenMovieIds = (await _movieRepository.GetSeenMoviesAsync(userId))?.Select(x => x.MovieId).ToList() ?? [];

            if (seenMovieIds?.Count >= MaxSeenMovies)
            {
                await _movieRepository.Remove200SeenMoviesAsync(userId);
            }
            popularMoviesParse.Results = popularMoviesParse.Results
                .Where(x => !string.IsNullOrEmpty(x.PosterPath) && !seenMovieIds!.Contains(x.MovieId))
                .ToList();
        }

        popularMoviesParse.Results = popularMoviesParse.Results
            .Where(x => !string.IsNullOrEmpty(x.PosterPath))
            .ToList();
        List <RecommendedMovieDto> popularMovies = await MapParsedMovies(popularMoviesParse.Results);

        popularMovies = popularMovies
            .DistinctBy(x => x.MovieId)
            .Take(MaxRecommendedMovies)
            .ToList();


        if (userId != 0) 
        {
            await _movieRepository.AddSeenMoviesAsync(popularMovies.Select(x =>
                new SeenMovie
                {
                    MovieId = x.MovieId,
                    UserId = userId,
                }).ToList());
        }

        return popularMovies;
    }

    public async Task<MovieAllInfoDto?> GetMovieOfTheDayAsync()
    {
        try
        {
            MovieOfTheDay? movieOfTheDay = (await _movieRepository.GetMoviesOfTheDayAsync())
                .FirstOrDefault();

            bool isExpiredOrMissing = movieOfTheDay == null ||
                (DateTime.UtcNow - movieOfTheDay.Date).TotalMinutes > 24 * 60;

            if (isExpiredOrMissing)
            {
                if (movieOfTheDay != null)
                    await _movieRepository.RemoveMovieOfTheDayAsync(movieOfTheDay.MovieId);

                List<RecommendedMovieDto> popularMovies = await GetPopularMoviesAsync();
                if (popularMovies == null || popularMovies.Count == 0)
                    return null;

                int rnd = new Random().Next(0, popularMovies.Count);
                RecommendedMovieDto selectedMovie = popularMovies[rnd];

                MovieAllInfoDto movieAllInfo = await GetAllInfoMovieByIdAsync(selectedMovie.MovieId);
                await _movieRepository.AddMovieOfTheDayAsync(selectedMovie.MovieId);
                return movieAllInfo;
            }

            return await GetAllInfoMovieByIdAsync(movieOfTheDay!.MovieId);
        }
        catch (HttpRequestException ex)
        {
            throw new Exception("Failed to fetch: " + ex.Message);
        }
    }

    public async Task<List<RecommendedMovieDto>> GetRecommendedMovies(List<UserInteraction> interactions, int userId)
    {
        interactions = interactions.TakeLast(MaxInteractionsToAnalyze).ToList();

        WrapeprParse<RecommendedMovieParse> recommendedMoviesParse = new();

        try
        {
            var tasks = interactions.Select(it =>
                _httpClient.GetFromJsonAsync<WrapeprParse<RecommendedMovieParse>>(
                    $"https://api.themoviedb.org/3/movie/{it.MovieId}/recommendations?api_key={API_KEY}"));

            var results = await Task.WhenAll(tasks);

            if (results.Any(r => r == null))
                throw new Exception("Can not fetch movies from external api");

            recommendedMoviesParse.Results.AddRange(results
                .Where(r => r != null)
                .SelectMany(r => r!.Results)
            );
        }
        catch (HttpRequestException ex)
        {
            throw new Exception($"Failed to fetch", ex);
        }

        
        List<RecommendedMovieDto> recommendedMovies = await MapParsedMovies(recommendedMoviesParse.Results);


        var seenMovies = (await _movieRepository.GetSeenMoviesAsync(userId))?.Select(x => x.MovieId).ToList();
        if (seenMovies != null)
        {
            recommendedMovies = recommendedMovies
                .Where(x => !seenMovies.Contains(x.MovieId))
                .ToList();
        }
        if(recommendedMovies.Count < 30)
        {
            var popular = await MapParsedMovies((await FetchPopularMovies()).Results);
            recommendedMovies.AddRange(popular);
        }


        recommendedMovies = ShaffleMovies(recommendedMovies); 

        recommendedMovies = recommendedMovies
            .DistinctBy(x => x.MovieId)
            .Take(MaxRecommendedMovies)
            .ToList();

        
        if(seenMovies?.Count >= MaxSeenMovies)
        {
            await _movieRepository.Remove200SeenMoviesAsync(userId);
        }

        await _movieRepository.AddSeenMoviesAsync(recommendedMovies.Select(x =>
            new SeenMovie
            {
                MovieId = x.MovieId,
                UserId = userId,
            }).ToList()
        );
        return recommendedMovies;
    }

    public async Task<List<RecommendedMovieDto>> GetMovieForAi(ParsedPromptDto movieParams)
    {
        try
        {

            Task<List<int>> keywordTasks = movieParams.Keywords != null
                ? GetKeywordIdAsync(movieParams.Keywords)
                : Task.FromResult(new List<int>());

            IEnumerable<Task<int?>> actorTasks = movieParams.People.Actors
                .Select(name => GetPersonIdAsync(name));

            IEnumerable<Task<int?>> directorTasks = movieParams.People.Directors
                .Select(name => GetPersonIdAsync(name));

            IEnumerable<Task<int?>> producerTasks = movieParams.People.Producers
                .Select(name => GetPersonIdAsync(name));


            List<int> keywordIds = await keywordTasks;

            List<int> actorIds = (await Task.WhenAll(actorTasks))
                .Where(id => id.HasValue)
                .Select(id => id!.Value)
                .ToList();

            List<int> directorIds = (await Task.WhenAll(directorTasks))
                .Where(id => id.HasValue)
                .Select(id => id!.Value)
                .ToList();

            List<int> producerIds = (await Task.WhenAll(producerTasks))
                .Where(id => id.HasValue)
                .Select(id => id!.Value)
                .ToList();


            List<int> genreIds = (await _movieRepository.GetAllGenresAsync())
                .Where(x => movieParams.Genres.Contains(x.Name, StringComparer.OrdinalIgnoreCase))
                .Select(x => x.Id)
                .ToList();

            var tasks = new List<Task<WrapeprParse<RecommendedMovieParse>?>>();

            if(keywordIds.Count > 0)
            {
                tasks.Add(_httpClient.GetFromJsonAsync<WrapeprParse<RecommendedMovieParse>>($"https://api.themoviedb.org/3/discover/movie?language=en-US" +
                    $"&with_keywords={string.Join("|", keywordIds)}"));
            }
            if (actorIds.Count > 0)
            {
                tasks.Add(_httpClient.GetFromJsonAsync<WrapeprParse<RecommendedMovieParse>>($"https://api.themoviedb.org/3/discover/movie?language=en-US" +
                    $"&with_cast={string.Join("|", actorIds)}"));
            }


            if (directorIds.Count > 0)
            {
                tasks.Add(_httpClient.GetFromJsonAsync<WrapeprParse<RecommendedMovieParse>>($"https://api.themoviedb.org/3/discover/movie?language=en-US" +
                    $"&with_crew={string.Join("|", directorIds)}"));  
            }

            if (producerIds.Count > 0)
            {
                tasks.Add(_httpClient.GetFromJsonAsync<WrapeprParse<RecommendedMovieParse>>($"https://api.themoviedb.org/3/discover/movie?language=en-US" +
                    $"&with_crew={string.Join("|", producerIds)}"));
            }

            var paramsUrl = $"https://api.themoviedb.org/3/discover/movie?language=en-US" +
                (genreIds.Count > 0 ? $"&with_genres={string.Join("|", genreIds)}" : "") +  
                (movieParams.Runtime.MinMinutes > 0 ? $"&with_runtime.gte={movieParams.Runtime.MinMinutes}" : "") +
                (movieParams.Runtime.MaxMinutes > 0 ? $"&with_runtime.lte={movieParams.Runtime.MaxMinutes}" : "");

            tasks.Add(_httpClient.GetFromJsonAsync<WrapeprParse<RecommendedMovieParse>>(paramsUrl));

            var results = await Task.WhenAll(tasks);

            List<RecommendedMovieParse> uniqueMovies = results
                .Where(x => x?.Results != null)
                .SelectMany(x => x!.Results)
                .DistinctBy(x => x.MovieId)
                .ToList();

            List<RecommendedMovieDto> res = await MapParsedMovies(uniqueMovies);

            return res;
        }
        catch (HttpRequestException ex)
        {
            throw new Exception("Failed to fetch: " + ex.Message);
        }
    }
}


