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
    public class UsuarioLoginMapping : IEntityTypeConfiguration<UsuarioLogin>
    {
        public UsuarioLoginMapping()
        {
        }

        public void Configure(EntityTypeBuilder<UsuarioLogin> builder)
        {
            builder.ToTable("UsuarioLogin", "Identidade");
        }
    }
}
