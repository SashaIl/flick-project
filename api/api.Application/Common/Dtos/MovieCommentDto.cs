using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class MovieCommentDto
{
    public int Id { get; set; }
    public string Message { get; set; } = default!;
    public DateTime Date { get; set; }
    public UserProfile User { get; set; } = default!;
}
