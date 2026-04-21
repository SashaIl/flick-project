using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace api.Persistance.Configurations;

public class MovieInfoConfig : IEntityTypeConfiguration<MovieInfo>
{
    public void Configure(EntityTypeBuilder<MovieInfo> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(60);

        builder.Property(x => x.Poster)
            .HasMaxLength(200);

        builder.Property(x => x.Overview)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(x => x.Favorited)
            .HasDefaultValue(false);

        builder.HasMany(x => x.Genres)
            .WithMany();

        builder.HasOne(x => x.Rating)
            .WithOne()
            .HasForeignKey<MovieRating>("MovieInfoId")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
