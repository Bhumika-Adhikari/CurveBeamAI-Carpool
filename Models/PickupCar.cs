using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CarpoolPickup.Models
{
    public class PickupCar
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string RegistrationNumber { get; set; } = default!;
        
        public List<Student> Students { get; set; } = default!;

        public Boolean HasLeft { get; set; } = default!;

        public DateTime LeftAt { get; set; } = default!;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}