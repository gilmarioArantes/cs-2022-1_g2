using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Core.Notificador
{
    public class Notificador : INotificador
    {
        private readonly List<Notificacao> _notificacoes;

        public Notificador()
        {
            _notificacoes = new List<Notificacao>();
        }

        public List<Notificacao> ObterNotificacoes()
        {
            return _notificacoes;
        }

        public bool PossuiNotificacao()
        {
            return _notificacoes.Any();
        }

        public void AdicionarNotificacoes(IEnumerable<string> erros)
        {
            foreach (var erro in erros)
            {
                AdicionarNotificacao(erro);
            }
        }

        public void AdicionarNotificacao(string erro)
        {
            _notificacoes.Add(new Notificacao(erro));
        }

        public IEnumerable<string> ObterErros()
        {
            return _notificacoes.Select(n => n.Mensagem);
        }
    }
}
