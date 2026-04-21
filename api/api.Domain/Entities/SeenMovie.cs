using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class SeenMovie
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public UserProfile User { get; set; } = default!;
    public int MovieId { get; set; }
}
