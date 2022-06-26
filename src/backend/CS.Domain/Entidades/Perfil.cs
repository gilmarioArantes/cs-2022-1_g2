using Microsoft.AspNetCore.Identity;

namespace CS.Domain.Entidades
{
    public class Perfil : IdentityRole<Guid>
    {
        public virtual ICollection<UsuarioPerfil> PerfilUsuarios { get; protected set; }
        public virtual ICollection<PerfilPermissao> Permissoes { get; protected set; }
    }
}
