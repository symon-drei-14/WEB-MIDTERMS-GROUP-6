using System;
using System.ComponentModel.DataAnnotations;

namespace Web_Midterms_Grp6.Models
{
    public class TripLog
    {
        [Key]
        public int TripLogId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Driver { get; set; }

        public string BrokerClient { get; set; }
        public string Destination { get; set; }
        public string ContainerNo { get; set; }
        public string BLRefNo { get; set; }
        public string Status { get; set; }
        public decimal CashAdvance { get; set; }
        public decimal AdditionalCashAdvance { get; set; }
        public decimal TotalAmount { get; set; }
    }
}