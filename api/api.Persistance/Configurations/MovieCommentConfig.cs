using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.Configurations;

public class MovieCommentConfig : IEntityTypeConfiguration<MovieComment>
{
    public void Configure(EntityTypeBuilder<MovieComment> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Movie)
            .WithMany()
            .HasForeignKey("MovieId");

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey("UserId");
    }
}
