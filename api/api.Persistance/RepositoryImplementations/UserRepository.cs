using api.Domain.Entities;
using api.Domain.Enums;
using api.Domain.Repositories;
using api.Persistance.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.RepositoryImplementations;

public class UserRepository : IUserRepository
{
    private readonly ApplicationContext _context;

    public UserRepository(ApplicationContext context) => _context = context;

    public async Task CreateUserAsync(UserProfile user)
    {
        UserProfile? userFromDb = await _context.UserProfiles
            .FirstOrDefaultAsync(x => x.Id == user.Id);
        if (userFromDb != null) { return; }

        await _context.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(int userId)
    {
        await _context.UserProfiles
            .Where(x => x.Id == userId)
            .ExecuteDeleteAsync();
    }

    public IQueryable<UserProfile> GetUserById(int id)
    {
        return _context.UserProfiles
            .Where(x => x.Id == id);
    }

    public IQueryable<UserProfile> GetUserByEmail(string email)
    {
        return _context.UserProfiles
            .Where(x => x.Email == email);
    }

    public async Task<List<UserProfile>?> GetUsers()
    {
        List<UserProfile>? users = await _context.UserProfiles
            .AsNoTracking()
            .ToListAsync();
        return users;
    }

    public async Task UpdateUserAsync(UserProfile user)
    {
        bool isUserExist = await _context.UserProfiles
            .AnyAsync(x => x.Id == user.Id);
        if(!isUserExist) { return; }

        _context.UserProfiles.Update(user);
        await _context.SaveChangesAsync(); 
    }

    public async Task AddUserInteractionAsync(UserInteraction userInteraction)
    {
        UserProfile user = (await _context.UserProfiles
            .Include(x => x.UserInteractions)
            .FirstOrDefaultAsync(x => x.Id == userInteraction.User.Id))!;

        if (user == null) { return; }

        user.UserInteractions?.Add(userInteraction);
        await _context.SaveChangesAsync();
    }

    public async Task<List<UserInteraction>?> GetUserInteractionsAsync(int userId)
    {
        UserProfile user = (await _context.UserProfiles
            .Include(x => x.UserInteractions)
            .FirstOrDefaultAsync(x => x.Id == userId))!;

        if (user == null) { return null; }

        return user.UserInteractions!;
    }

    public async Task ChangePassword(int userId, string newHashedPassword)
    {
        UserProfile? userFromDb = await _context.UserProfiles
            .Include(x => x.SensitiveData)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (userFromDb == null) { return; }
        
        userFromDb.SensitiveData.HashPassword = newHashedPassword;
        _context.Update(userFromDb);
        await _context.SaveChangesAsync(true);
    }

    public async Task AddUserToVerificationAsync(EmailVerification emailVerification)
    {
        UserProfile? user = await _context.UserProfiles
            .Include(x => x.SensitiveData)
            .FirstOrDefaultAsync(x => x.Id == emailVerification.User.Id);
        if (user == null) { return; }


        await _context.EmailVerifications.AddAsync(emailVerification);
        await _context.SaveChangesAsync(true);
    }

    public async Task<EmailVerification?> GetVerificationByTokenAsync(string token)
    {
        return await _context.EmailVerifications
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.Token == token);
    }

    public async Task RemoveVerificationAsync(string token)
    {
        EmailVerification? emailVerification = await _context.EmailVerifications
            .FirstOrDefaultAsync(x => x.Token == token);
        if (emailVerification != null)
        {
            _context.EmailVerifications.Remove(emailVerification);
            await _context.SaveChangesAsync(true);
        }
        return;
    }

    public async Task UpdateAttemptsVerificationAsync(EmailVerification emailVerification)
    {
        await _context.EmailVerifications
            .Where(x => x.Token == emailVerification.Token)
            .ExecuteUpdateAsync(x => x.SetProperty(y => y.Attempts, emailVerification.Attempts));
    }

    public async Task UpdateIsEmailVerified(int userId)
    {
        await _context.UserProfiles
            .Where(x => x.Id == userId)
            .ExecuteUpdateAsync(x => x.SetProperty(y => y.IsEmailVerified, true));
    }

    public async Task RemoveVerificationAsync(int userId)
    {
        List<EmailVerification>? emailVerifications = await _context.EmailVerifications
            .Include(x => x.User)
            .Where(x => x.User.Id == userId)
            .ToListAsync();

        if (emailVerifications != null)
        {
            _context.EmailVerifications.RemoveRange(emailVerifications);
            await _context.SaveChangesAsync(true);
        }
        return;
    }

    public async Task UpdateVerificationIsBlocked(string token, bool isBlocked)
    {
        await _context.EmailVerifications
            .Where(x => x.Token == token)
            .ExecuteUpdateAsync(x => x.SetProperty(y => y.IsBlocked, isBlocked));
    }

    public async Task UpdateVerificationAsync(EmailVerification emailVerification)
    {
        if(emailVerification == null) { return; }

        _context.EmailVerifications.Update(emailVerification);
        await _context.SaveChangesAsync();
    }

    public async Task<EmailVerification?> GetVerificationByUserIdAsync(int? userId)
    {
        return await _context.EmailVerifications
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.User.Id == userId);
    }
}
