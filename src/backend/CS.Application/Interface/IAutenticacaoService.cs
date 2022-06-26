using CS.Application.Model;
using CS.Application.Response;

namespace CS.Application.Interface
{
    public interface IAutenticacaoService
    {
        Task<AutenticacaoResponse> Autenticar(AutenticacaoModel model);
    }
}
