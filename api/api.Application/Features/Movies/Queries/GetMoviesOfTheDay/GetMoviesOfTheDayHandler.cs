using api.Application.Common.Dtos;
using api.Application.Common.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Queries.GetMoviesOfTheDay;

public class GetMoviesOfTheDayHandler : IRequestHandler<GetMoviesOfTheDayQuery, ApiResponse>
{
    private readonly IMovieService _movieService;

    public GetMoviesOfTheDayHandler(IMovieService movieService)
    {
        _movieService = movieService;
    }

    public async Task<ApiResponse> Handle(GetMoviesOfTheDayQuery request, CancellationToken cancellationToken)
    {
        MovieAllInfoDto? movie = await _movieService.GetMovieOfTheDayAsync();
        if(movie == null) { return ApiResponse.Fail("Fail to take movie of the day"); }
        return ApiResponse.Success(movie);
    }
}
