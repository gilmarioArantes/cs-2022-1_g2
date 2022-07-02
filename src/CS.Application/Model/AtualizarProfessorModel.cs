using CS.Application.Validators;

namespace CS.Application.Model
{
    public class AtualizarProfessorModel : PessoaModel
    {
        private readonly AtualizarProfessorModelValidator _validator;

        public AtualizarProfessorModel()
        {
            _validator = new AtualizarProfessorModelValidator();
        }

        public override async Task<bool> EhValido()
        {
            var result = await _validator.ValidateAsync(this);
            return result.IsValid;
        }

        public override async Task<IEnumerable<string>> ObterErros()
        {
            var result = await _validator.ValidateAsync(this);
            return result.Errors.Select(x => x.ErrorMessage);
        }
    }
}
