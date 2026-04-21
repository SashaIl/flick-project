using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Dtos;

public class ChangePasswordDto
{
    public int UserId { get; set; } 
    public string OldPass { get; set; } = "";
    public string NewPass { get; set; } = "";
}
