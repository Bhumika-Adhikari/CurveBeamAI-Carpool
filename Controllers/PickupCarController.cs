using CarpoolPickup.Data;
using CarpoolPickup.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpoolPickup.Controllers
{
    public class PickupCarController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PickupCarController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<PickupCar>>> GetCars()
        {
            return await _context.PickupCars.AsNoTracking()
                        .Include(c => c.Students).OrderByDescending(c => c.CreatedAt).OrderBy(c => c.HasLeft).ToListAsync<PickupCar>();
        }

        [HttpPost]
        public async Task<ActionResult<PickupCar>> CreatePickupCar([FromBody] PickupCar carObj)
        {
            _context.PickupCars.Update(carObj);
            await _context.SaveChangesAsync();
            var _list = await _context.PickupCars.AsNoTracking().Where(obj => obj.RegistrationNumber == carObj.RegistrationNumber).Include(s => s.Students).ToListAsync();
            return _list.First();
        }

        [HttpPost]
        public async Task<ActionResult<PickupCar>> UpdatePickupCar([FromBody] PickupCar carObj)
        {
            DeletePickupcar(carObj);
            carObj.Id = 0;
            foreach (Student student in carObj.Students)
            {
                student.PickupCars = new List<PickupCar>();
            }
            return await CreatePickupCar(carObj);
        }

        [HttpPost]
        public async void DeletePickupcar([FromBody] PickupCar carObj)
        {
            PickupCar? car = _context.PickupCars.Find(carObj.Id);
            if (car != null)
            {
                _context.Remove(car);
                await _context.SaveChangesAsync();
            }
        }


        [HttpPost]
        public async Task<ActionResult<PickupCar?>> MarkCarLeft([FromBody] PickupCar carObj)
        {
            PickupCar? car = _context.PickupCars.Include(s => s.Students).Where(car => car.Id == carObj.Id).First();
            if (car != null)
            {
                car.HasLeft = true;
                car.LeftAt = DateTime.Now;
                _context.Update(car);
                await _context.SaveChangesAsync();
            }
            return car;
        }

        [HttpPost]
        public async void ClearPickupCars()
        {
            _context.RemoveRange(_context.PickupCars);
            await _context.SaveChangesAsync();
        }

        [HttpPost]
        public async Task<ActionResult<List<PickupCar>>> ResetPickupCars()
        {
            List<PickupCar> cars = await _context.PickupCars.ToListAsync();
            foreach (PickupCar car in cars)
            {
                if (car.HasLeft == true)
                {
                    car.HasLeft = false;
                    car.LeftAt = DateTime.MinValue;
                }
                _context.Update(car);
            }
            await _context.SaveChangesAsync();
            return await GetCars();
        }
    }
}