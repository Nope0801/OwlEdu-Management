using Microsoft.AspNetCore.Mvc;

namespace OwlEdu_Manager.Controllers
{
    public class StudentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
