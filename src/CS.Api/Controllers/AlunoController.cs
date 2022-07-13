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
    public class AlunoController : BaseController
    {
        private readonly IAlunoService _alunoService;

        public AlunoController(IAlunoService professorService,
            INotificador notificador) : base(notificador)
        {
            _alunoService = professorService;
        }

        [HttpPost, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<Guid?>))]
        public async Task<IActionResult> Adicionar([FromBody] CriarAlunoModel model)
        {
            var response = await _alunoService.Adicionar(model);
            return CustomResponse(response);
        }

        [HttpDelete, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<bool>))]
        public async Task<IActionResult> Remover([FromBody] RemoverEntidadeModel model)
        {
            await _alunoService.Remover(model);
            return CustomResponse(true);
        }

        [HttpPut, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<bool>))]
        public async Task<IActionResult> Atualizar([FromBody] AtualizarAlunoModel model)
        {
            await _alunoService.Atualizar(model);
            return CustomResponse(true);
        }

        [HttpPut("senha"), Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<bool>))]
        public async Task<IActionResult> AtualizarSenha([FromBody] AtualizarSenhaModel model)
        {
            await _alunoService.AtualizarSenha(model);
            return CustomResponse(true);
        }

        [HttpGet("id"), Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<AlunoResponse>))]
        public async Task<IActionResult> ObterPorId(Guid id)
        {
            var response = await _alunoService.ObterPorId(id);
            return CustomResponse(response);
        }

        [HttpGet, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<List<AlunoResponse>>))]
        public async Task<IActionResult> Obter()
        {
            var response = await _alunoService.Obter();
            return CustomResponse(response);
        }
    }
}