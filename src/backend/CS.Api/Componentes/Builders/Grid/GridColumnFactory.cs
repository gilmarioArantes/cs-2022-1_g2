using CS.Api.Componentes.Utilidades;
using CS.Api.Componentes.ViewComponent.Grid;
using System.Linq.Expressions;

namespace CS.Api.Componentes.Builders.Grid
{
    public class GridColumnFactory<TModel>
    where TModel : class
    {
        private readonly CellOptions _column;

        public GridColumnFactory(CellOptions column)
        {
            _column = column;
        }

        public GridColumnFactory<TModel> Bound<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            return Bound(UtilidadesComponentes.ObtenhaName(expression),
                UtilidadesComponentes.ObtenhaDisplayName(expression));
        }

        public GridColumnFactory<TModel> CampoTextArea(int quantidadeLinhas = 2,
                                                           string classList = null)
        {
            _column.EhColunaTextArea = true;
            _column.QuantidadeLinhas = quantidadeLinhas;
            _column.ClassList = classList;
            return this;
        }

        public GridColumnFactory<TModel> MaxLength(int maxLength)
        {
            _column.MaxLength = maxLength;
            return this;
        }

        public GridColumnFactory<TModel> PermiteOrdenar(string propriedade = null)
        {
            _column.PermiteOrdenar = true;
            if (propriedade is not null)
            {
                _column.PropertyOrdenacao = propriedade;
            }

            return this;
        }

        public GridColumnFactory<TModel> PermiteQuebrarLinha()
        {
            _column.PermiteQuebrarLinha = true;

            return this;
        }

        public GridColumnFactory<TModel> Title(string title)
        {
            _column.Title = title;

            return this;
        }

        public GridColumnFactory<TModel> Centralizado()
        {
            _column.Centralizado = true;

            return this;
        }

        private GridColumnFactory<TModel> Bound(string property, string title)
        {
            _column.Title = title;
            _column.Property = property;

            return this;
        }

        public GridColumnFactory<TModel> FlexBasis(int flexBasis)
        {
            _column.FlexBasis = flexBasis;

            return this;
        }

        public GridColumnFactory<TModel> Template(string template)
        {
            _column.Template = template;

            return this;
        }
    }
}
