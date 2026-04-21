using api.Application.Common.Services;
using api.Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace api.Infrastructure.ServiceImplementations;

public class JwtTokenService : IJwtTokenService
{
    private readonly string _signature;
    private readonly string _issuer;
    private readonly string _audience;

    public JwtTokenService(IConfiguration conf)
    {
        _signature = conf["Signature"]!;
        _issuer = conf["Issuer"]!;
        _audience = conf["Audience"]!;

        if (_signature is null ||
            _issuer is null ||
            _audience is null)
        {
            throw new Exception("JWT configuration is invalid");
        }
    }

    public string GenerateToken(UserProfile user)
    {
        List<Claim> claims = new()
        {
            new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim("name", user.Name),
            new Claim("surname", user.Surname),
            new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Email, user.Email),
            new Claim("isEmailVerified", user.IsEmailVerified.ToString())
        };

        JwtSecurityTokenHandler tokenHandler = new();
        SecurityTokenDescriptor descriptor = new()
        {
            Audience = _audience,
            Issuer = _issuer,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signature)),
                SecurityAlgorithms.HmacSha256),

            Expires = DateTime.UtcNow.AddDays(1),
            Subject = new ClaimsIdentity(claims)
        };

        JwtSecurityToken token = tokenHandler.CreateJwtSecurityToken(descriptor);
        return tokenHandler.WriteToken(token);
    }
}
