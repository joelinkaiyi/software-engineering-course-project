"use client";

import { useEffect, useState } from "react";
import { OnTimeRateChart, DelayTrendChart } from "../../components/ChartView";

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [delayTrend, setDelayTrend] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("http://localhost:5197/api/stats");
        const data = await res.json();
        setStats(data.stats);
        setDelayTrend(data.delayTrend);
      } catch (err) {
        console.error("載入統計資料失敗:", err);
      }
    }
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-center text-gray-500">載入中...</p>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 航班統計</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 準點率 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">準點率</h3>
          <div className="w-64 h-64">
            <OnTimeRateChart
              data={{
                onTime: stats.onTime,
                delayed: stats.delayed,
              }}
            />
          </div>
        </div>

        {/* 延誤趨勢 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">
            過去一週延誤航班數
          </h3>
          <div className="h-72">
            <DelayTrendChart data={delayTrend} />
          </div>
        </div>
      </div>
    </div>
  );
}
