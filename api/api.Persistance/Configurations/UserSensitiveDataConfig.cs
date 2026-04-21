using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Persistance.Configurations;

public class UserSensitiveDataConfig : IEntityTypeConfiguration<UserSensitiveData>
{
    public void Configure(EntityTypeBuilder<UserSensitiveData> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.HashPassword)
            .IsRequired()
            .HasMaxLength(100);
    }
}

