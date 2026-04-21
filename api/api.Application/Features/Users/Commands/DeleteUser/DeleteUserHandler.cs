using api.Application.Common.Dtos;
using api.Domain.Entities;
using api.Domain.Repositories;
using AutoMapper;
using MediatR;


namespace api.Application.Features.Users.Commands.DeleteUser;

public class DeleteUserHandler : IRequestHandler<DeleteUserCommand, ApiResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public DeleteUserHandler(IUserRepository context, IMapper mapper)
    {
        _userRepository = context;
        _mapper = mapper;
    }

    public async Task<ApiResponse> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        UserProfile user = _userRepository.GetUserById(request.User.Id).FirstOrDefault()!;
        if(user == null) { return ApiResponse.Fail("User does not exist"); }    

        if(request.User.Email != user.Email)
        {
            return ApiResponse.Fail("Invalid email");
        }

        else if (!BCrypt.Net.BCrypt.Verify(request.User.Password, user.SensitiveData.HashPassword)) 
        { 
            return ApiResponse.Fail("Invalid password"); 
        }

        await _userRepository.DeleteUserAsync(user.Id);
            
        return ApiResponse.Success();
    }
}
