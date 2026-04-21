using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.Configurations;

public class MovieRatingConfig : IEntityTypeConfiguration<MovieRating>
{
    public void Configure(EntityTypeBuilder<MovieRating> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.VoteAverage)
            .IsRequired();

        builder.ToTable(x => x.HasCheckConstraint("CK_MovieRating_VoteAverage", "[VoteAverage] > 0 AND [VoteAverage] <= 10"));

        builder.Property(x => x.VoteCount)
            .IsRequired();

    }
}
