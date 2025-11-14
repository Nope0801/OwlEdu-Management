using Microsoft.AspNetCore.Mvc;

namespace OwlEdu_Manager.ViewComponents
{
    public class SidebarViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(List<string> items)
        {
            return View(items);
        }
    }
}
