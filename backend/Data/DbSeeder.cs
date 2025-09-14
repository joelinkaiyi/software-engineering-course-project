using backend.Models;
namespace backend.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (!context.Flights.Any())
            {
                context.Flights.AddRange(
                       new Flight
                       {
                           FlightNo = "BR189",
                           AirlineName = "長榮航空",
                           Origin = "東京",
                           Destination = "台北",
                           ExpectedArrival = DateTime.UtcNow.AddHours(2),
                           Status = "準時"
                       },
                        new Flight
                        {
                            FlightNo = "CI101",
                            AirlineName = "中華航空",
                            Origin = "香港",
                            Destination = "台北",
                            ExpectedArrival = DateTime.UtcNow.AddHours(3),
                            Status = "延誤"
                        },
                        new Flight
                        {
                            FlightNo = "JL97",
                            AirlineName = "日本航空",
                            Origin = "大阪",
                            Destination = "台北",
                            ExpectedArrival = DateTime.UtcNow.AddHours(4),
                            Status = "準時"
                        }
                );
                context.SaveChanges();
            }
        }
    }
}
