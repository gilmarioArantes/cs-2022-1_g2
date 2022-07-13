using CS.Domain.Entidades;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CS.Data
{
    public class Seeder
    {
        private readonly CsDbContext _dbContext;
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<Perfil> _roleManager;


        public Seeder(CsDbContext dbContext, UserManager<Usuario> userManager, RoleManager<Perfil> roleManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public void Migrate()
        {
            _dbContext.Database.Migrate();
            SeedData();
        }

        public void SeedData()
        {
            if (_dbContext.Usuario.Any())
                return;

            Seed();
        }

        private void Seed()
        {
            SeedPerfilAdmin();
            SeedPerfilProfessor();
            SeedPerfilAluno();
            SeedAdmin();
        }

        private void SeedPerfilAluno()
        {
            var perfil = new Perfil()
            {
                Name = "aluno",
                NormalizedName = "ALUNO"
            };
            _ = _roleManager.CreateAsync(perfil).Result;
        }

        private void SeedPerfilProfessor()
        {
            var perfil = new Perfil()
            {
                Name = "professor",
                NormalizedName = "PROFESSOR"
            };

            _ = _roleManager.CreateAsync(perfil).Result;
        }

        private void SeedPerfilAdmin()
        {
            var perfil = new Perfil()
            {
                Name = "admin",
                NormalizedName = "ADMIN"
            };

            _ = _roleManager.CreateAsync(perfil).Result;
        }

        private void SeedAdmin()
        {
            var usuario = new Usuario
            {
                UserName = "admin@ufg.br",
                Email = "admin@ufg.br"
            };

            _ = _userManager.CreateAsync(usuario, "admin@UFG123").Result;
            _userManager.AddToRoleAsync(usuario, "Admin").Wait();

        }
    }
}
