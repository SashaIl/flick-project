using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Entities;

public class EmailVerification
{
    public int Id { get; set; }
    public string Token { get; set; } = "";
    public string VerificationCode { get; set; } = default!;
    public bool IsBlocked { get; set; }
    public UserProfile User { get; set; } = default!;
    public int Attempts { get; set; }
    public DateTime TimeCreated { get; set; } = DateTime.UtcNow;
}
