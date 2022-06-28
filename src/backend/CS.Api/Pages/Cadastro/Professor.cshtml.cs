using CS.Application.Interface;
using CS.Application.Response;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CS.Api.Pages.Cadastro
{
    public class ProfessorModel : BaseAuthorizePageModelModel
    {
        public List<ProfessorResponse> Professores { get; }
        private readonly IProfessorService _professorService;

        public ProfessorModel(IProfessorService professorService)
        {
            _professorService = professorService;
        }

        public async Task<IActionResult> OnGet()
        {
            var professores = await _professorService.Obter();
            ViewData["professores"] = JsonSerializer.Serialize(professores);
            
            return Page();
        }
    }
}
