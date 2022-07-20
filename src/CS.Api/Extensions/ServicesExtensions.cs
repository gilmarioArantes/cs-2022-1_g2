using CS.Application.Interface;
using CS.Application.Services;
using CS.Core.Notificador;
using CS.Data;
using CS.Data.Interface;
using CS.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace CS.Api.Extensions
{
    public static class ServicesExtensions
    {
        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CsDbContext>(opt => opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<INotificador, Notificador>();
            services.AddScoped<Seeder>();
            services.AddScoped<IAutenticacaoService, AutenticacaoService>();
            services.AddScoped<IProfessorService, ProfessorService>();
            services.AddScoped<IExercicioService, ExercicioService>();
            services.AddScoped<IProfessorRepository, ProfessorRepository>();
            services.AddScoped<IAlunoService, AlunoService>();
            services.AddScoped<IAlunoRepository, AlunoRepository>();
            services.AddScoped<IExercicioRepository, ExercicioRepository>();
        }

        public static void Migrate(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var seeder = scope.ServiceProvider.GetRequiredService<Seeder>();
            seeder.Migrate();
        }
    }
}
