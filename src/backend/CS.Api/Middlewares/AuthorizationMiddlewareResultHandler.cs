using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;

namespace CS.Api.Middlewares
{
    public class RequestAuthorizationMiddlewareResultHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler DefaultHandler = new();

        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            if (authorizeResult.Challenged && !authorizeResult.Succeeded)
            {
                context.Response.Redirect($"/login");
                return;
            }

            await DefaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }
    }
}
