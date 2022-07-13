using CS.Application.Model;
using CS.Domain.ValueObjects;
using FluentValidation;

namespace CS.Application.Validators
{
    public class AtualizarAlunoModelValidator : AbstractValidator<AtualizarAlunoModel>
    {
        public AtualizarAlunoModelValidator()
        {
            RuleFor(x => x.Cpf).NotEmpty().WithMessage("Campo CPF não pode ser vazio");
            RuleFor(x => x.Cpf).Must(cpf => new Cpf().Validar(cpf)).WithMessage("CPF não é valido");
            RuleFor(x => x.Nome).NotEmpty().WithMessage("Campo nome não pode ser vazio");
            RuleFor(x => x.DataNascimento).NotEmpty().WithMessage("Campo data de nascimento não pode ser vazio");
        }
    }
}
