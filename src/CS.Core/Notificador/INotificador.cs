using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Core.Notificador
{
    public interface INotificador
    {
        List<Notificacao> ObterNotificacoes();
        void AdicionarNotificacoes(IEnumerable<string> erros);
        bool PossuiNotificacao();
        IEnumerable<string> ObterErros();
        void AdicionarNotificacao(string erro);
    }
}
