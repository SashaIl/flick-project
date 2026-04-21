using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.Configurations;

public class UserInteractionConfig : IEntityTypeConfiguration<UserInteraction>
{
    public void Configure(EntityTypeBuilder<UserInteraction> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.ActionByUser)
            .HasConversion<string>();

        builder.HasOne(x => x.User)
            .WithMany(x => x.UserInteractions)
            .HasForeignKey("UserId")
            .OnDelete(DeleteBehavior.Cascade);

        //builder.HasOne<MovieInfo>()
        //    .WithMany()
        //    .HasForeignKey(x => x.MovieId);
    }
}
