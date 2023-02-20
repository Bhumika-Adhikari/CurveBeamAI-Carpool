using System;
using System.ComponentModel.DataAnnotations;

namespace CarpoolPickup.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string StudentName { get; set; }

        public ICollection<PickupCar> PickupCars { get; set; }

        public Student()
        {

        }
        public Student(string name)
        {
            StudentName = name;
            PickupCars = new List<PickupCar>();
        }

    }
}

