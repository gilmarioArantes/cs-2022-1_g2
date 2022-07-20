using CS.Application.Validators;
using CS.Domain.Enums;
using FluentValidation.Results;

namespace CS.Application.Model
{
    public class ExercicioModel : BaseModel
    {
        private readonly ExercicioModelValidator _validator;
        public ExercicioModel()
        {
            _validator = new();
        }

        public Guid Id { get; set; }

        public EnumTipoExercicio TipoExercicio { get; set; }

        public string Descricao { get; set; }

        public string Restricao { get; set; }

        public EnumGrupoExercicio GrupoCorporal { get; set; }

        public int QuantidadeRepeticao { get; set; }

        public override async Task<bool> EhValido()
        {
            ValidationResult result = await _validator.ValidateAsync(this);
            return result.IsValid;
        }

        public override async Task<IEnumerable<string>> ObterErros()
        {
            ValidationResult result = await _validator.ValidateAsync(this);
            return result.Errors.Select(x => x.ErrorMessage);
        }
    }
}
