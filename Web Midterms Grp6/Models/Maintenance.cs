using System;
using System.ComponentModel.DataAnnotations;

namespace Web_Midterms_Grp6.Models
{
    public class Maintenance
    {
        [Key]
        public int MaintenanceId { get; set; }

        [Required]
        public string TruckId { get; set; }

        [Required]
        public string LicensePlate { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfInspection { get; set; }

        public string Remarks { get; set; }

        public string Status { get; set; }

        public string Supplier { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Cost { get; set; }
    }
}
