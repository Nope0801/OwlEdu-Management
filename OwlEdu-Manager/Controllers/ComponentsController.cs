using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace OwlEdu_Manager.Controllers
{
    public class ComponentsController : Controller
    {
        public IActionResult Pagination(string Id)
        {
            return PartialView("_Pagination", Id);
        }
        public IActionResult Modal(string Id)
        {
            return PartialView("_Modal", Id);
        }
        public IActionResult Switch(string Id)
        {
            return PartialView("_Switch", Id);
        }

        public IActionResult Datagrid(string Id)
        {
            return PartialView("_Datagrid", Id);
        }

        public IActionResult Schedule(string Id)
        {
            return PartialView("_Schedule", Id);
        }
    }
}
