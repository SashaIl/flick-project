using api.Application.Common.Dtos;
using api.Application.Features.Auth.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Auth.Commands.Login;

public record LoginCommand(LoginDto LoginDto) : IRequest<ApiResponse>;
