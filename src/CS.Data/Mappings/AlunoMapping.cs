using CS.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CS.Data.Mappings
{
    public class AlunoMapping : IEntityTypeConfiguration<Aluno>
    {
        public AlunoMapping()
        {
        }

        public void Configure(EntityTypeBuilder<Aluno> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("Aluno", "Sistema");
        }
    }
}
