namespace Web_Midterms_Grp6.Models;

public class MaintenanceRecord
{
    public int MaintenanceId { get; set; }
    public string TruckId { get; set; }
    public string LicensePlate { get; set; }
    public DateTime DateOfInspection { get; set; }
    public string Remarks { get; set; }
    public string Status { get; set; }
    public string Supplier { get; set; }
    public decimal Cost { get; set; }
}