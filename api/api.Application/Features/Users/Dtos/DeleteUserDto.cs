using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Dtos;

public class DeleteUserDto
{
    public int Id { get; set; }
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
}
