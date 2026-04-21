using api.Domain.Entities;
using api.Infrastructure.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Services;

public interface IEmailVerificationService
{
    Task<string> SendVerificationCodeAsync(string email);
    string GenerateCode();

}
