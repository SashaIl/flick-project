using api.Application.Common.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Queries.GetRecommendedMovies;

public record GetRecommendedMoviesQuery(int userId) : IRequest<ApiResponse>;
