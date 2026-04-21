using api.Application.Common.Dtos;
using api.Domain.Entities;
using api.Domain.Repositories;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Queries.GetAllFavoriteMovies;

public class GetAllFavoriteMoviesHandler : IRequestHandler<GetAllFavoriteMoviesQuery, ApiResponse>
{
    private readonly IMovieRepository _movieRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public GetAllFavoriteMoviesHandler(IMovieRepository movieRepository, IUserRepository userRepository, IMapper mapper)
    {
        _movieRepository = movieRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<ApiResponse> Handle(GetAllFavoriteMoviesQuery request, CancellationToken cancellationToken)
    {
        UserProfile user = _userRepository.GetUserById(request.userId).FirstOrDefault()!;
        if (user == null) { return ApiResponse.Fail("User does not exist"); }

        List<MovieInfo>? movies = await _movieRepository.GetFavoriteMovies(request.userId)?
            .Include(x => x.Genres)
            .ToListAsync()!;
        if (movies == null) { return ApiResponse.Success(Array.Empty<MovieAllInfoDto>()); }

        var output = _mapper.Map<List<MovieInfo>, List<MovieAllInfoDto>>(movies);
        return ApiResponse.Success(output);
    }
}
