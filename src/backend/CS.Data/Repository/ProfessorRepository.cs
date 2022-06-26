using CS.Data.Interface;
using CS.Domain.Entidades;

namespace CS.Data.Repository
{
    public class ProfessorRepository : RepositorioGenerico<Professor>, IProfessorRepository
    {
        public ProfessorRepository(CsDbContext dbContext) : base(dbContext)
        {
        }
    }
}
