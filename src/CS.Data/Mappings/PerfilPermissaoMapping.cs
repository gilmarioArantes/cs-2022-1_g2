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
    public class PerfilMapping : IEntityTypeConfiguration<Perfil>
    {
        public PerfilMapping()
        {
        }

        public void Configure(EntityTypeBuilder<Perfil> builder)
        {
            builder.ToTable("Perfil", "Identidade");

            builder.HasMany(u => u.PerfilUsuarios)
                .WithOne(up => up.Perfil)
                .HasForeignKey(up => up.RoleId)
                .IsRequired();

            builder.HasMany(u => u.Permissoes)
                .WithOne(up => up.Perfil)
                .HasForeignKey(up => up.RoleId)
                .IsRequired();
        }
    }
}
