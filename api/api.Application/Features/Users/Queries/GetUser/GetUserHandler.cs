using api.Application.Common.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Queries.GetUser;

public class GetUserHandler : IRequestHandler<GetUserQuery, ApiResponse>
{
    public Task<ApiResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(ApiResponse.Success(default));
    }
}
