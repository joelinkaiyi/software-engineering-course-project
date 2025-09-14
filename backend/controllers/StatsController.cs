using Microsoft.AspNetCore.Mvc;
using backend.Data;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public StatsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetStats()
        {
            var flights = _db.Flights.ToList();

            var stats = new
            {
                arrived = flights.Count(f => f.Status.Contains("Arrived") || f.Status.Contains("已到")),
                early = flights.Count(f => f.Status.Contains("Early") || f.Status.Contains("提早")),
                onTime = flights.Count(f => f.Status.Contains("OnTime") || f.Status.Contains("準時")),
                delayed = flights.Count(f => f.Status.Contains("TimeChg") || f.Status.Contains("延誤")),
                cancelled = flights.Count(f => f.Status.Contains("Cancelled") || f.Status.Contains("取消")),
            };

            var delayTrend = flights
                .Where(f => f.ExpectedArrival != null)
                .GroupBy(f => f.ExpectedArrival.Value.Date)
                .Select(g => new
                {
                    date = g.Key.ToString("M/d"),
                    count = g.Count(f => f.Status.Contains("TimeChg") || f.Status.Contains("延誤"))
                })
                .OrderBy(x => x.date)
                .ToList();

            return Ok(new { stats, delayTrend });
        }
    }
}
