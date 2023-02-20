using System;
using System.ComponentModel.DataAnnotations;

namespace CarpoolPickup.Models
{
    public class SchoolClass
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ClassName { get; set; }
        public List<Student> Students { get; set; }

        public SchoolClass(){
            
        }
        public SchoolClass(string name){
            ClassName = name;
            Students = new List<Student>();
        }
    }
}

