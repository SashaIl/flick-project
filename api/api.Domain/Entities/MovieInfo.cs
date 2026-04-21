using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class MovieInfo
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public bool Favorited { get; set; } = false;
    public string Title { get; set; } = default!;
    public DateTime? ReleaseDate { get; set; }
    public string? Poster { get; set; }
    public string Overview { get; set; } = default!;
    public MovieRating Rating { get; set; } = default!;
    public List<MovieGenre> Genres { get; set; } = new();
    public List<MovieComment>? Comments { get; set; }

}
