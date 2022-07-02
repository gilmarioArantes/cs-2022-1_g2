using CS.Application.Model;
using CS.Application.Response;

namespace CS.Application.Interface
{
    public interface IProfessorService
    {
        public Task<Guid?> Adicionar(CriarProfessorModel model);

        public Task Remover(RemoverEntidadeModel model);

        public Task<ProfessorResponse> ObterPorId(Guid id);

        public Task<List<ProfessorResponse>> Obter();

        public Task Atualizar(AtualizarProfessorModel model);

        Task AtualizarSenha(AtualizarSenhaModel model);
    }
}
