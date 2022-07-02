using Microsoft.AspNetCore.Identity;

namespace CS.Domain.Entidades
{
    public class PerfilPermissao : IdentityRoleClaim<Guid>
    {
        public virtual Perfil Perfil { get; protected set; }
    }
}
