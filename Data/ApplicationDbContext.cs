using Microsoft.EntityFrameworkCore;
using CarpoolPickup.Models;

namespace CarpoolPickup.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) {}

        public DbSet<SchoolClass> Classes { get; set; } = default!;

        public DbSet<Student> Students { get; set; } = default!;

        public DbSet<PickupCar> PickupCars { get; set; } = default!;
    }
}

