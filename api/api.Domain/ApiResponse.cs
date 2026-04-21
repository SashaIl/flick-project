using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Application.Common.Dtos;

public class ApiResponse
{
    private ApiResponse(bool isSuccess, object? data, string? message)
    {
        IsSuccess = isSuccess;
        Data = data;
        Message = message;
    }

    public bool IsSuccess { get; set; }
    public object? Data { get; set; }
    public string? Message { get; set; }

    public static ApiResponse Success(object? data = default)
        => new ApiResponse(isSuccess: true, data: data, message: null); 

    public static ApiResponse Fail(string? message)
        => new ApiResponse(isSuccess: false, data: null, message: message);
}
