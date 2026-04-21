using api.Application.Common.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Verification.Command.SendVerificationCode;

public record SendVerificationCodeCommand(string? token, int? userId) : IRequest<ApiResponse>;
