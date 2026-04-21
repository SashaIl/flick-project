using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.Context;

public class ApplicationContext : DbContext
{

    public ApplicationContext(DbContextOptions options)
        :base(options)
    {
    }

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<UserSensitiveData> UserSensitives { get; set; }
    public DbSet<UserInteraction> UserInteractions { get; set; }
    public DbSet<EmailVerification> EmailVerifications { get; set; }

    public DbSet<MovieInfo> MovieInfos { get; set; }
    public DbSet<MovieGenre> MovieGenres { get; set; }
    public DbSet<MovieRating> MovieRatings { get; set; }
    public DbSet<MovieComment> MovieComments { get; set; }
    public DbSet<MovieOfTheDay> MoviesOfTheDay { get; set; }

    public DbSet<SeenMovie> SeenMovies { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);
    }
}
