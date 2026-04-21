using api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Services;

public interface IJwtTokenService
{
    string GenerateToken(UserProfile user);
}
