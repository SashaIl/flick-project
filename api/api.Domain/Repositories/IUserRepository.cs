using api.Domain.Entities;
using api.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace api.Domain.Repositories;

public interface IUserRepository
{
    Task CreateUserAsync(UserProfile user);
    Task DeleteUserAsync(int userId);
    IQueryable<UserProfile> GetUserById(int id);
    IQueryable<UserProfile> GetUserByEmail(string email);
    Task<List<UserProfile>?> GetUsers();
    Task UpdateUserAsync(UserProfile user);
    Task UpdateIsEmailVerified(int userId);
    Task AddUserInteractionAsync(UserInteraction userInteraction);
    Task<List<UserInteraction>?> GetUserInteractionsAsync(int userId);
    Task ChangePassword(int userId, string newHashedPassword);
    Task AddUserToVerificationAsync(EmailVerification emailVerification);
    Task<EmailVerification?> GetVerificationByTokenAsync(string token);
    Task<EmailVerification?> GetVerificationByUserIdAsync(int? userId);
    Task RemoveVerificationAsync(string token);
    Task RemoveVerificationAsync(int userId);
    Task UpdateVerificationAsync(EmailVerification emailVerification);
    Task UpdateVerificationIsBlocked(string token, bool isBlocked);
    Task UpdateAttemptsVerificationAsync(EmailVerification emailVerification);
}
