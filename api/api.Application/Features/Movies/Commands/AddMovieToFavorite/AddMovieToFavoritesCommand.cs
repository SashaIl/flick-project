using api.Application.Common.Dtos;
using api.Application.Features.Movies.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Commands.AddFavoriteMovie;

public record AddMovieToFavoritesCommand(ToggleFavoriteMovieDto param) : IRequest<ApiResponse>;
