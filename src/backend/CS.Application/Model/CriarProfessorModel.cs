using CS.Application.Validators;

namespace CS.Application.Model
{
    public class CriarProfessorModel : PessoaModel
    {
        private readonly ProfessorModelValidator _validator;

        public string Email { get; set; }

        public string Senha { get; set; }

        public CriarProfessorModel()
        {
            _validator = new ProfessorModelValidator();
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
