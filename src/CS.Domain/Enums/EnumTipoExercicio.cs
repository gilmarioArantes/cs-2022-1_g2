using System.ComponentModel.DataAnnotations;

namespace CS.Domain.Enums
{
    public enum EnumTipoExercicio
    {
        [Display(Name = "Musculação")]
        Musculacao,
        Cardio,
        Alongamento,
        Funcional
    }
}
