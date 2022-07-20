using CS.Domain.Enums;

namespace CS.Domain.Entidades
{
    public class Exercicio : EntidadeBase
    {
        public EnumTipoExercicio TipoExercicio { get; set; }

        public string Descricao { get; set; }

        public string Restricao { get; set; }

        public EnumGrupoExercicio GrupoCorporal { get; set; }

        public int QuantidadeRepeticao { get; set; }

        public void Atualizar(EnumTipoExercicio tipoExercicio, string descricao, string restricao, EnumGrupoExercicio grupoCorporal, int quantidadeRepeticoes)
        {
            TipoExercicio = tipoExercicio;
            Descricao = descricao;
            Restricao = restricao;
            GrupoCorporal = grupoCorporal;
            QuantidadeRepeticao = quantidadeRepeticoes;
        }
    }
}
