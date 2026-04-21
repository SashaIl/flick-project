using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class MovieAllInfoDto
{
    public int MovieId { get; set; }
    public bool Favorited { get; set; } = false;
    public string Title { get; set; } = default!;
    public DateTime? ReleaseDate { get; set; }
    public string? Poster { get; set; }
    public string Overview { get; set; } = default!;
    public MovieRatingDto Rating { get; set; } = default!;
    public MovieDetailDto Details { get; set; } = default!;
    public List<MovieGenreDto> Genres { get; set; } = new();
}
