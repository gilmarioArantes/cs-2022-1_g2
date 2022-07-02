using CS.Application.Model;
using FluentValidation;

namespace CS.Application.Validators
{
    public class AutenticacaoModelValidator : AbstractValidator<AutenticacaoModel>
    {
        public AutenticacaoModelValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Campo e-mail não pode ser vazio");
            RuleFor(x => x.Senha).NotEmpty().WithMessage("Campo senha não pode ser vazio");
        }
    }
}
