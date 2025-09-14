"use client";

import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import FlightTable from "../../components/FlightTable";

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5197/api/flights")
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        setFilteredFlights(data);
      })
      .catch((err) => console.error("載入航班資料失敗:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredFlights(flights);
      return;
    }
    const q = query.toLowerCase();
    const results = flights.filter((f) =>
      [f.flightNo, f.airlineName, f.originAirport]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
    setFilteredFlights(results);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">航班清單</h2>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p className="text-center text-gray-500">載入中...</p>
      ) : (
        <FlightTable flights={filteredFlights} />
      )}
    </div>
  );
}
