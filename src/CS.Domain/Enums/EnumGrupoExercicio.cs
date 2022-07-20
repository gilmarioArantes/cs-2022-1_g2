using System.ComponentModel.DataAnnotations;

namespace CS.Domain.Enums
{
    public enum EnumGrupoExercicio
    {
        [Display(Name = "Abdômen")]
        Abdomen,
        Cardio,
        Dorsal,
        [Display(Name = "Membros inferiores")]
        MembrosInferiores,
        [Display(Name = "Membros superiores")]
        MembrosSuperiores,
        [Display(Name = "Membros superiores/biceps")]
        MembrosSuperioresBiceps,
        [Display(Name = "Membros superiores/dorsal")]
        MembrosSuperioresDorsal,
        Peitoral,
        [Display(Name = "Posterior de coxa")]
        PosteriorCoxa,
        [Display(Name = "Posterior de ombro")]
        PosteriorOmbro
    }
}
