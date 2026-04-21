using api.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Dtos;

public class AddUserInteractionDto
{
    public int UserId { get; set; }
    public int MovieId { get; set; }
    public UserAction Action { get; set; }
}
