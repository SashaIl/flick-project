using api.Application.Common.Dtos;
using api.Application.Features.Users.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Users.Commands.ChangePassword;

public record ChangePasswordCommand(ChangePasswordDto param) : IRequest<ApiResponse>;
