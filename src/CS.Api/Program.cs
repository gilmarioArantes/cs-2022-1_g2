using CS.Api.Extensions;
using CS.Api.Middlewares;
using Microsoft.AspNetCore.Authorization;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDataProtection();
builder.Services.AddIdentityConfiguration();
builder.Services.AddSwaggerConfigurations();
builder.Services.RegisterServices(builder.Configuration);
builder.Services.AddRazorPages();
builder.Services.AddSeguranca();
builder.Services.AddScoped<IAuthorizationMiddlewareResultHandler, RequestAuthorizationMiddlewareResultHandler>();

var app = builder.Build();
app.Migrate();

app.UseSwagger();
app.UseSwaggerUI();

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();
app.UseStaticFiles();

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapRazorPages();
app.MapControllers();

app.MapGet("/Sair", (HttpContext context) =>
{
    context.Response.Cookies.Delete("token-jwt");
    context.Response.Redirect($"/login");
}).ExcludeFromDescription();

app.Run();
