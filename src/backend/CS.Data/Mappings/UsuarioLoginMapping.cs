using CS.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CS.Data.Mappings
{
    public class UsuarioPerfilMapping : IEntityTypeConfiguration<UsuarioPerfil>
    {
        public UsuarioPerfilMapping()
        {
        }

        public void Configure(EntityTypeBuilder<UsuarioPerfil> builder)
        {
            builder.ToTable("UsuarioPerfil", "Identidade");
        }
    }
}
