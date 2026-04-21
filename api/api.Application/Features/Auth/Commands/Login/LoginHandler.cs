using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Domain.Entities;
using api.Domain.Repositories;
using api.Infrastructure.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Auth.Commands.Login;

public class LoginHandler : IRequestHandler<LoginCommand, ApiResponse>
{
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IUserRepository _userRepository;
    private readonly IEmailVerificationService _emailVerificationService;

    public LoginHandler(IJwtTokenService jwtTokenService, IUserRepository userRepository, IEmailVerificationService emailVerificationService)
    {
        _jwtTokenService = jwtTokenService;
        _userRepository = userRepository;
        _emailVerificationService = emailVerificationService;
    }

    public async Task<ApiResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        UserProfile? user = _userRepository.GetUserByEmail(request.LoginDto.Email)
            .Include(x => x.SensitiveData)
            .FirstOrDefault();

        if (user == null) { return ApiResponse.Fail("Invalid email or password"); }

        else if(user.SensitiveData == null) { return ApiResponse.Fail("Something went wrong"); }


        else if (!BCrypt.Net.BCrypt.Verify(request.LoginDto.Password, user.SensitiveData.HashPassword))
        {
            return ApiResponse.Fail("Invalid email or password");
        }

        string jwtToken = _jwtTokenService.GenerateToken(user);
        return ApiResponse.Success(jwtToken);
    }
}
