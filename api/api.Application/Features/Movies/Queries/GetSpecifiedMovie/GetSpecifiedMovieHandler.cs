using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Domain.Entities;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Queries.GetSpecifiedMovie;

public class GetSpecifiedMovieHandler : IRequestHandler<GetSpecifiedMovieQuery, ApiResponse>
{
    private readonly IMovieService _movieService;
    private readonly IMapper _mapper;

    public GetSpecifiedMovieHandler(IMovieService movieService, IMapper mapper)
    {
        _movieService = movieService;
        _mapper = mapper;
    }

    public async Task<ApiResponse> Handle(GetSpecifiedMovieQuery request, CancellationToken cancellationToken)
    {
        MovieAllInfoDto movie = null!;
        try
        {
            movie = await _movieService.GetAllInfoMovieByIdAsync(request.movieId);

        }
        catch (Exception ex)
        {
            return ApiResponse.Fail(ex.Message);
        }

        if (movie == null) { return ApiResponse.Fail("Movie does not exist"); }

        return ApiResponse.Success(movie); 
    }
}
