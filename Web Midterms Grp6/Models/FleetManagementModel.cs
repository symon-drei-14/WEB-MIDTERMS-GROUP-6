using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Web_Midterms_Grp6.Models
{
    public class FleetManagementModel
    {
        public int Id { get; set; }
        public string Vehicle { get; set; }
        public string Driver { get; set; }
        public string Assistant { get; set; }
        public string Client { get; set; }
        public string ContainerNumber { get; set; }
        public string Destination { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime EstimatedArrivalTime { get; set; }
        public string Status { get; set; }
    }

}