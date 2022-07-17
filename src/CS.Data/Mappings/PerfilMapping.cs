using CS.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CS.Data.Mappings
{
    public class PerfilPermissaoMapping : IEntityTypeConfiguration<PerfilPermissao>
    {
        public PerfilPermissaoMapping()
        {
        }

        public void Configure(EntityTypeBuilder<PerfilPermissao> builder)
        {
            builder.ToTable("PerfilPermissao", "Identidade");
        }
    }
}
