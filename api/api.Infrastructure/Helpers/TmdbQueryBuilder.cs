using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class TmdbQueryBuilder
{
    private readonly Dictionary<string, string> _params = new();
    private const string BaseUrl = "https://api.themoviedb.org/3/discover/movie";

    public TmdbQueryBuilder WithLanguage(string lang = "en-US")
    {
        _params["language"] = lang;
        return this;
    }

    public TmdbQueryBuilder WithYearRange(int? from, int? to)
    {
        if (from.HasValue)
            _params["primary_release_date.gte"] = $"{from}-01-01";
        if (to.HasValue)
            _params["primary_release_date.lte"] = $"{to}-12-31";
        return this;
    }

    public TmdbQueryBuilder WithGenres(List<int> genreIds)
    {
        if (genreIds.Any())
            _params["with_genres"] = string.Join("|", genreIds);
        return this;
    }

    public TmdbQueryBuilder WithKeywords(List<int> keywordIds)
    {
        if (keywordIds.Any())
            _params["with_keywords"] = string.Join(",", keywordIds);
        return this;
    }

    public TmdbQueryBuilder WithCast(List<int> personIds)
    {
        if (personIds.Any())
            _params["with_cast"] = string.Join(",", personIds);
        return this;
    }

    public TmdbQueryBuilder WithCrew(List<int> personIds)
    {
        if (personIds.Any())
            _params["with_crew"] = string.Join(",", personIds);
        return this;
    }

    public TmdbQueryBuilder WithRuntime(int? min, int? max)
    {
        if (min.HasValue) _params["with_runtime.gte"] = min.ToString()!;
        if (max.HasValue) _params["with_runtime.lte"] = max.ToString()!;
        return this;
    }

    public TmdbQueryBuilder WithRating(double? minScore, int minVotes = 100)
    {
        if (minScore.HasValue)
            _params["vote_average.gte"] = minScore.Value.ToString("F1");
        _params["vote_count.gte"] = minVotes.ToString();
        return this;
    }

    public TmdbQueryBuilder WithSortBy(string sortBy = "popularity.desc")
    {
        _params["sort_by"] = sortBy;
        return this;
    }

    public string Build()
    {
        var query = string.Join("&", _params.Select(p => $"{p.Key}={p.Value}"));
        return $"{BaseUrl}?{query}";
    }
}
