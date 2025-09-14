namespace backend.Models
{
    public class Flight
    {
        public int Id { get; set; }
        public string FlightNo { get; set; } = string.Empty;
        public string AirlineName { get; set; } = string.Empty;
        public string Origin { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;

        public DateTime? ExpectedDeparture { get; set; }
        public DateTime? ActualDeparture { get; set; }

        public DateTime? ExpectedArrival { get; set; }
        public DateTime? ActualArrival { get; set; }

        public string Status { get; set; } = string.Empty;
    }

}

