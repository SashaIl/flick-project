using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Domain.Entities;
using api.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Verification.Command.CheckVerificationCode;

public class CheckVerificationCodeHandler : IRequestHandler<CheckVerificationCodeCommand, ApiResponse>
{
    private readonly IUserRepository _userRepository;

    public CheckVerificationCodeHandler(IUserRepository userRepository, IJwtTokenService jwtTokenService)
    {
        _userRepository = userRepository;
    }

    public async Task<ApiResponse> Handle(CheckVerificationCodeCommand request, CancellationToken cancellationToken)
    {
        EmailVerification? emailVerification = await _userRepository.GetVerificationByTokenAsync(request.token);

        if(emailVerification == null) { return ApiResponse.Fail("Verifacation does not exist"); }

        if (emailVerification == null) { return ApiResponse.Fail("No such token"); }

        if(emailVerification.Attempts >= 6)
        {
            await _userRepository.UpdateVerificationIsBlocked(request.token, true);
            return ApiResponse.Fail("Too many atepmts");
        }

        if((DateTime.UtcNow - emailVerification.TimeCreated).TotalMinutes > 10) 
        {
            await _userRepository.UpdateVerificationIsBlocked(request.token, true);
            return ApiResponse.Fail("Code has expired");
        }

        if (!CryptographicOperations.FixedTimeEquals(
                    Encoding.UTF8.GetBytes(emailVerification.VerificationCode),
                    Encoding.UTF8.GetBytes(request.code))) 
        {
            emailVerification.Attempts += 1;
            await _userRepository.UpdateAttemptsVerificationAsync(emailVerification);
            return ApiResponse.Fail("Code is incorrect"); 
        }


        UserProfile? user = _userRepository.GetUserByEmail(emailVerification.User.Email).FirstOrDefault();
        if(user == null) { return ApiResponse.Fail("User does not exist"); }


        await _userRepository.UpdateIsEmailVerified(user.Id);

        return ApiResponse.Success();
    }
}
