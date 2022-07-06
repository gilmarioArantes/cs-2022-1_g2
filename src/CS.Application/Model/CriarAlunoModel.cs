using CS.Application.Validators;

namespace CS.Application.Model
{
    public class CriarAlunoModel : PessoaModel
    {
        private readonly AlunoModelValidator _validator;

        public string Email { get; set; }

        public string Senha { get; set; }

        public CriarAlunoModel()
        {
            _validator = new AlunoModelValidator();
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
