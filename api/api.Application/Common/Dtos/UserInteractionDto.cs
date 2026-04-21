using api.Domain.Entities;
using api.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class UserInteractionDto
{
    public MovieAllInfoDto Movie { get; set; } = default!;
    public UserAction ActionByUser { get; set; }
}
