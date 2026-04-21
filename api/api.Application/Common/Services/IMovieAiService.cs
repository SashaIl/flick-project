using api.Application.Common.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Services;

public interface IMovieAiService
{
    Task<ParsedPromptDto?> ParsePromptWithAi(string prompt);
    Task<List<int>?> AnalyzeMovieWithAi(List<RecommendedMovieDto> movies, string query);
}
