using CS.Data.Interface;
using CS.Domain.Entidades;

namespace CS.Data.Repository
{
    public class AlunoRepository : RepositorioGenerico<Aluno>, IAlunoRepository
    {
        public AlunoRepository(CsDbContext dbContext) : base(dbContext)
        {
        }
    }
}
