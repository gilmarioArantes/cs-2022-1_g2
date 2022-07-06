using CS.Application.Model;
using CS.Application.Response;

namespace CS.Application.Interface
{
    public interface IAlunoService
    {
        public Task<Guid?> Adicionar(CriarAlunoModel model);

        public Task Remover(RemoverEntidadeModel model);

        public Task<AlunoResponse> ObterPorId(Guid id);

        public Task<List<AlunoResponse>> Obter();

        public Task Atualizar(AtualizarAlunoModel model);

        Task AtualizarSenha(AtualizarSenhaModel model);
    }
}
