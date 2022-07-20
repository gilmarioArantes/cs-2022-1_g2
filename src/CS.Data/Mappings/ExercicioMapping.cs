using CS.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CS.Data.Mappings
{
    public class ExercicioMapping : IEntityTypeConfiguration<Exercicio>
    {
        public ExercicioMapping() { }

        public void Configure(EntityTypeBuilder<Exercicio> builder)
        {
            builder.HasKey(x => x.Id);

            builder.ToTable("Exercicio", "Sistema");
        }
    }
}
