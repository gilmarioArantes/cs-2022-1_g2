using CS.Domain.Entidades;

namespace CS.Data.Interface
{
    public interface IRepository<T> where T : EntidadeBase
    {
        public Task Adicionar(T entidade);

        public void Remover(T entidade);

        public Task<T> ObterPorId(Guid id);

        public Task<List<T>> Obter();

        public Task CommitAsync();
    }
}
