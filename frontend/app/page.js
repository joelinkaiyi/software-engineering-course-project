"use client";
import { useState, useEffect } from "react";
import FlightTimeline from "@/components/FlightTimeline";
import { OnTimeRateChart } from "../components/ChartView";
import Link from "next/link";

export default function HomePage() {
  const [mockFlights, setMockFlight] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5197/api/flights")
      .then((res) => res.json())
      .then((data) => setMockFlight(data));
  }, []);
  let early = 0,
    arrived = 0,
    change = 0,
    onTime = 0,
    cancelled = 0;
  for (let i = 0; i < mockFlights.length; i++) {
    if (mockFlights[i].status == "準時OnTime") {
      onTime++;
    } else if (mockFlights[i].status == "已到Arrived") {
      arrived++;
    } else if (mockFlights[i].status == "改時TimeChg") {
      change++;
    } else if (mockFlights[i].status == "取消Cancelled") {
      cancelled++;
    } else if (mockFlights[i].status == "提早Early") {
      early++;
    }
  }

  const mockStats = {
    total: mockFlights.length,
    early: early,
    arrived: arrived,
    onTime: onTime,
    change: change,
    cancelled: cancelled,
  };
  return (
    <div className="space-y-8">
      {/* 標題 */}
      <h1 className="text-2xl font-bold text-center">
        松山機場航班即時資訊總覽
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-500">今日航班</p>
          <p className="text-2xl font-bold text-gray-700">{mockStats.total}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-blue-700">已抵達</p>
          <p className="text-2xl font-bold text-blue-700">{mockStats.arrived}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-yellow-700">提早</p>
          <p className="text-2xl font-bold text-yellow-700">
            {mockStats.early}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-green-700">準時</p>
          <p className="text-2xl font-bold text-green-700">
            {mockStats.onTime}
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-red-700">改時</p>
          <p className="text-2xl font-bold text-red-700">{mockStats.change}</p>
        </div>
        <div className="bg-bronze bg-opacity-10 p-4 rounded-lg shadow-md text-center">
          <p className="text-bronze">取消</p>
          <p className="text-2xl font-bold text-bronze">
            {mockStats.cancelled}
          </p>
        </div>
      </div>

      {/* 最新航班快訊 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          最新航班快訊
        </h2>
        <ul className="divide-y">
          {mockFlights.map((f) => (
            <li key={f.id} className="grid grid-cols-3 p-2 items-center">
              <span className="font-semibold text-gray-800">{f.flightNo}</span>
              <span className="text-center text-gray-800">{f.airlineName}</span>
              <span
                className={`font-bold text-right ${
                  f.status === "延誤"
                    ? "text-red-600"
                    : f.status === "準時"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {f.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 小型統計圖表 */}
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center">
        <div className="w-48 h-48">
          <OnTimeRateChart
            data={{
              arrived: mockStats.arrived,
              onTime: mockStats.onTime,
              delayed: mockStats.change,
              early: mockStats.early,
            }}
          />
        </div>
      </div>

      {/* 快速導覽 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/flights"
          className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-700"
        >
          航班清單
        </Link>
        <Link
          href="/stats"
          className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-700"
        >
          統計分析
        </Link>
        <Link
          href="/settings"
          className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-700"
        >
          系統設定
        </Link>
        <Link
          href="/about"
          className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-700"
        >
          關於系統
        </Link>
      </div>
      <FlightTimeline flights={mockFlights} />
    </div>
  );
}
