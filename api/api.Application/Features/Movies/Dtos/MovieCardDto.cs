using api.Application.Common.Dtos;
using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Dtos;

public class MovieCardDto
{
    [JsonPropertyName("id")]
    public int MovieId { get; set; }

    public bool Favorited { get; set; } = false;
    [JsonPropertyName("title")]
    public string Title { get; set; } = default!;
  
    [JsonPropertyName("title")]
    public List<string> Genres { get; set; } = new();
    
    [JsonPropertyName("release_date")]
    public DateTime ReleaseDate { get; set; }
    
    [JsonPropertyName("poster_path")]
    public string? Poster { get; set; }
    
    [JsonPropertyName("overview")]
    public string Overview { get; set; } = default!;
    
    [JsonPropertyName("title")]
    public MovieRatingDto Rating { get; set; } = default!;
}

public class TmdbGenre
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = "";
}