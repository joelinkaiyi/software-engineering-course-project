using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FlightsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            return await _context.Flights.ToListAsync();
        }

        // GET api/flights/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null) return NotFound();
            return flight;
        }

        // POST api/flights
        [HttpPost]
        public async Task<ActionResult<Flight>> CreateFlight(Flight flight)
        {
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFlight), new { id = flight.Id }, flight);
        }

        // PUT api/flights/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFlight(int id, Flight flight)
        {
            if (id != flight.Id) return BadRequest();

            _context.Entry(flight).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/flights/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null) return NotFound();

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
