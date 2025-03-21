using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Web_Midterms_Grp6.Models;

namespace Web_Midterms_Grp6.Controllers
{
    public class MaintenanceController : Controller
    {
        private static List<Maintenance> maintenanceList = new List<Maintenance>
        {
            new Maintenance
            {
                MaintenanceId = 1001,
                TruckId = "T-001",
                LicensePlate = "ABC-1234",
                DateOfInspection = new DateTime(2025, 03, 16),
                Remarks = "Oil Change",
                Status = "Completed",
                Supplier = "Supplier A",
                Cost = 200
            }
        };

        public IActionResult Index()
        {
            if (maintenanceList == null)
            {
                maintenanceList = new List<Maintenance>(); // Ensure it's initialized
            }

            return View("~/Views/Home/PreventiveMaintenance.cshtml", maintenanceList);
        }
        [HttpPost]
        public IActionResult AddMaintenance(Maintenance maintenance)
        {
            if (ModelState.IsValid)
            {
                maintenance.MaintenanceId = maintenanceList.Count > 0
                    ? maintenanceList[^1].MaintenanceId + 1
                    : 1001;

                maintenanceList.Add(maintenance);
                return RedirectToAction("Index");
            }

            return View("Index", maintenanceList);
        }
    }
}
