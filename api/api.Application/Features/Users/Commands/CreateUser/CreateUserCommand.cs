using api.Application.Common.Dtos;
using api.Application.Features.Users.Dtos;
using api.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Commands.CreateUser;

public record CreateUserCommand(CreateUserDto User) : IRequest<ApiResponse>;
