namespace CS.Domain.Entidades
{
    public abstract class EntidadeBase
    {
        protected EntidadeBase()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get;  }
    }
}
