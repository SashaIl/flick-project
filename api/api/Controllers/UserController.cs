using api.Application.Features.Auth.Commands.Login;
using api.Application.Features.Auth.Dtos;
using api.Application.Features.Users.Commands.AddUserInspiration;
using api.Application.Features.Users.Commands.ChangePassword;
using api.Application.Features.Users.Commands.CreateUser;
using api.Application.Features.Users.Commands.DeleteUser;
using api.Application.Features.Users.Dtos;
using api.Application.Features.Users.Queries.GetUsers;
using api.Application.Features.Verification.Command.CheckVerificationCode;
using api.Application.Features.Verification.Command.SendVerificationCode;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/user/")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("create_user")]
    public async Task<IActionResult> CreateUser(CreateUserDto user)
    {
        var response = await _mediator.Send(new CreateUserCommand(user));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpDelete("delete_user")]
    public async Task<IActionResult> DeleteUser(DeleteUserDto user)
    {
        var response = await _mediator.Send(new DeleteUserCommand(user));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [Authorize]
    [HttpGet("get_users")]
    public async Task<IActionResult> GetUsers()
    {
        var response = await _mediator.Send(new GetUsersQuery());
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var response = await _mediator.Send(new LoginCommand(loginDto));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpPost("add_interaction")]
    public async Task<IActionResult> AddInteraction(AddUserInteractionDto userInteractionDto)
    {
        var response = await _mediator.Send(new AddUserInteractionCommand(userInteractionDto));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpPost("change_password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
    {
        var response = await _mediator.Send(new ChangePasswordCommand(changePasswordDto));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpGet("send_verification_code")]
    public async Task<IActionResult> SendVerificationCode(string? token, int? userId)
    {
        var response = await _mediator.Send(new SendVerificationCodeCommand(token,userId));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }

    [HttpGet("check_verification")]
    public async Task<IActionResult> CheckVerificationCode(string token, string code)
    {
        var response = await _mediator.Send(new CheckVerificationCodeCommand(token,code));
        if (response.IsSuccess) { return Ok(response); }
        return BadRequest(response);
    }
}
