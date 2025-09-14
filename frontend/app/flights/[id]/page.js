"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FlightDetail from "../../../components/FlightDetail";

export default function FlightDetailPage() {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchFlight = async () => {
      try {
        setLoading(true);
        setError(null);

        // 這裡改成你後端的 API，例如 /api/flights/:id
        const res = await fetch(`http://localhost:5197/api/flights/${id}`);

        if (!res.ok) {
          throw new Error("無法取得航班資料");
        }

        const data = await res.json();
        setFlight(data);
      } catch (err) {
        setError(err.message || "發生錯誤");
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">載入中...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!flight) return <p className="text-center text-gray-500">找不到航班</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">航班詳細資訊</h2>
      <FlightDetail flight={flight} />
    </div>
  );
}
