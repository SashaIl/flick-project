using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Movies.Dtos;

public class ToggleFavoriteMovieDto
{
    public int MovieId { get; set; }
    public int UserId { get; set; }
}
