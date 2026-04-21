using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class UserSensitiveData
{
    public int Id { get; set; }
    public UserProfile User { get; set; } = default!;
    public string HashPassword { get; set; } = default!;
}
