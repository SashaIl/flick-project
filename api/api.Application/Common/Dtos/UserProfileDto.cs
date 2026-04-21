using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class UserProfileDto
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Surname { get; set; } = default!;
    public string Email { get; set; } = default!;
    public UserSensitiveDataDto SensitiveData { get; set; } = default!;
    public List<MovieAllInfoDto>? FavoriteMovies { get; set; } = new List<MovieAllInfoDto>();
    public List<UserInteractionDto>? UserInteractions { get; set; } = new List<UserInteractionDto>();
}
