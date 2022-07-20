using CS.Application.Interface;
using CS.Application.Model;
using CS.Application.Response;
using CS.Core.Notificador;
using CS.Data.Interface;
using CS.Domain.Entidades;

namespace CS.Application.Services
{
    public class ExercicioService : IExercicioService
    {
        private readonly IExercicioRepository _repositorioExercicio;
        private readonly INotificador _notificador;

        public ExercicioService(IExercicioRepository repositorioExercicio, INotificador notificador)
        {
            _repositorioExercicio = repositorioExercicio;
            _notificador = notificador;
        }

        public async Task<Guid?> Adicionar(ExercicioModel model)
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

            Exercicio exercicio = new()
            {
                Descricao = model.Descricao,
                GrupoCorporal = model.GrupoCorporal,
                QuantidadeRepeticao = model.QuantidadeRepeticao,
                Restricao = model.Restricao,
                TipoExercicio = model.TipoExercicio
            };

            await _repositorioExercicio.Adicionar(exercicio);
            await _repositorioExercicio.CommitAsync();

            return exercicio.Id;
        }

        public async Task Atualizar(AtualizarExercicioModel model)
        {
            Exercicio exercicio = await _repositorioExercicio.ObterPorId(model.Id);

            if (exercicio is null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return;
            }

            if (!(await model.EhValido()))
            {
                _notificador.AdicionarNotificacoes(await model.ObterErros());
                return;
            }

            exercicio.Atualizar(model.TipoExercicio, model.Descricao, model.Restricao, model.GrupoCorporal, model.QuantidadeRepeticao);
            await _repositorioExercicio.CommitAsync();
        }

        public async Task<List<ExercicioResponse>> Obter()
        {
            List<Exercicio> exercicios = await _repositorioExercicio.Obter();

            return exercicios?.Select(ex => new ExercicioResponse()
            {
                Id = ex.Id,
                Descricao = ex.Descricao,
                GrupoCorporal = ex.GrupoCorporal,
                QuantidadeRepeticao = ex.QuantidadeRepeticao,
                Restricao = ex.Restricao, 
                TipoExercicio = ex.TipoExercicio
            }).ToList();
        }

        public async Task<ExercicioResponse> ObterPorId(Guid id)
        {
            Exercicio exercicio = await _repositorioExercicio.ObterPorId(id);

            if (exercicio is null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return null;
            }

            return new ExercicioResponse()
            {
                Id = exercicio.Id,
                Descricao = exercicio.Descricao,
                GrupoCorporal = exercicio.GrupoCorporal,
                QuantidadeRepeticao = exercicio.QuantidadeRepeticao,
                Restricao = exercicio.Restricao,
                TipoExercicio = exercicio.TipoExercicio
            };
        }

        public async Task Remover(RemoverEntidadeModel model)
        {
            Exercicio exercicio = await _repositorioExercicio.ObterPorId(model.Id);

            if (exercicio is null)
            {
                _notificador.AdicionarNotificacao("Id inválido");
                return;
            }

            _repositorioExercicio.Remover(exercicio);
            await _repositorioExercicio.CommitAsync();
        }
    }
}
