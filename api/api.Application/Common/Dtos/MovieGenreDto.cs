using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class MovieGenreDto
{
    public int GenreId { get; set; }
    public string Name { get; set; } = default!;
}
