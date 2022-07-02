using CS.Api.Componentes.Builders.Grid;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq.Expressions;

namespace CS.Api.Componentes
{
    public static class Extensions
    {
        public static GridOptionsBuilder<TModel, TProperty> GridOptions<TModel, TProperty>(
        this IHtmlHelper<TModel> _, Expression<Func<TModel, IEnumerable<TProperty>>> expression)
        where TModel : class
        where TProperty : class
        {
            return new GridOptionsBuilder<TModel, TProperty>().Init(expression);
        }
    }
}
