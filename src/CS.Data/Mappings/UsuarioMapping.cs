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
