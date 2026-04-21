using api.Application.Common.Dtos;
using api.Application.Features.Users.Dtos;
using api.Domain.Entities;
using api.Domain.Repositories;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Queries.GetUsers;

public class GetUsersHandler : IRequestHandler<GetUsersQuery, ApiResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public GetUsersHandler(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<ApiResponse> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        List<UserProfile> userProfiles = (await _userRepository.GetUsers())!;
        if(userProfiles == null)
            { return ApiResponse.Success(Array.Empty<UserProfile>()); }

        List<GetUserDto> output = _mapper.Map<List<GetUserDto>>(userProfiles);
        return ApiResponse.Success(output);
    }
}
