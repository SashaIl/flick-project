using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class UserProfile
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Surname { get; set; } = default!;
    public string Email { get; set; } = default!;
    public bool IsEmailVerified { get; set; } = false;
    public UserSensitiveData SensitiveData { get; set; } = default!;
    public List<MovieInfo>? FavoriteMovies { get; set; } = new();
    public List<UserInteraction>? UserInteractions { get; set; } = new();
    public List<SeenMovie> SeenMovies { get; set; } = new();
}
