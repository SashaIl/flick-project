using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class MovieRatingDto
{
    public double VoteAverage { get; set; }
    public double VoteCount { get; set; }
}
