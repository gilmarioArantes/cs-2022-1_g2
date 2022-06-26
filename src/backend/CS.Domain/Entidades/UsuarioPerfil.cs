using Microsoft.AspNetCore.Identity;

namespace CS.Domain.Entidades
{
    public class UsuarioPerfil : IdentityUserRole<Guid>
    {
        public virtual Perfil Perfil { get; protected set; }
    }
}
