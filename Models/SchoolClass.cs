using System;
using System.ComponentModel.DataAnnotations;

namespace CarpoolPickup.Models
{
    public class SchoolClass
    {
        [Key]
        public int Id { get; set; } = default!;

        [Required]
        public string ClassName { get; set; } = default!;
        
        public List<Student> Students { get; set; } = default!;

        public SchoolClass(){}

        public SchoolClass(string name){
            ClassName = name;
            Students = new List<Student>();
        }
    }
}

