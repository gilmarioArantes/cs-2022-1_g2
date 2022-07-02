using CS.Domain.Entidades;
using Microsoft.EntityFrameworkCore;

namespace CS.Data.Repository
{
    public abstract class RepositorioGenerico<T> where T : EntidadeBase
    {
        protected CsDbContext Db;

        protected RepositorioGenerico(CsDbContext dbContext)
        {
            Db = dbContext;
        }

        public async Task Adicionar(T entidade)
        {
            await Db.Set<T>().AddAsync(entidade);
        }

        public void Remover(T entidade)
        {
            Db.Set<T>().Remove(entidade);
        }

        public async Task<T> ObterPorId(Guid id)
        {
            return await Db.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<T>> Obter()
        {
            return await Db.Set<T>().ToListAsync();
        }

        public async Task CommitAsync()
        {
            await Db.SaveChangesAsync();
        }
    }
}
