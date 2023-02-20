using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CarpoolPickup.Models
{
    public class PickupCar
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string RegistrationNumber { get; set; }
        public List<Student> Students { get; set; }

        public Boolean HasLeft { get; set; }

        public DateTime LeftAt{get;set;}

        public DateTime CreatedAt{get;set;} = DateTime.Now;

        // public PickupCar()
        // {

        // }
        // public PickupCar(string number)
        // {
        //     RegistrationNumber = number;
        //     Students = new List<Student>();
        // }

        // public PickupCar(string number,List<>)
        // {
        //     RegistrationNumber = number;
        //     Students = new List<Student>();
        // }
    }
}