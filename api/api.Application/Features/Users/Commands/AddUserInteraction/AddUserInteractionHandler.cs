using api.Application.Common.Dtos;
using api.Domain.Entities;
using api.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Commands.AddUserInspiration;

public class AddUserInteractionHandler : IRequestHandler<AddUserInteractionCommand, ApiResponse>
{
    private readonly IUserRepository _userRepository;

    public AddUserInteractionHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ApiResponse> Handle(AddUserInteractionCommand request, CancellationToken cancellationToken)
    {
        UserProfile user = _userRepository.GetUserById(request.param.UserId)
            .Include(x => x.UserInteractions)
            .FirstOrDefault()!;
        if (user == null) { return ApiResponse.Fail("User does not exist"); }
        
        if(user.UserInteractions!.Any(x => x.MovieId == request.param.MovieId))
        {
            return ApiResponse.Success();
        }

        UserInteraction userInteraction = new UserInteraction()
        {
            ActionByUser = request.param.Action,
            MovieId = request.param.MovieId,
            User = user
        };

        await _userRepository.AddUserInteractionAsync(userInteraction);
        return ApiResponse.Success();
    }
}
