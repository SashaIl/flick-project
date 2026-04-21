using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.Application.Common.Parse;

public class TmdbMovieParse
{
    [JsonPropertyName("id")]
    public int MovieId { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; } = "";

    [JsonPropertyName("overview")]
    public string Overview { get; set; } = "";

    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; } = "";

    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }

    [JsonPropertyName("vote_count")]
    public int VoteCount { get; set; }

    [JsonPropertyName("original_title")]
    public string OriginalTitle { get; set; } = "";

    [JsonPropertyName("original_language")]
    public string OriginalLanguage { get; set; } = "";

    [JsonPropertyName("release_date")]
    public string ReleaseDate { get; set; } = "";

    [JsonPropertyName("revenue")]
    public double Revenue { get; set; }

    [JsonPropertyName("runtime")]
    public int Runtime { get; set; }

    [JsonPropertyName("genres")]
    public List<TmdbGenre> Genres { get; set; } = [];

    [JsonPropertyName("production_countries")]
    public List<TmdbCountry> ProductionCountries { get; set; } = [];

    [JsonPropertyName("credits")]
    public TmdbCredits Credits { get; set; } = new();

    [JsonPropertyName("videos")]
    public TmdbVideos Videos { get; set; } = new();
}

public class TmdbGenre
{
    [JsonPropertyName("id")]
    public int GenreId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = "";
}

public class TmdbCountry
{
    [JsonPropertyName("iso_3166_1")]
    public string Code { get; set; } = "";

    [JsonPropertyName("name")]
    public string Name { get; set; } = "";
}

public class TmdbCredits
{
    [JsonPropertyName("cast")]
    public List<TmdbCast> Cast { get; set; } = [];

    [JsonPropertyName("crew")]
    public List<TmdbCrew> Crew { get; set; } = [];
}

public class TmdbCast
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";
}

public class TmdbCrew
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = "";

    [JsonPropertyName("job")]
    public string Job { get; set; } = "";

    [JsonPropertyName("known_for_department")]
    public string KnownForDepartment { get; set; } = "";
}

public class TmdbVideos
{
    [JsonPropertyName("results")]
    public List<TmdbVideo> Results { get; set; } = [];
}

public class TmdbVideo
{
    [JsonPropertyName("key")]
    public string Key { get; set; } = "";

    [JsonPropertyName("site")]
    public string Site { get; set; } = "";

    [JsonPropertyName("type")]
    public string Type { get; set; } = "";
}
