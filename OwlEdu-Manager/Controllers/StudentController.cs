using Microsoft.AspNetCore.Mvc;

namespace OwlEdu_Manager.Controllers
{
    public class StudentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Profile()
        {
            return PartialView("_StudentProfile");
        }

        public IActionResult Notification()
        {
            return PartialView();
        }
        public IActionResult Enrollment()
        {
            return PartialView("_StudentEnrollment");
        }

        public IActionResult Course()
        {
            return PartialView("_StudentCourse");
        }

        public IActionResult Class()
        {
            return PartialView("_StudentClass");
        }

        public IActionResult Schedule()
        {
            return PartialView("_StudentSchedule");
        }

        public IActionResult Payment()
        {
            return PartialView("_StudentPayment");
        }
    }
}
