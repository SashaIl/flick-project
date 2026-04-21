using api.Application.Common.Services;
using api.Domain.Entities;
using api.Domain.Repositories;
using api.Infrastructure.Dtos;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace api.Infrastructure.ServiceImplementations;

public class EmailVerificationService : IEmailVerificationService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _conf;

    public EmailVerificationService(IUserRepository userRepository, IConfiguration conf)
    {
        _userRepository = userRepository;
        _conf = conf;
    }

    public string GenerateCode() =>
        RandomNumberGenerator.GetInt32(100_000, 1_000_000).ToString();

    public async Task<string> SendVerificationCodeAsync(string email)
    {

        string fromAddress = _conf["SmtpSettings:Username"] ?? throw new ArgumentException("Email does not exist");
        string password = _conf["SmtpSettings:Password"] ?? throw new ArgumentException("Password to send verification code does not exist");
        string host = _conf["SmtpSettings:Host"] ?? throw new ArgumentException("Host to send verification code does not exist");
        int port = int.Parse(_conf["SmtpSettings:Port"] ?? throw new ArgumentException("Port to send verification code does not exist"));
        bool enableSsl = bool.Parse(_conf["SmtpSettings:EnableSsl"] ?? throw new ArgumentException("EnableSsl to send verification code does not exist"));

        string code = GenerateCode();


        using var mail = new MailMessage();
        mail.From = new MailAddress(fromAddress, "Flick Guide");
        mail.To.Add(email);
        mail.Subject = "Verification code";
        mail.IsBodyHtml = true;

        string path = Path.Combine(AppContext.BaseDirectory, "Templates", "EmailVerification.html");
        string mailBody = File.ReadAllText(path);

        for(int i = 0; i < code.Length; i++)
        {
            mailBody = mailBody.Replace($"{{D{i+1}}}", code[i].ToString());
        }
        mailBody = mailBody.Replace($"{{CODE}}", code.ToString());
        mail.Body = mailBody;

        using (var smtpClient = new SmtpClient(host, port))
        {
            smtpClient.Credentials = new NetworkCredential(fromAddress, password);
            smtpClient.EnableSsl = enableSsl;

            await smtpClient.SendMailAsync(mail);
            return code;
        }
    }
}
