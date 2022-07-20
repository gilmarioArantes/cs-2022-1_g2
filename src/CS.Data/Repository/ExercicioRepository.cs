using CS.Data.Interface;
using CS.Domain.Entidades;

namespace CS.Data.Repository
{
    public class ExercicioRepository : RepositorioGenerico<Exercicio>, IExercicioRepository
    {
        public ExercicioRepository(CsDbContext dbContext) : base(dbContext)
        {
        }
    }
}
