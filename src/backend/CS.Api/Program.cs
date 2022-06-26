using CS.Application.Interface;
using CS.Application.Services;
using CS.Core.Notificador;
using CS.Data;
using CS.Domain.Entidades;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDataProtection();

builder.Services.AddIdentity<Usuario, Perfil>(config =>
    {
        config.Password.RequireUppercase = false;
        config.Password.RequireDigit = false;
        config.Password.RequireNonAlphanumeric = false;
    })
    .AddEntityFrameworkStores<CsDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddDbContext<CsDbContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<INotificador, Notificador>();
builder.Services.AddScoped<Seeder>();
builder.Services.AddScoped<IAutenticacaoService, AutenticacaoService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<Seeder>();
    seeder.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
