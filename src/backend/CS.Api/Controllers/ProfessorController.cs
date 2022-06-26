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
    public class ProfessorController : BaseController
    {
        private readonly IProfessorService _professorService;

        public ProfessorController(IProfessorService professorService,
            INotificador notificador) : base(notificador)
        {
            _professorService = professorService;
        }

        [HttpPost, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<Guid?>))]
        public async Task<IActionResult> Adicionar([FromBody] CriarProfessorModel model)
        {
            var response = await _professorService.Adicionar(model);
            return CustomResponse(response);
        }

        [HttpDelete, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<bool>))]
        public async Task<IActionResult> Remover([FromBody] RemoverEntidadeModel model)
        {
            await _professorService.Remover(model);
            return CustomResponse(true);
        }

        [HttpPut, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<bool>))]
        public async Task<IActionResult> Atualizar([FromBody] AtualizarProfessorModel model)
        {
            await _professorService.Atualizar(model);
            return CustomResponse(true);
        }

        [HttpPut("senha"), Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<bool>))]
        public async Task<IActionResult> AtualizarSenha([FromBody] AtualizarSenhaModel model)
        {
            await _professorService.AtualizarSenha(model);
            return CustomResponse(true);
        }

        [HttpGet("id"), Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<ProfessorResponse>))]
        public async Task<IActionResult> ObterPorId(Guid id)
        {
            var response = await _professorService.ObterPorId(id);
            return CustomResponse(response);
        }

        [HttpGet, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<List<ProfessorResponse>>))]
        public async Task<IActionResult> Obter()
        {
            var response = await _professorService.Obter();
            return CustomResponse(response);
        }
    }
}