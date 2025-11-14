using Microsoft.AspNetCore.Mvc;

namespace OwlEdu_Manager.ViewComponents
{
    public class HeaderViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
