using api.Application.Common.Dtos;
using api.Application.Common.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Queries.GetMoviesFromAi;

public class GetMoviesFromAiHandler : IRequestHandler<GetMoviesFromAiQuery, ApiResponse>
{
    private readonly IMovieAiService _movieAiService;
    private readonly IMovieService _movieService;

    public GetMoviesFromAiHandler(IMovieAiService movieAiService, IMovieService movieService)
    {
        _movieAiService = movieAiService;
        _movieService = movieService;
    }

    public async Task<ApiResponse> Handle(GetMoviesFromAiQuery request, CancellationToken cancellationToken)
    {
        ParsedPromptDto? parsedPrompt = await _movieAiService.ParsePromptWithAi(request.prompt);
        if (parsedPrompt == null) { return ApiResponse.Fail("Invalid prompt"); }

        List<RecommendedMovieDto> movies = await _movieService.GetMovieForAi(parsedPrompt);
        if(movies == null) { return ApiResponse.Fail("Сan't find any movies matching your search"); }

        List<int>? movieIds = await _movieAiService.AnalyzeMovieWithAi(movies, request.prompt);

        if(movieIds == null) { return ApiResponse.Fail("Сan't find any movies matching your search"); }

        movies = movies.Where(x => movieIds.Contains(x.MovieId)).ToList();
        if (movies == null || movies.Count <= 5) { return ApiResponse.Fail("Сan't find any movies matching your search"); }

        return ApiResponse.Success(movies);
    }
}
