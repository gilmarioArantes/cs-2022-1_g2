using CS.Application.Model;
using FluentValidation;

namespace CS.Application.Validators
{
    public class AtualizarSenhaModelValidator : AbstractValidator<AtualizarSenhaModel>
    {
        public AtualizarSenhaModelValidator()
        {
            RuleFor(x => x.SenhaAntiga).NotEmpty().WithMessage("Campo senha antiga não pode ser vazio");
            RuleFor(x => x.SenhaNova).NotEmpty().WithMessage("Campo senha nova não pode ser vazio");
        }
    }
}
