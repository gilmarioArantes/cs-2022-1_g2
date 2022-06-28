using System.Security.Claims;

namespace CS.Api
{
    public static class ClaimsPrincipalExtensionMethods
    {
        public static string ObtenhaClaim(this ClaimsPrincipal user, string claim)
        {
            return user.HasClaim(c => c.Type == claim) ? user.Claims.First(c => c.Type == claim).Value : null;
        }

        public static string ObtenhaPerfil(this ClaimsPrincipal user) =>
            user.ObtenhaClaim("http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
    }
}
