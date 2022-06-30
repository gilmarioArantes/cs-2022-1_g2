using System.Net;
using CS.Application.Interface;
using CS.Application.Model;
using CS.Application.Response;
using CS.Core.Notificador;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace CS.Api.Controllers
{
    [Route("[controller]")]
    public class AutenticacaoController : BaseControllerAutenticacao
    {
        private readonly IAutenticacaoService _autenticacaoService;

        public AutenticacaoController(IAutenticacaoService autenticacaoService,
            INotificador notificador) : base(notificador)
        {
            _autenticacaoService = autenticacaoService;
        }

        [HttpPost("autenticar"), AllowAnonymous]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<AutenticacaoResponse>))]
        public async Task<IActionResult> Autenticar([FromBody] AutenticacaoModel model)
        {
            AutenticacaoResponse response = await _autenticacaoService.Autenticar(model);
            if(response is not null){
                AppendCookies(new Dictionary<string, string>
                {
                    ["token-jwt"] = response.Token
                });
            }

            return CustomResponse();
        }
    }
}
