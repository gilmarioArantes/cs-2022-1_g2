using CS.Application.Interface;
using CS.Application.Model;
using CS.Application.Response;
using CS.Core.Notificador;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace CS.Api.Controllers
{
    [Route("[controller]")]
    public class ExercicioController : BaseController
    {
        private readonly IExercicioService _exercicioService;

        public ExercicioController(IExercicioService exercicioService, INotificador notificador) : base(notificador)
        {
            _exercicioService = exercicioService;
        }

        [HttpPost, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<Guid?>))]
        public async Task<IActionResult> Adicionar([FromBody] ExercicioModel model)
        {
            Guid? response = await _exercicioService.Adicionar(model);
            return CustomResponse(response);
        }

        [HttpDelete, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<bool>))]
        public async Task<IActionResult> Remover([FromBody] RemoverEntidadeModel model)
        {
            await _exercicioService.Remover(model);
            return CustomResponse(true);
        }

        [HttpPut, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<bool>))]
        public async Task<IActionResult> Atualizar([FromBody] AtualizarExercicioModel model)
        {
            await _exercicioService.Atualizar(model);
            return CustomResponse(true);
        }

        [HttpGet("id"), Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<ExercicioResponse>))]
        public async Task<IActionResult> ObterPorId(Guid id)
        {
            ExercicioResponse response = await _exercicioService.ObterPorId(id);
            return CustomResponse(response);
        }

        [HttpGet, Authorize(Roles = "admin")]
        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(Response<List<ProfessorResponse>>))]
        public async Task<IActionResult> Obter()
        {
            List<ExercicioResponse> response = await _exercicioService.Obter();
            return CustomResponse(response);
        }
    }
}
