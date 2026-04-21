using api.Application.Features.Movies.Commands.AddFavoriteMovie;
using api.Application.Features.Movies.Commands.DeleteMovieFromFavorites;
using api.Application.Features.Movies.Dtos;
using api.Application.Features.Movies.Queries;
using api.Application.Features.Movies.Queries.GetAllFavoriteMovies;
using api.Application.Features.Movies.Queries.GetMoviesFromAi;
using api.Application.Features.Movies.Queries.GetMoviesOfTheDay;
using api.Application.Features.Movies.Queries.GetRecommendedMovies;
using api.Application.Features.Movies.Queries.GetSpecifiedMovie;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/movie/")]
public class MovieController : ControllerBase
{
    private readonly IMediator _mediator;

    public MovieController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("get_all_favorite_movies/{userId}")]
    public async Task<IActionResult> GetAllFavoriteMovies(int userId)
    {
        var response = await _mediator.Send(new GetAllFavoriteMoviesQuery(userId));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpPost("add_movie_to_favorites")]
    public async Task<IActionResult> AddMovieToFavorites(ToggleFavoriteMovieDto addMovieToFavoritesDto)
    {
        var response = await _mediator.Send(new AddMovieToFavoritesCommand(addMovieToFavoritesDto));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpDelete("remove_movie_from_favorites")]
    public async Task<IActionResult> RemoveMovieFromFavorites([FromBody] ToggleFavoriteMovieDto addMovieToFavoritesDto)
    {
        var response = await _mediator.Send(new RemoveMovieFromFavoritesCommand(addMovieToFavoritesDto));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpGet("get_recommended_movies")]
    public async Task<IActionResult> GetRecommendedMovies(int userId = 0)
    {
        var response = await _mediator.Send(new GetRecommendedMoviesQuery(userId));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpGet("get_movie_from_ai")]
    public async Task<IActionResult> GetMoviesFromAi(string prompt)
    {
        var response = await _mediator.Send(new GetMoviesFromAiQuery(prompt));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpGet("get_specified_movie")]
    public async Task<IActionResult> GetSpecifieMovie(int movieId)
    {
        var response = await _mediator.Send(new GetSpecifiedMovieQuery(movieId));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpGet("get_movie_of_the_day")]
    public async Task<IActionResult> GetMovieOfTheDay()
    {
        var response = await _mediator.Send(new GetMoviesOfTheDayQuery());
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }
}
