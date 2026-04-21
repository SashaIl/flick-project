using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class MovieComment
{
    public int Id { get; set; }
    public string Message { get; set; } = default!;
    public DateTime Date { get; set; }
    public MovieInfo Movie { get; set; } = default!;
    public UserProfile User { get; set; } = default!;
}
