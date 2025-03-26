using Microsoft.AspNetCore.Mvc;
using Web_Midterms_Grp6.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Web_Midterms_Grp6.Controllers;

public class PreventiveMaintenanceController : Controller
{
    // In a real application, you'd use a database context here
    // This is just for demonstration purposes
    private static List<MaintenanceRecord> _maintenanceRecords = new List<MaintenanceRecord>
    {
        new MaintenanceRecord
        {
            MaintenanceId = 1001,
            TruckId = "T-001",
            LicensePlate = "ABC-1234",
            DateOfInspection = DateTime.Parse("2025-03-16"),
            Remarks = "Oil Change",
            Status = "Completed",
            Supplier = "Supplier A",
            Cost = 200
        }
    };

    // Add sample history data
    static PreventiveMaintenanceController()
    {
        // Add some initial history data
        for (int i = 1; i < 10; i++)
        {
            _maintenanceRecords.Add(new MaintenanceRecord
            {
                MaintenanceId = 1001 + i,
                TruckId = $"T-00{i + 1}",
                LicensePlate = $"XYZ-{1000 + i}",
                DateOfInspection = DateTime.Parse("2025-03-16"),
                Remarks = "Oil Change",
                Status = "Completed",
                Supplier = "Supplier A",
                Cost = 200
            });
        }
    }

    public IActionResult Index()
    {
        ViewBag.NextId = _maintenanceRecords.Count > 0
            ? _maintenanceRecords.Max(r => r.MaintenanceId) + 1
            : 1001;

        ViewBag.TruckIds = _maintenanceRecords.Select(r => r.TruckId).Distinct().ToList();

        // Get upcoming maintenance for the next 7 days
        var today = DateTime.Today;
        ViewBag.UpcomingMaintenance = _maintenanceRecords
            .Where(r => (r.DateOfInspection - today).TotalDays > 0 && (r.DateOfInspection - today).TotalDays <= 7)
            .ToList();

        return View("~/Views/Home/PreventiveMaintenance.cshtml", _maintenanceRecords);
    }

    [HttpPost]
    public IActionResult AddRecord([FromBody] MaintenanceRecord record)
    {
        if (ModelState.IsValid)
        {
            _maintenanceRecords.Add(record);
            return Json(new { success = true });
        }
        return Json(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
    }

    [HttpGet]
    public IActionResult GetHistory(string truckId)
    {
        var history = string.IsNullOrEmpty(truckId)
            ? new List<MaintenanceRecord>()
            : _maintenanceRecords.Where(r => r.TruckId == truckId).ToList();

        return Json(history);
    }

    [HttpGet]
    public IActionResult GetReminders()
    {
        var today = DateTime.Today;
        var upcomingMaintenance = _maintenanceRecords
            .Where(r => (r.DateOfInspection - today).TotalDays > 0 && (r.DateOfInspection - today).TotalDays <= 7)
            .ToList();

        return Json(upcomingMaintenance);
    }

    [HttpPost]
    public IActionResult UpdateRecord([FromBody] MaintenanceRecord record)
    {
        var existingRecord = _maintenanceRecords.FirstOrDefault(r => r.MaintenanceId == record.MaintenanceId);

        if (existingRecord == null)
        {
            return Json(new { success = false, errors = "Record not found" });
        }

        // Update all properties
        existingRecord.TruckId = record.TruckId;
        existingRecord.LicensePlate = record.LicensePlate;
        existingRecord.DateOfInspection = record.DateOfInspection;
        existingRecord.Remarks = record.Remarks;
        existingRecord.Status = record.Status;
        existingRecord.Supplier = record.Supplier;
        existingRecord.Cost = record.Cost;

        return Json(new { success = true });
    }

    [HttpPost]
    public IActionResult DeleteRecord(int maintenanceId)
    {
        var recordToRemove = _maintenanceRecords.FirstOrDefault(r => r.MaintenanceId == maintenanceId);

        if (recordToRemove == null)
        {
            return Json(new { success = false, errors = "Record not found" });
        }

        _maintenanceRecords.Remove(recordToRemove);
        return Json(new { success = true });
    }
}