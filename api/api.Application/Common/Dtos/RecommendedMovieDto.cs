using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class RecommendedMovieDto
{
    [JsonPropertyName("id")]
    public int MovieId { get; set; }
    public bool Favorited { get; set; }
    public string Title { get; set; } = default!;
    public DateTime? ReleaseDate { get; set; }
    public string Poster { get; set; } = default!;
    public string Overview { get; set; } = default!;
    public MovieRatingDto Rating { get; set; } = default!;
    public List<MovieGenreDto> Genres { get; set; } = default!;
}
