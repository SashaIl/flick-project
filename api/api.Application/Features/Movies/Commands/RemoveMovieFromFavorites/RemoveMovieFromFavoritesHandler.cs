using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Domain.Entities;
using api.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Commands.DeleteMovieFromFavorites;

public class RemoveMovieFromFavoritesHandler : IRequestHandler<RemoveMovieFromFavoritesCommand, ApiResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IMovieRepository _movieRepository;
    private readonly IMovieService _movieService;

    public RemoveMovieFromFavoritesHandler(IUserRepository userRepository, IMovieRepository movieRepository, IMovieService movieService)
    {
        _userRepository = userRepository;
        _movieRepository = movieRepository;
        _movieService = movieService;
    }

    public async Task<ApiResponse> Handle(RemoveMovieFromFavoritesCommand request, CancellationToken cancellationToken)
    {
        UserProfile user = _userRepository.GetUserById(request.param.UserId).FirstOrDefault()!;
        if (user == null) { return ApiResponse.Fail("User does not exist"); }

        bool isMovieInFavorites = (await _movieRepository.IsMovieInFavorites(user.Id, request.param.MovieId))!;
        if(isMovieInFavorites == false) { return ApiResponse.Fail("Movie is not in favorites"); }

        MovieInfo? movie = await _movieRepository.GetFavoriteMovies(user.Id)!.FirstOrDefaultAsync(x => x.MovieId == request.param.MovieId);

        if (movie == null) { return ApiResponse.Fail("Movie is not in favorites"); }
        await _movieRepository.ToggleMovieFavorites(request.param.UserId, movie);

        return ApiResponse.Success();
    }
}
