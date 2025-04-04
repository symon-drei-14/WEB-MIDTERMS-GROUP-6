using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Web_Midterms_Grp6.Models;

namespace Web_Midterms_Grp6.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult FleetManagement()
    {
        return View();
    }


    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult TripLogs()
    {
        return View();
    }

    public IActionResult PreventiveMaintenance()
    {
        return RedirectToAction("Index", "PreventiveMaintenance");
    }

    public IActionResult LandingPage()
    {
        return View();
    }

    public IActionResult Login()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
