using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Web_Midterms_Grp6.Models;

namespace Web_Midterms_Grp6.Controllers
{
    public class TripLogsController : Controller
    {
        private static List<TripLog> tripLogs = new List<TripLog>();

        public IActionResult Index()
        {
            return View("~/Views/Home/TripLogs.cshtml", tripLogs ?? new List<TripLog>());
        }

        [HttpPost]
        public IActionResult Add(TripLog newTripLog)
        {
            if (ModelState.IsValid)
            {
                newTripLog.TripLogId = tripLogs.Any() ? tripLogs.Max(t => t.TripLogId) + 1 : 1;
                newTripLog.TotalAmount = newTripLog.CashAdvance + newTripLog.AdditionalCashAdvance;
                tripLogs.Add(newTripLog);

                return RedirectToAction("Index"); 
            }

            return View("~/Views/Home/TripLogs.cshtml", tripLogs);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var tripLog = tripLogs.FirstOrDefault(t => t.TripLogId == id);
            if (tripLog != null)
            {
                tripLogs.Remove(tripLog);
            }

            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult GetTrip(int id)
        {
            var trip = tripLogs.FirstOrDefault(t => t.TripLogId == id);
            if (trip == null)
            {
                return NotFound();
            }
            return Json(trip);
        }

        [HttpPost]
        public IActionResult Edit(TripLog updatedTripLog)
        {
            var existingTripLog = tripLogs.FirstOrDefault(t => t.TripLogId == updatedTripLog.TripLogId);
            if (existingTripLog == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                existingTripLog.Date = updatedTripLog.Date;
                existingTripLog.Driver = updatedTripLog.Driver;
                existingTripLog.BrokerClient = updatedTripLog.BrokerClient;
                existingTripLog.Destination = updatedTripLog.Destination;
                existingTripLog.ContainerNo = updatedTripLog.ContainerNo;
                existingTripLog.BLRefNo = updatedTripLog.BLRefNo;
                existingTripLog.Status = updatedTripLog.Status;
                existingTripLog.CashAdvance = updatedTripLog.CashAdvance;
                existingTripLog.AdditionalCashAdvance = updatedTripLog.AdditionalCashAdvance;
                existingTripLog.TotalAmount = updatedTripLog.CashAdvance + updatedTripLog.AdditionalCashAdvance;

                return RedirectToAction("Index");
            }

            return View("~/Views/Home/TripLogs.cshtml", tripLogs);
        }

    }
}