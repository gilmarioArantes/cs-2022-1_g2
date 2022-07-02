using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;

namespace CS.Api.Componentes.Utilidades
{
    public static class UtilidadesComponentes
    {
        public static string ObtenhaDisplayName<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            MemberInfo member = ((MemberExpression)expression.Body).Member;

            DisplayAttribute atributoDisplay = (DisplayAttribute)member
                .GetCustomAttributes(typeof(DisplayAttribute), false)
                .FirstOrDefault();

            return atributoDisplay?.Name ?? member.Name;
        }

        public static string ObtenhaName<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            string bodyExpressao = expression.Body.ToString();
            int posicaoAcessoMembro = bodyExpressao.IndexOf(".", StringComparison.Ordinal);
            string bodySemNomeParametro = bodyExpressao.Substring(++posicaoAcessoMembro);

            return Regex.Replace(bodySemNomeParametro, @"\(|\)", "");
        }
    }
}
