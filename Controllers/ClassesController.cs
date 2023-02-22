using CarpoolPickup.Data;
using CarpoolPickup.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpoolPickup.Controllers
{
    public class ClassesController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public ClassesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SchoolClass>>> GetClasses()
        {
            return await _context.Classes.Include(c => c.Students).ToListAsync();
        }
    }
}
