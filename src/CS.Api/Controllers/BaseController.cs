using CS.Core.Notificador;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CS.Api.Controllers
{
    [ApiController]
    [Authorize]
    public abstract class BaseController : Controller
    {
        private readonly INotificador _notificador;

        protected BaseController(INotificador notificador)
        {
            _notificador = notificador;
        }

        protected ActionResult CustomResponse(object result = null)
        {
            if (!PossuiNotificacao())
            {
                return Ok(new
                {
                    success = true,
                    data = result
                });
            }

            return Ok(new
            {
                success = false,
                errors = _notificador.ObterErros()
            });
        }

        private bool PossuiNotificacao()
        {
            return _notificador.PossuiNotificacao();
        }
    }
}
