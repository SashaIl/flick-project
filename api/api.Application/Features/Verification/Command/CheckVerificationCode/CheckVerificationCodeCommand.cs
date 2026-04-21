using api.Application.Common.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Features.Verification.Command.CheckVerificationCode;

public record CheckVerificationCodeCommand(string token, string code) : IRequest<ApiResponse>;
