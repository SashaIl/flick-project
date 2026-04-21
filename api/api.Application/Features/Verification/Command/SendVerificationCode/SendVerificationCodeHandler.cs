using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Domain.Entities;
using api.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace api.Application.Features.Verification.Command.SendVerificationCode;

public class SendVerificationCodeHandler : IRequestHandler<SendVerificationCodeCommand, ApiResponse>
{
    private readonly IEmailVerificationService _emailService;
    private readonly IUserRepository _userRepository;

    public SendVerificationCodeHandler(IEmailVerificationService emailService, IUserRepository userRepository
        )
    {
        _emailService = emailService;
        _userRepository = userRepository;
    }

    public async Task<ApiResponse> Handle(SendVerificationCodeCommand request, CancellationToken cancellationToken)
    {
        if(request.token == null && request.userId == null) { return ApiResponse.Fail("token and userId equal zero"); }

        EmailVerification? emailVerification = new();
        if (request.userId != null)
        {
            emailVerification = await _userRepository.GetVerificationByUserIdAsync(request.userId);

        }
        else if(request.token != null)
        {
            emailVerification = await _userRepository.GetVerificationByTokenAsync(request.token);
        }

        try
        {
            if (emailVerification == null) { return ApiResponse.Fail("Verification does not exist"); }
            if (emailVerification.User == null) { return ApiResponse.Fail("User does not exist"); }

            if (emailVerification.IsBlocked)
            {
                emailVerification.VerificationCode = _emailService.GenerateCode();
                emailVerification.TimeCreated = DateTime.UtcNow;
                emailVerification.IsBlocked = false;
                await _userRepository.UpdateVerificationAsync(emailVerification);

            }
            else
            {
                string code = await _emailService.SendVerificationCodeAsync(emailVerification.User.Email);
                emailVerification.VerificationCode = code;
                emailVerification.TimeCreated = DateTime.UtcNow;
                emailVerification.Attempts = 0;
                await _userRepository.UpdateVerificationAsync(emailVerification);
            }
            return ApiResponse.Success(emailVerification.Token);
        }
        catch (Exception ex)
        {
            return ApiResponse.Fail(ex.Message);
        }
    }
}
