namespace CS.Api.Componentes.ViewComponent.Grid;

using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

public class GridViewComponent : ViewComponent
{
    public IViewComponentResult Invoke(dynamic options)
    {
        GridOptions gridOptions = options["options"].Field;

        ViewData["id"] = !string.IsNullOrEmpty(gridOptions.Id) ? gridOptions.Id : gridOptions.GetElementId;
        ViewData["name"] = gridOptions.AspFor;
        ViewData["columnsParams"] = JsonSerializer.Serialize(gridOptions.Colunas);
        ViewData["acoes"] = JsonSerializer.Serialize(gridOptions.Acoes);
        ViewData["ordenacaoPadraoCrescente"] = gridOptions.OrdenacaoPadraoCrescente;
        ViewData["ordenacaoPadrao"] = JsonSerializer.Serialize(gridOptions.OrdenacaoPadrao);
        ViewData["permiteUnicaSelecao"] = gridOptions.PermiteUnicaSelecao;
        ViewData["permiteMultiplaSelecao"] = gridOptions.PermiteMultiplaSelecao;
        ViewData["permiteMultiplaExclusao"] = gridOptions.PermiteMultiplaExclusao;
        ViewData["permitePesquisa"] = gridOptions.PesquisePor.Any();
        ViewData["pesquisePor"] = gridOptions.PesquisePor.ToArray();

        return View();
    }
}

