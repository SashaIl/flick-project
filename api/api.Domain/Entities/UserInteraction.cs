using api.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class UserInteraction
{
    public int Id { get; set; }
    public UserProfile User { get; set; } = default!;
    public int MovieId { get; set; } = default!;
    public UserAction ActionByUser { get; set; }
}
