using CS.Application.Interface;
using CS.Application.Model;
using CS.Application.Response;
using CS.Core.Notificador;
using CS.Data.Interface;
using CS.Domain.Entidades;
using CS.Domain.ValueObjects;
using Microsoft.AspNetCore.Identity;

namespace CS.Application.Services
{
    public class ProfessorService : IProfessorService
    {
        private readonly IProfessorRepository _professorRepository;
        private readonly INotificador _notificador;
        private readonly UserManager<Usuario> _userManager;

        public ProfessorService(IProfessorRepository professorRepository, INotificador notificador, UserManager<Usuario> userManager)
        {
            _professorRepository = professorRepository;
            _notificador = notificador;
            _userManager = userManager;
        }

        public async Task<Guid?> Adicionar(CriarProfessorModel model)
        {
            if (model == null)
            {
                _notificador.AdicionarNotificacao("Dados inválidos");
                return null;
            }

            if (!(await model.EhValido()))
            {
                _notificador.AdicionarNotificacoes(await model.ObterErros());
                return null;
            }

            var usuario = new Usuario()
            {
                UserName = model.Email,
                NormalizedUserName = model.Email.ToUpper(),
                Email = model.Email,
                NormalizedEmail = model.Email.ToUpper()
            };

            var result = await _userManager.CreateAsync(usuario, model.Senha);

            if (!result.Succeeded)
            {
                _notificador.AdicionarNotificacoes(result.Errors.Select(x => x.Description));
                return null;
            }

            var professor = new Professor()
            {
                Nome = model.Nome,
                DataNascimento = model.DataNascimento,
                Cpf = model.Cpf,
                UsuarioId = usuario.Id,
                Endereco = new Endereco()
                {
                    Cidade = model.Endereco.Cidade,
                    Numero = model.Endereco.Numero,
                    Bairro = model.Endereco.Bairro,
                    CEP = model.Endereco.CEP,
                    Complemento = model.Endereco.Complemento,
                    Estado = model.Endereco.Estado,
                    Logradouro = model.Endereco.Logradouro
                }
            };

            await _professorRepository.Adicionar(professor);
            await _professorRepository.CommitAsync();

            return professor.Id;
        }

        public async Task Remover(RemoverEntidadeModel model)
        {
            var professor = await _professorRepository.ObterPorId(model.Id);

            if (professor == null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return;
            }

            _professorRepository.Remover(professor);
        }

        public async Task<ProfessorResponse> ObterPorId(Guid id)
        {
            var professor = await _professorRepository.ObterPorId(id);

            if (professor == null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return null;
            }

            return new ProfessorResponse()
            {
                Id = professor.Id,
                Email = professor.Usuario.Email,
                Cpf = professor.Cpf,
                DataNascimento = professor.DataNascimento,
                Nome = professor.Nome,
                Endereco = new EnderecoResponse()
                {
                    Cidade = professor.Endereco.Cidade,
                    Numero = professor.Endereco.Numero,
                    Bairro = professor.Endereco.Bairro,
                    CEP = professor.Endereco.CEP,
                    Complemento = professor.Endereco.Complemento,
                    Estado = professor.Endereco.Estado,
                    Logradouro = professor.Endereco.Logradouro
                }
            };
        }

        public async Task<List<ProfessorResponse>> Obter()
        {
            var professores = await _professorRepository.Obter();

            return professores?.Select(x => new ProfessorResponse()
            {
                Id = x.Id,
                Email = x.Usuario.Email,
                Cpf = x.Cpf,
                DataNascimento = x.DataNascimento,
                Nome = x.Nome,
                Endereco = new EnderecoResponse()
                {
                    Cidade = x.Endereco.Cidade,
                    Numero = x.Endereco.Numero,
                    Bairro = x.Endereco.Bairro,
                    CEP = x.Endereco.CEP,
                    Complemento = x.Endereco.Complemento,
                    Estado = x.Endereco.Estado,
                    Logradouro = x.Endereco.Logradouro
                }
            }).ToList();
        }

        public async Task Atualizar(AtualizarProfessorModel model)
        {
            var professor = await _professorRepository.ObterPorId(model.Id);

            if (professor == null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return;
            }

            professor.Atualizar(model.Cpf, model.DataNascimento, model.Nome);
            await _professorRepository.CommitAsync();
        }

        public async Task AtualizarSenha(AtualizarSenhaModel model)
        {
            var professor = await _professorRepository.ObterPorId(model.Id);

            if (professor == null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return;
            }

            await _userManager.ChangePasswordAsync(professor.Usuario, model.SenhaAntiga, model.SenhaNova);
        }
    }
}
