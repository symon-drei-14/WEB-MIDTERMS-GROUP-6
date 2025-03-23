using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Web_Midterms_Grp6.Models;

namespace Web_Midterms_Grp6.Controllers
{
    public class FleetManagementController : Controller
    {
        // Static list to store assigned trips in memory
        private static List<AssignTrip> _assignedTrips = new List<AssignTrip>
        {
            // Sample initial data
            new AssignTrip
            {
                Id = 1,
                Vehicle = "Vehicle 1",
                Driver = "Driver 1",
                DriverAssistant = "Driver Assistant 1",
                Client = "Toyota",
                ContainerNumber = "23193081",
                Destination = "Destination A",
                DepartureTime = DateTime.Parse("2025-03-19 10:00:00"),
                EstimatedArrivalTime = DateTime.Parse("2025-03-19 16:00:00"),
                Status = "In Progress"
            },
            new AssignTrip
            {
                Id = 2,
                Vehicle = "Vehicle 2",
                Driver = "Driver 2",
                DriverAssistant = "Driver Assistant 2",
                Client = "Mastabushi",
                ContainerNumber = "23193081",
                Destination = "Destination B",
                DepartureTime = DateTime.Parse("2025-03-20 09:00:00"),
                EstimatedArrivalTime = DateTime.Parse("2025-03-20 15:00:00"),
                Status = "Assigned"
            }
        };

        // GET: FleetManagement
        public IActionResult Index()
        {
            // Return the FleetManagement view with the assigned trips data
            return View("FleetManagement", _assignedTrips);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AssignTrip(AssignTrip model)
        {
            if (ModelState.IsValid)
            {
                // Set Id to the next available Id
                model.Id = _assignedTrips.Count > 0 ? _assignedTrips.Max(t => t.Id) + 1 : 1;

                // Add to the static list
                _assignedTrips.Add(model);

                return Json(new { success = true, message = "Trip assigned successfully" });
            }

            // Get and return detailed validation errors
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return Json(new
            {
                success = false,
                message = "Please correct the errors",
                errors = errors
            });
        }
    }
}


