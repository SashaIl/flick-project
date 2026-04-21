using api.Domain.Entities;
using api.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace api.Infrastructure.ServiceImplementations;

public class InitDbService
{
    private readonly IMovieRepository _moviesRepository;
    private readonly IConfiguration _conf;
    private readonly IHttpClientFactory _httpClient;

    public InitDbService(IMovieRepository moviesRepository, IConfiguration conf, IHttpClientFactory httpClient)
    {
        _moviesRepository = moviesRepository;
        _conf = conf;
        _httpClient = httpClient;
    }

    public async Task Init()
    {
        try
        {

            HttpClient client = _httpClient.CreateClient();
            HttpRequestMessage request = new(HttpMethod.Get,
                $"https://api.themoviedb.org/3/genre/movie/list?language=en&api_key={_conf["TMDbApiKey"]}");

            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("Authorization", $"Bearer {_conf["TMDbBearerToken"]}");

            HttpResponseMessage response = await client.SendAsync( request );
            string json = await response.Content.ReadAsStringAsync();

            List<MovieGenre> genres = [];

            JsonDocument jsonDocument = JsonDocument.Parse(json);
            JsonElement jsonGenres = jsonDocument.RootElement.GetProperty("genres");
                
            foreach (var genre in jsonGenres.EnumerateArray())
            {
                genres.Add(new MovieGenre()
                {
                    GenreId = genre.GetProperty("id").GetInt32(),
                    Name = genre.GetProperty("name").ToString(),
                });
            }
            await _moviesRepository.AddGenres(genres.ToArray());
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }
}
