using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CS.Api.Pages
{
    [Authorize]
    public class BaseAuthorizePageModelModel : PageModel
    {
    }
}
