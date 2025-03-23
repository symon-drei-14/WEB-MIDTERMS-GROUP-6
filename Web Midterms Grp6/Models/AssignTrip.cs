using System;
using System.ComponentModel.DataAnnotations;

namespace Web_Midterms_Grp6.Models
{
    public class AssignTrip
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please select a vehicle")]
        public string Vehicle { get; set; }

        [Required(ErrorMessage = "Please select a driver")]
        public string Driver { get; set; }

        [Required(ErrorMessage = "Please select a driver assistant")]
        [Display(Name = "Driver Assistant")]
        public string DriverAssistant { get; set; }

        [Required(ErrorMessage = "Client name is required")]
        public string Client { get; set; }

        [Required(ErrorMessage = "Container number is required")]
        [Display(Name = "Container No.")]
        public string ContainerNumber { get; set; }

        [Required(ErrorMessage = "Destination is required")]
        public string Destination { get; set; }

        [Required(ErrorMessage = "Departure time is required")]
        [Display(Name = "Departure Time")]
        [DataType(DataType.DateTime)]
        public DateTime DepartureTime { get; set; }

        [Required(ErrorMessage = "Estimated arrival time is required")]
        [Display(Name = "Estimated Arrival Time")]
        [DataType(DataType.DateTime)]
        public DateTime EstimatedArrivalTime { get; set; }

        [Display(Name = "Status")]
        public string Status { get; set; } = "Assigned";

        // Navigation properties if you want to link to other entities
        // public virtual Vehicle AssignedVehicle { get; set; }
        // public virtual Driver AssignedDriver { get; set; }
    }
}