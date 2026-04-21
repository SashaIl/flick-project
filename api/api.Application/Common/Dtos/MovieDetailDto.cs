using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class MovieDetailDto
{
    public string OriginalTitle { get; set; } = default!;
    public string OriginalLanguage { get; set; } = default!;
    public bool IsRealesed { get; set; }
    public string? Trailer { get; set; }
    public double? Revenue { get; set; }
    public int Runtime { get; set; }
    public string Director { get; set; } = default!;
    public List<string>? Writers { get; set; }
    public List<string> Actors { get; set; } = new();
    public List<string> ProductionCountries { get; set; } = new();
}

