using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CS.Data.Mappings
{
    public class UsuarioTokenMapping : IEntityTypeConfiguration<UsuarioToken>
    {
        public UsuarioTokenMapping()
        {
        }

        public void Configure(EntityTypeBuilder<UsuarioToken> builder)
        {
            builder.ToTable("UsuarioToken", "Identidade");
        }
    }
}
