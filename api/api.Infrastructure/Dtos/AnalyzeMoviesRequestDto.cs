using api.Application.Common.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Infrastructure.Dtos;

public class AnalyzeMoviesRequestDto
{
    public List<RecommendedMovieDto> movies { get; set; } = new();
    public string query { get; set; } = "";
}
