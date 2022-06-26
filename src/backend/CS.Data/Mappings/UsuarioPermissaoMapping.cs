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
    public class UsuarioPermissaoMapping : IEntityTypeConfiguration<UsuarioPermissao>
    {
        public UsuarioPermissaoMapping()
        {
        }

        public void Configure(EntityTypeBuilder<UsuarioPermissao> builder)
        {
            builder.ToTable("UsuarioPermissao", "Identidade");
        }
    }
}
