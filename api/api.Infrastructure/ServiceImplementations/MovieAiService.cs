using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Infrastructure.Dtos;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace api.Infrastructure.ServiceImplementations;

public class MovieAiService : IMovieAiService
{
    private readonly HttpClient _httpClient;
    private const string AiServiceBaseUrl = "http://ai-service:8000/api";
    public MovieAiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ParsedPromptDto?> ParsePromptWithAi(string prompt)
    {
        ParsedPromptDto? result;
        try
        {
            var encodedPrompt = Uri.EscapeDataString(prompt.Trim());

            JsonSerializerOptions options = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
            };

            var json = await _httpClient.GetStringAsync($"{AiServiceBaseUrl}/parse_prompt/?q={encodedPrompt}");
            result = JsonSerializer.Deserialize<ParsedPromptDto?>(json, options);
        }
        catch(HttpRequestException ex)
        {
            return null;
        }
        catch (JsonException ex)
        {
            return null;
        }
        return result;
    }

    public async Task<List<int>?> AnalyzeMovieWithAi(List<RecommendedMovieDto> movies, string query)
    {
        const string Url = $"{AiServiceBaseUrl}/analyze_movies/";
        movies = movies.Where(x => x != null).ToList();

        var body = new AnalyzeMoviesRequestDto()
        {
            movies = movies,
            query = query.Trim()
        };

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
        var json = JsonSerializer.Serialize(body, options);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        HttpResponseMessage response = await _httpClient.PostAsync(Url, content);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"AI service error {response.StatusCode}: {error}");
        }

        return await response.Content.ReadFromJsonAsync<List<int>>();
    }
}