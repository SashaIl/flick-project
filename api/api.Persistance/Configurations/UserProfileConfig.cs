using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.Configurations;

public class UserProfileConfig : IEntityTypeConfiguration<UserProfile>
{
    public void Configure(EntityTypeBuilder<UserProfile> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(x => x.Surname)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(x => x.Email)
            .IsRequired()
            .HasMaxLength(50);


        builder.HasOne(x => x.SensitiveData)
            .WithOne(x => x.User)
            .HasForeignKey<UserSensitiveData>(x => x.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.UserInteractions)
            .WithOne(x => x.User)
            .HasForeignKey("UserId")
            .OnDelete(DeleteBehavior.Cascade); ;

        builder.HasMany(x => x.FavoriteMovies)
            .WithMany();
    }
}
