// Controllers/LoginController.cs
using Microsoft.AspNetCore.Mvc;
using Web_Midterms_Grp6.Models;

namespace Web_Midterms_Grp6.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                // This matches your client-side validation in login.js
                if (model.Username == "admin" && model.Password == "password")
                {
                    return RedirectToAction("LandingPage", "Home");
                }

                ModelState.AddModelError("", "Invalid username or password.");
            }

            return View(model);
        }

        [HttpPost]
        public IActionResult Validate([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .FirstOrDefault() ?? "Validation failed";

                return Json(new { success = false, message = errorMessage });
            }

            if (model.Username == "admin" && model.Password == "password")
            {
                return Json(new { success = true, redirectUrl = "/Home/LandingPage" });
            }

            return Json(new { success = false, message = "Invalid username or password." });
        }
    }
}