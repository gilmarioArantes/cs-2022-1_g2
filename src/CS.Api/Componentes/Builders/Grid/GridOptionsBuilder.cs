using CS.Api.Componentes.Utilidades;
using CS.Api.Componentes.ViewComponent.Grid;
using System.Linq.Expressions;
using System.Reflection;

namespace CS.Api.Componentes.Builders.Grid
{
    public class GridOptionsBuilder<TModel, TProperty>
    where TModel : class
    where TProperty : class
    {
        public GridOptions Field { get; set; } = new();

        public GridOptionsBuilder<TModel, TProperty> Init(string id)
        {
            Field.Id = id;
            return this;
        }

        public GridOptionsBuilder<TModel, TProperty> Init(Expression<Func<TModel, IEnumerable<TProperty>>> expression)
        {
            MemberExpression memberExp = (MemberExpression)expression.Body;

            Type modelType = memberExp.Expression?.Type;
            if (modelType is not null)
            {
                MemberInfo memberInfo = modelType.GetMember(memberExp.Member.Name).FirstOrDefault();
                if (memberInfo is not null)
                {
                    Field.AspFor = string.Join(".", expression.Body.ToString().Split('.').Skip(1));
                }
            }

            return this;
        }

        public GridOptionsBuilder<TModel, TProperty> AddColumn(Action<GridColumnFactory<TProperty>> factoryMethod)
        {
            CellOptions column = new();
            Field.Colunas.Add(column);
            factoryMethod(new GridColumnFactory<TProperty>(column));

            return this;
        }

        public GridOptionsBuilder<TModel, TProperty> AddAction(Action<GridActionFactory> factoryMethod)
        {
            GridAction action = new();
            Field.Acoes.Add(action);
            factoryMethod(new GridActionFactory(action));

            return this;
        }

        public GridOptionsBuilder<TModel, TProperty> OrdenacaoPadrao(string propertyOrdenacao)
        {
            Field.OrdenacaoPadrao.Add(propertyOrdenacao);
            return this;
        }

        public GridOptionsBuilder<TModel, TProperty> PermiteUnicaSelecao()
        {
            Field.PermiteUnicaSelecao = true;
            return this;
        }

        public GridOptionsBuilder<TModel, TProperty> PermiteMultiplaSelecao()
        {
            Field.PermiteMultiplaSelecao = true;
            return this;
        }

        public GridOptionsBuilder<TModel, TProperty> PermiteMultiplaExclusao()
        {
            Field.PermiteMultiplaExclusao = true;
            return this;
        }

        public GridOptionsBuilder<TModel, TProperty> PesquisePor<TPropertyFiltro>(
            Expression<Func<TProperty, TPropertyFiltro>> expressionFiltro)
        {
            Field.PesquisePor.Add(UtilidadesComponentes.ObtenhaName(expressionFiltro));
            return this;
        }

        public GridOptions Build()
        {
            return Field;
        }
    }
}
