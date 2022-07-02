using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CS.Application.Interface;
using CS.Application.Model;
using CS.Application.Response;
using CS.Core.Notificador;
using CS.Domain.Entidades;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CS.Application.Services
{
    public class AutenticacaoService : IAutenticacaoService
    {
        private readonly INotificador _notificador;
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;
        private readonly RoleManager<Perfil> _roleManager;
        private readonly IConfiguration _configuration;

        public AutenticacaoService(INotificador notificador, UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, RoleManager<Perfil> roleManager, IConfiguration configuration)
        {
            _notificador = notificador;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        public async Task<AutenticacaoResponse> Autenticar(AutenticacaoModel model)
        {
            if (model is null)
            {
                _notificador.AdicionarNotificacao("Os dados são inválidos");
                return null;
            }

            if (!(await model.EhValido()))
            {
                _notificador.AdicionarNotificacoes(await model.ObterErros());
                return null;
            }

            var usuario = await _userManager.FindByNameAsync(model.Email);

            if (usuario == null)
            {
                _notificador.AdicionarNotificacao("E-mail incorreto ou usuário inexistente");
                return null;
            }

            var result = await _signInManager.PasswordSignInAsync(usuario, model.Senha, true, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                _notificador.AdicionarNotificacao("Tentativa de login inválida");
                return null;
            }

            return new AutenticacaoResponse()
            {
                Id = usuario.Id,
                Token = await GerarToken(usuario)
            };
        }

        private async Task<string> GerarToken(Usuario usuario)
        {
            var claims = await ObterClaims(usuario);
            return ObterToken(claims);
        }

        private async Task<List<Claim>> ObterClaims(Usuario usuario)
        {
            var claims = (await _userManager.GetClaimsAsync(usuario)).ToList();

            claims.AddRange(new List<Claim>
            {
                new (ClaimTypes.NameIdentifier, usuario.Id.ToString())
            });

            var perfis = await _userManager.GetRolesAsync(usuario);

            foreach (var nomePerfil in perfis)
            {
                claims.Add(new Claim("role", nomePerfil));
                var perfil = await _roleManager.FindByNameAsync(nomePerfil);
                var claimsDoPerfil = await _roleManager.GetClaimsAsync(perfil);

                claims.AddRange(claimsDoPerfil);
            }

            return claims;
        }

        public string ObterToken(IEnumerable<Claim> claims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_configuration["ChaveJwt"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
