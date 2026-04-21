using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Application.Features.Movies.Dtos;
using api.Domain.Entities;
using api.Domain.Repositories;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace api.Application.Features.Movies.Queries.GetRecommendedMovies;

public class GetRecommendedMoviesHandler : IRequestHandler<GetRecommendedMoviesQuery, ApiResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IMovieService _movieService;
    private readonly IMapper _mapper;

    public GetRecommendedMoviesHandler(IUserRepository userRepository, IMovieService movieService, IMapper mapper)
    {
        _userRepository = userRepository;
        _movieService = movieService;
        _mapper = mapper;
    }

    public async Task<ApiResponse> Handle(GetRecommendedMoviesQuery request, CancellationToken cancellationToken)
    {

        List<RecommendedMovieDto> movies = new();
        try
        {
            if(request.userId == 0)
            {
                movies = await _movieService.GetPopularMoviesAsync();
            }
            else
            {

                UserProfile? user = await _userRepository.GetUserById(request.userId).Include(x => x.UserInteractions).FirstOrDefaultAsync();
                if (user == null) { return ApiResponse.Fail("User does not exist"); }

                if (user.UserInteractions == null || user.UserInteractions.Count < 4)
                {
                    movies = await _movieService.GetPopularMoviesAsync(request.userId);
                    return ApiResponse.Success(movies);
                }

                movies = await _movieService.GetRecommendedMovies(user.UserInteractions, request.userId);
            }
            return ApiResponse.Success(movies);
        }
        catch (Exception ex)
        {
            return ApiResponse.Fail(ex.Message);
        }
    }
}
