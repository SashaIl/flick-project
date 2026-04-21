using api.Application.Common.Dtos;
using api.Application.Features.Users.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Commands.AddUserInspiration;

public record AddUserInteractionCommand(AddUserInteractionDto param) : IRequest<ApiResponse>;
