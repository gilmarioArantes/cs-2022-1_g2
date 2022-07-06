using CS.Application.Interface;
using CS.Application.Model;
using CS.Application.Response;
using CS.Core.Notificador;
using CS.Data.Interface;
using CS.Domain.Entidades;
using Microsoft.AspNetCore.Identity;

namespace CS.Application.Services
{
    public class AlunoService : IAlunoService
    {
        private readonly IAlunoRepository _alunoRepository;
        private readonly INotificador _notificador;
        private readonly UserManager<Usuario> _userManager;

        public AlunoService(IAlunoRepository alunoRepository, INotificador notificador, UserManager<Usuario> userManager)
        {
            _alunoRepository = alunoRepository;
            _notificador = notificador;
            _userManager = userManager;
        }

        public async Task<Guid?> Adicionar(CriarAlunoModel model)
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

            var aluno = new Aluno()
            {
                Nome = model.Nome,
                DataNascimento = model.DataNascimento,
                Cpf = model.Cpf,
                UsuarioId = usuario.Id
            };

            await _alunoRepository.Adicionar(aluno);
            await _alunoRepository.CommitAsync();

            return aluno.Id;
        }

        public async Task Remover(RemoverEntidadeModel model)
        {
            var aluno = await _alunoRepository.ObterPorId(model.Id);

            if (aluno == null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return;
            }

            _alunoRepository.Remover(aluno);
        }

        public async Task<AlunoResponse> ObterPorId(Guid id)
        {
            var aluno = await _alunoRepository.ObterPorId(id);

            if (aluno == null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return null;
            }

            return new AlunoResponse()
            {
                Id = aluno.Id,
                Email = aluno.Usuario.Email,
                Cpf = aluno.Cpf,
                DataNascimento = aluno.DataNascimento,
                Nome = aluno.Nome
            };
        }

        public async Task<List<AlunoResponse>> Obter()
        {
            var alunoes = await _alunoRepository.Obter();

            return alunoes?.Select(x => new AlunoResponse()
            {
                Id = x.Id,
                Email = x.Usuario.Email,
                Cpf = x.Cpf,
                DataNascimento = x.DataNascimento,
                Nome = x.Nome
            }).ToList();
        }

        public async Task Atualizar(AtualizarAlunoModel model)
        {
            var aluno = await _alunoRepository.ObterPorId(model.Id);

            if (aluno == null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return;
            }

            aluno.Atualizar(model.Cpf, model.DataNascimento, model.Nome);
            await _alunoRepository.CommitAsync();
        }

        public async Task AtualizarSenha(AtualizarSenhaModel model)
        {
            var aluno = await _alunoRepository.ObterPorId(model.Id);

            if (aluno == null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return;
            }

            await _userManager.ChangePasswordAsync(aluno.Usuario, model.SenhaAntiga, model.SenhaNova);
        }
    }
}
