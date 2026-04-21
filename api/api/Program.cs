using api.Application;
using api.Application.Common.Mapper;
using api.Application.Common.Services;
using api.Domain.Repositories;
using api.Infrastructure.ServiceImplementations;
using api.Persistance.Context;
using api.Persistance.RepositoryImplementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Linq.Expressions;
using System.Text;
using Microsoft.OpenApi.Models;
using System.Text.Unicode;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter the token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"

    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Configuration.AddJsonFile(
    path: "secrets.json",
    optional: false,
    reloadOnChange: true);

builder.Configuration.AddEnvironmentVariables();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<InitDbService>();
builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IEmailVerificationService, EmailVerificationService>();
builder.Services.AddScoped<IMovieAiService, MovieAiService>();


builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(
        builder.Configuration["SqlConnectionString"],
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(10),
            errorNumbersToAdd: null
        )
    )
);

builder.Services.AddAutoMapper(conf => conf.AddProfile(new AutoMapperProfile()));
builder.Services.AddMediatR(conf => conf.RegisterServicesFromAssembly(typeof(ApplicationAssemblyMarker).Assembly));
builder.Services.AddHttpClient();


builder.Services.AddCors(options =>
{
    options.AddPolicy("client",
        policy =>
        {
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.AllowAnyOrigin();
        });
});



byte[] signature = Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Signature")
    ?? throw new Exception("JWT Signature is null"));

builder.Services.AddAuthentication(conf =>
{
    conf.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    conf.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(signature),

        ValidateIssuer = true,
        ValidIssuer = builder.Configuration.GetValue<string>("Issuer"),

        ValidateAudience = true,
        ValidAudience = builder.Configuration.GetValue<string>("Audience"),

        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

var app = builder.Build();

app.UseCors("client");

using (var scope = app.Services.CreateScope())
{
    try
    {

        ApplicationContext context = scope.ServiceProvider.GetService<ApplicationContext>()! ?? throw new Exception("context is nul");
        InitDbService init = scope.ServiceProvider.GetService<InitDbService>()!;

        if (!context.Database.CanConnect())
        {
            context.Database.EnsureCreated();
            await init.Init();
        }
    }
    catch (Exception ex)
    {
        throw new Exception(ex.Message);
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty; 
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
