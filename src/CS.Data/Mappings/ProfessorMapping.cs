using CS.Domain.Entidades;
using CS.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CS.Data.Mappings
{
    public class ProfessorMapping : IEntityTypeConfiguration<Professor>
    {
        public ProfessorMapping()
        {
        }

        public void Configure(EntityTypeBuilder<Professor> builder)
        {
            builder.HasKey(x => x.Id);

            builder.OwnsOne(c => c.Endereco, endereco =>
            {
                endereco.Property(c => c.Logradouro)
                    .HasColumnName(nameof(Endereco.Logradouro));

                endereco.Property(c => c.Numero)
                    .HasColumnName(nameof(Endereco.Numero));

                endereco.Property(c => c.Complemento)
                    .HasColumnName(nameof(Endereco.Complemento));

                endereco.Property(c => c.Bairro)
                    .HasColumnName(nameof(Endereco.Bairro));

                endereco.Property(c => c.Estado)
                    .HasColumnName(nameof(Endereco.Estado));

                endereco.Property(c => c.Cidade)
                    .HasColumnName(nameof(Endereco.Cidade));

                endereco.Property(c => c.CEP)
                    .HasColumnName(nameof(Endereco.CEP));
            });

            builder.ToTable("Professor", "Sistema");
        }
    }
}
