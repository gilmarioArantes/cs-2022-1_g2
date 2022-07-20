using CS.Domain.Enums;

namespace CS.Application.Response
{
    public class ExercicioResponse
    {
        public Guid Id { get; set; }

        public EnumTipoExercicio TipoExercicio { get; set; }

        public string Descricao { get; set; }

        public string Restricao { get; set; }

        public EnumGrupoExercicio GrupoCorporal { get; set; }

        public int QuantidadeRepeticao { get; set; }
    }
}
