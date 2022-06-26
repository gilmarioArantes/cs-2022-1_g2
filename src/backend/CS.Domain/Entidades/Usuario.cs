using Microsoft.AspNetCore.Identity;

namespace CS.Domain.Entidades
{
    public class Usuario : IdentityUser<Guid>
    {
        public virtual List<UsuarioPerfil> UsuarioPerfis { get; protected set; } = new List<UsuarioPerfil>();
    }
}
