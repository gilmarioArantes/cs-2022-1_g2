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

        protected void AppendCookies(Dictionary<string, string> cookies)
        {
            foreach (KeyValuePair<string, string> cookie in cookies)
            {
                HttpContext.Response.Cookies.Append(cookie.Key, cookie.Value,
                    new CookieOptions { Secure = true, HttpOnly = false });
            }
        }
    }
}
