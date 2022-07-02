namespace CS.Api.Componentes.ViewComponent.Grid
{
    public class GridOptions
    {
        public string AspFor { get; set; } = "";

        public string GetElementId => AspFor.Replace(".", "_");

        public string Id { get; set; } = "";

        public bool OrdenacaoPadraoCrescente { get; set; } = true;

        public bool PermiteUnicaSelecao { get; set; }

        public bool PermiteMultiplaSelecao { get; set; }

        public bool PermiteMultiplaExclusao { get; set; }

        public List<string> OrdenacaoPadrao { get; } = new();

        public List<CellOptions> Colunas { get; set; } = new();

        public List<GridAction> Acoes { get; set; } = new();

        public List<string> PesquisePor { get; } = new();
    }
}
