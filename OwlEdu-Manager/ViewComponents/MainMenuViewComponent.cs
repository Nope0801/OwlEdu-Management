using Microsoft.AspNetCore.Mvc;

namespace OwlEdu_Manager.ViewComponents
{
    public class MainMenuViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(List<string> items)
        {
            return View(items);
        }
    }
}
