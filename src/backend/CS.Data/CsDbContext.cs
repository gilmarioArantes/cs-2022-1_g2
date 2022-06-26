using CS.Domain.Entidades;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CS.Data
{
    public class CsDbContext : IdentityDbContext<Usuario, Perfil, Guid, UsuarioPermissao, UsuarioPerfil, UsuarioLogin, PerfilPermissao,
        UsuarioToken>
    {
        public CsDbContext()
        {
        }

        public CsDbContext(DbContextOptions<CsDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(typeof(CsDbContext).Assembly);
        }

        public DbSet<Perfil> Perfil { get; set; }
        public DbSet<PerfilPermissao> PerfilPermissao { get; set; }
        public DbSet<UsuarioLogin> UsuarioLogin { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<UsuarioPerfil> UsuarioPerfil { get; set; }
        public DbSet<UsuarioPermissao> UsuarioPermissao { get; set; }
        public DbSet<UsuarioToken> UsuarioToken { get; set; }
        public DbSet<Professor> Professor { get; set; }
    }
}
