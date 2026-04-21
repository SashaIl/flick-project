using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class UserSensitiveDataDto
{
    public int Id { get; set; }
    public UserProfile User { get; set; } = default!;
    public string HashPassword { get; set; } = default!;
}
