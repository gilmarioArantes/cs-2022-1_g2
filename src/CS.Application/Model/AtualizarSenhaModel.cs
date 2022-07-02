using CS.Application.Validators;

namespace CS.Application.Model
{
    public class AtualizarSenhaModel : BaseModel
    {
        private readonly AtualizarSenhaModelValidator _validator;

        public AtualizarSenhaModel()
        {
            _validator = new AtualizarSenhaModelValidator();
        }

        public Guid Id { get; set; }

        public string SenhaAntiga { get; set; }

        public string SenhaNova { get; set; }

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
