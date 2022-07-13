using CS.Domain.Entidades;

namespace CS.Domain.ValueObjects
{
    public class Cidade
    {
        public Guid Id { get; set;}

        public string Nome { get; set; }

        public virtual EnumeradorEstado Estado { get; set; }
    }
}