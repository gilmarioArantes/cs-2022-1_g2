using CS.Application.Model;
using CS.Application.Response;

namespace CS.Application.Interface
{
    public interface IExercicioService
    {
        public Task<Guid?> Adicionar(ExercicioModel model);

        public Task Remover(RemoverEntidadeModel model);

        public Task<ExercicioResponse> ObterPorId(Guid id);

        public Task<List<ExercicioResponse>> Obter();

        public Task Atualizar(AtualizarExercicioModel model);
    }
}
