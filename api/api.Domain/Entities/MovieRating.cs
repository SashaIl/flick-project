using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class MovieRating
{
    public int Id { get; set; }
    public double VoteAverage { get; set; }
    public double VoteCount { get; set; }

}
