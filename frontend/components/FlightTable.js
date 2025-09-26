"use client";

import Link from "next/link";

export default function FlightTable({ flights }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">航班號碼</th>
            <th className="p-3">航空公司</th>
            <th className="p-3">出發地</th>
            <th className="p-3">預計抵達</th>
            <th className="p-3">實際抵達</th>
            <th className="p-3">狀態</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr
              key={f.id}
              className="text-center border-b hover:bg-gray-100 hover:text-gray-900 transition"
            >
              <td className="p-3 font-semibold text-blue-600 underline">
                <Link href={`/flights/${f.id}`}>{f.flightNo}</Link>
              </td>
              <td className="p-3">{f.airlineName}</td>
              <td className="p-3">{f.upAirportCode + f.origin}</td>
              <td className="p-3">{f.expectedArrival}</td>
              <td className="p-3">{f.actualArrival || "-"}</td>
              <td
                className={`p-3 font-bold ${
                  f.status === "延誤Delayed"
                    ? "text-red-600"
                    : f.status === "準時OnTime"
                    ? "text-green-600"
                    : f.status === "提早Early"
                    ? "text-yellow-600"
                    : f.status === "已到Arrived"
                    ? "text-blue-600"
                    : "white"
                }`}
              >
                {f.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {flights.length === 0 && (
        <p className="text-center text-gray-500 mt-4">目前沒有航班資料</p>
      )}
    </div>
  );
}
