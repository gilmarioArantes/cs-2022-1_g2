namespace CS.Api.Componentes.ViewComponent.Grid
{
    public class CellOptions
    {
        public string Title { get; set; } = "";

        public string Property { get; set; } = "";

        public bool EhColunaTextArea { get; set; }

        public int QuantidadeLinhas { get; set; }

        public int MaxLength { get; set; }

        public bool PermiteOrdenar { get; set; }

        public string PropertyOrdenacao { get; set; } = "";

        public string ClassList { get; set; }

        public bool PermiteQuebrarLinha { get; set; }

        public bool Centralizado { get; set; }

        public int FlexBasis { get; set; }

        public string Template { get; set; }

        public List<object> Highlights { get; set; } = new();

        public List<GridAction> Acoes { get; set; } = new();
    }
}
