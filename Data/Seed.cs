using CarpoolPickup.Models;

namespace CarpoolPickup.Data
{
    public class Seed
    {
        public static async Task SeedClassData(ApplicationDbContext context)
        {
            if (context.Classes.Any())
            {
                context.RemoveRange(context.PickupCars);
                context.RemoveRange(context.Students);
                context.RemoveRange(context.Classes);
                await context.SaveChangesAsync();
            }

            List<SchoolClass> classes = new List<SchoolClass>{
                new SchoolClass("A"),
                new SchoolClass("B")
            };
            
            List<Student> classAStudents = new List<Student>{
                new Student("Sam"),
                new Student("Haris"),
                new Student("Yani"),
                new Student("Abhinav"),
                new Student("Drishti"),
                new Student("Mak"),
                new Student("Saket"),
                new Student("Kabir"),
                new Student("Harita"),
                new Student("Nish")
            };

            List<Student> classBStudents = new List<Student>{
                new Student("Bhumika"),
                new Student("Katy"),
                new Student("Harry"),
                new Student("Champ"),
                new Student("Nahid"),
                new Student("Aidan"),
                new Student("Anupa"),
                new Student("Ghawadi"),
                new Student("Linda"),
                new Student("Bimba"),
                new Student("Shane"),
                new Student("Anurodh"),
                new Student("Jay"),
                new Student("Phil"),
                new Student("Alex")
            };

            SchoolClass classA = classes.Where(obj => obj.ClassName == "A").First<SchoolClass>();
            classA.Students = classAStudents;

            SchoolClass classB = classes.Where(obj => obj.ClassName == "B").First<SchoolClass>();
            classB.Students = classBStudents;

            await context.Classes.AddRangeAsync(classes);
            await context.SaveChangesAsync();
        }
    }
}