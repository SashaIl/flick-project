using api.Application.Common.Dtos;
using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Services;

public interface IMovieService
{
    Task<MovieAllInfoDto> GetAllInfoMovieByIdAsync(int id);
    Task<List<RecommendedMovieDto>> GetPopularMoviesAsync(int userId = 0);
    Task<List<RecommendedMovieDto>> GetRecommendedMovies(List<UserInteraction> interactions, int userId);
    Task<List<RecommendedMovieDto>> GetMovieForAi(ParsedPromptDto movieParams);
    Task<MovieAllInfoDto?> GetMovieOfTheDayAsync();
}
