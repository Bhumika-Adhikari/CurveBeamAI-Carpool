using Microsoft.EntityFrameworkCore;
using CarpoolPickup.Models;
namespace CarpoolPickup.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<SchoolClass> Classes { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<PickupCar> PickupCars { get; set; }

    }
}

