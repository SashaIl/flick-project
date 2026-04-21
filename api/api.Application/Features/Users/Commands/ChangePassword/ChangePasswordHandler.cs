using api.Application.Common.Dtos;
using api.Domain.Entities;
using api.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Commands.ChangePassword;

public class ChangePasswordHandler : IRequestHandler<ChangePasswordCommand, ApiResponse>
{
    private readonly IUserRepository _userRepository;

    public ChangePasswordHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ApiResponse> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        UserProfile user = _userRepository.GetUserById(request.param.UserId)
            .Include(x => x.SensitiveData)
            .FirstOrDefault()!;
        if (user == null) { return ApiResponse.Fail("User does not exist"); }

        else if (!BCrypt.Net.BCrypt.Verify(request.param.OldPass, user.SensitiveData.HashPassword))
        {
            return ApiResponse.Fail("Invalid old password");
        }

        else if (request.param.NewPass.Length < 6 || !Regex.IsMatch(request.param.NewPass, @"[^a-zA-Z0-9]"))
        {
            return ApiResponse.Fail("Invalid new password format");
        }

        string newHashedPass = BCrypt.Net.BCrypt.HashPassword(request.param.NewPass, BCrypt.Net.BCrypt.GenerateSalt(12));

        await _userRepository.ChangePassword(request.param.UserId, newHashedPass);

        return ApiResponse.Success();
    }
}
