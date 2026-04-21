using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.Configurations;

public class SeenMovieConfig : IEntityTypeConfiguration<SeenMovie>
{
    public void Configure(EntityTypeBuilder<SeenMovie> builder)
    {
        builder.HasKey(x => x.Id);  

        builder.HasOne(x => x.User)
            .WithMany(x => x.SeenMovies)
            .HasForeignKey(x => x.UserId);
    }
}
