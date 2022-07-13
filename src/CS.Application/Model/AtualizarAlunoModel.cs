using CS.Application.Validators;

namespace CS.Application.Model
{
    public class AtualizarAlunoModel : PessoaModel
    {
        private readonly AtualizarAlunoModelValidator _validator;

        public AtualizarAlunoModel()
        {
            _validator = new AtualizarAlunoModelValidator();
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
