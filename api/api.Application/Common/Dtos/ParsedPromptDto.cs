using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace api.Application.Common.Dtos;

public class ParsedPromptDto
{
    public string? Keywords { get; set; }
    public int? YearFrom { get; set; }
    public int? YearTo { get; set; }
    public List<string> Genres { get; set; } = [];
    public string SortBy { get; set; } = "popularity.desc";
    public PeopleDto People { get; set; } = new();
    public RuntimeDto Runtime { get; set; } = new();
    public RatingDto Rating { get; set; } = new();
    public string? Mood { get; set; }
    public string? Era { get; set; }
}

public class PeopleDto
{
    public List<string> Actors { get; set; } = [];
    public List<string> Directors { get; set; } = [];
    public List<string> Producers { get; set; } = [];
}

public class RuntimeDto
{
    public int? MaxMinutes { get; set; }
    public int? MinMinutes { get; set; }
}

public class RatingDto
{
    public double? MinScore { get; set; }
    public int MinVotes { get; set; } = 100;
}
