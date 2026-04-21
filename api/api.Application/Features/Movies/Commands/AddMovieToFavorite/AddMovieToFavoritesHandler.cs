using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Domain.Entities;
using api.Domain.Repositories;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Commands.AddFavoriteMovie;

public class AddMovieToFavoritesHandler : IRequestHandler<AddMovieToFavoritesCommand, ApiResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IMovieRepository _movieRepository;
    private readonly IMovieService _movieService;
    private readonly IMapper _mapper;

    public AddMovieToFavoritesHandler(IUserRepository userRepository, IMovieRepository movieRepository, IMovieService movieService, IMapper mapper)
    {
        _userRepository = userRepository;
        _movieRepository = movieRepository;
        _movieService = movieService;
        _mapper = mapper;
    }

    public async Task<ApiResponse> Handle(AddMovieToFavoritesCommand request, CancellationToken cancellationToken)
    {
        UserProfile user = _userRepository.GetUserById(request.param.UserId).FirstOrDefault()!;
        if(user == null) { return ApiResponse.Fail("User does not exist"); }

        try
        {
            MovieAllInfoDto movieAllInfo = await _movieService.GetAllInfoMovieByIdAsync(request.param.MovieId);
            
            MovieInfo movie = _mapper.Map<MovieInfo>(movieAllInfo);

            await _movieRepository.ToggleMovieFavorites(request.param.UserId, movie);
            return ApiResponse.Success();
        }
        catch(Exception ex)
        {
            return ApiResponse.Fail(ex.Message);
        }
    }
}
