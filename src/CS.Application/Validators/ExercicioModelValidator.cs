using CS.Application.Model;
using FluentValidation;

namespace CS.Application.Validators
{
    public class ExercicioModelValidator : AbstractValidator<ExercicioModel>
    {
        public ExercicioModelValidator()
        {
            RuleFor(x => x.Descricao).NotEmpty().WithMessage("Campo Descrição não pode ser vazio");
            RuleFor(x => x).Must(m => m.TipoExercicio >= 0).WithMessage("Campo tipo de exercício deve ser informado");
            RuleFor(x => x).Must(m => m.GrupoCorporal >= 0).WithMessage("Campo grupo corporal deve ser informado");
        }
    }
}
