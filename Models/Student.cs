using System;
using System.ComponentModel.DataAnnotations;

namespace CarpoolPickup.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; } = default!;

        [Required]
        public string StudentName { get; set; } = default!;

        public ICollection<PickupCar> PickupCars { get; set; } = default!;

        public Student(){}

        public Student(string name)
        {
            StudentName = name;
            PickupCars = new List<PickupCar>();
        }

    }
}

