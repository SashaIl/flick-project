using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class MovieOfTheDay
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
}
