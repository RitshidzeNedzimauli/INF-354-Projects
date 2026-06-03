using System.ComponentModel.DataAnnotations;

namespace u24717739_HW01_API.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Location { get; set; } = string.Empty;

        [Required]
        public decimal TicketPrice { get; set; }
    }
}
