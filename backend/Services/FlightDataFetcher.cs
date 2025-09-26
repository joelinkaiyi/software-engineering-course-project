using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

public class FlightDataFetcher
{
    private readonly HttpClient _http;
    private readonly AppDbContext _db;
    private const string ApiURL = "https://www.tsa.gov.tw/api/publicDataArea/GetFormaterData?id=7dc1379a-9485-4491-866d-fc4f9590ffcf";

    public FlightDataFetcher(HttpClient http, AppDbContext db)
    {
        _http = http;
        _db = db;
    }

    public async Task FetchAndSaveAsync()
    {
        var rawFlights = await _http.GetFromJsonAsync<List<RawFlight>>(ApiURL);
        if (rawFlights == null || !rawFlights.Any())
            return;

        var flights = rawFlights.Select(r => new Flight
        {
            FlightNo = $"{r.AirLineIATA}{r.AirLineNum}",
            AirlineName = r.AirLineName,
            Origin = r.UpAirportName,
            UpAirportCode=r.UpAirportCode,
            Destination = r.GoalAirportName,
            ExpectedDeparture = ParseTime(r.AirFlyDate, r.ExpectDepartureTime),
            ActualDeparture = ParseTime(r.AirFlyDate, r.RealDepartureTime),
            ExpectedArrival = ParseTime(r.AirFlyDate, r.ExpectArrivalTime),
            ActualArrival = ParseTime(r.AirFlyDate, r.RealArrivalTime),
            Status = r.AirFlyStatus
        }).ToList();
        _db.Flights.RemoveRange(_db.Flights);
        await _db.SaveChangesAsync();

        await _db.Flights.AddRangeAsync(flights);
        await _db.SaveChangesAsync();
    }

    private DateTime? ParseTime(string date, string time)
    {
        if (string.IsNullOrWhiteSpace(time)) return null;

        if (!DateTime.TryParseExact(
                date + time.PadLeft(4, '0'),
                "MMddHHmm",
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out var dt))
        {
            return null;
        }

        return new DateTime(DateTime.Now.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, 0, DateTimeKind.Utc);
    }
}