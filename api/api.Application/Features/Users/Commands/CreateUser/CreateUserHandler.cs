using api.Application.Common.Dtos;
using api.Application.Common.Services;
using api.Application.Features.Users.Dtos;
using api.Domain.Entities;
using api.Domain.Repositories;
using api.Infrastructure.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Commands.CreateUser;

public class CreateUserHandler : IRequestHandler<CreateUserCommand, ApiResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IEmailVerificationService _emailVerificationService;

    public CreateUserHandler(IUserRepository userRepository, IMapper mapper, IEmailVerificationService emailVerificationService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _emailVerificationService = emailVerificationService;
    }

    public async Task<ApiResponse> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        UserProfile user = _userRepository.GetUserByEmail(request.User.Email).FirstOrDefault()!;
        if (user != null) return ApiResponse.Fail("Enter another email");

        if(request.User.Name.Length < 2 || request.User.Surname.Length < 2) 
        {
            return ApiResponse.Fail("Invalid Name or Surname length"); 
        }
        else if (Regex.IsMatch(request.User.Name, @"[^a-zA-Z]") || Regex.IsMatch(request.User.Surname, @"[^a-zA-Z]"))
        {
            return ApiResponse.Fail("Invalid Name or Surname format");
        }
        else if (request.User.Password.Length < 6 || !Regex.IsMatch(request.User.Password, @"[^a-zA-Z0-9]"))
        {
            return ApiResponse.Fail("Invalid password");
        }

        UserProfile userForCreating = _mapper.Map<UserProfile>(request.User);

        userForCreating.SensitiveData = new UserSensitiveData()
        {
            HashPassword = BCrypt.Net.BCrypt.HashPassword(request.User.Password, BCrypt.Net.BCrypt.GenerateSalt(12)),
        };
        await _userRepository.CreateUserAsync(userForCreating);

        string token;
        try
        {
            string code = await _emailVerificationService.SendVerificationCodeAsync(userForCreating.Email);
            token = Guid.NewGuid().ToString();

            EmailVerification emailVerification = new()
            {
                Token = token,
                VerificationCode = code,
                User = userForCreating,
            };

            await _userRepository.AddUserToVerificationAsync(emailVerification);
        }
        catch (Exception ex)
        {
            return ApiResponse.Fail($"{ex.Message}");
        }

        return ApiResponse.Success(token);
    }
}

