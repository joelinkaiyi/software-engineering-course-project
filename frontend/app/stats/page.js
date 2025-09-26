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
  console.log(stats);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-center">航班統計</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-500">今日航班</p>
          <p className="text-2xl font-bold text-gray-700">
            {stats.arrived +
              stats.early +
              stats.onTime +
              stats.delayed +
              stats.cancelled}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-blue-700">已抵達</p>
          <p className="text-2xl font-bold text-blue-700">{stats.arrived}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-green-700">準時</p>
          <p className="text-2xl font-bold text-green-700">{stats.onTime}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-yellow-700">提早</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.early}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
          <p className="text-red-700">延誤</p>
          <p className="text-2xl font-bold text-red-700">{stats.delayed}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-600">取消</p>
          <p className="text-2xl font-bold text-gray-600">{stats.cancelled}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 準點率圓餅圖 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">航班比例</h3>
          <div className="w-64 h-64">
            <OnTimeRateChart
              data={{
                arrived: stats.arrived,
                early: stats.early,
                onTime: stats.onTime,
                change: stats.change,
                cancelled: stats.cancelled,
              }}
            />
          </div>
        </div>

        {/* 延誤趨勢柱狀圖 */}
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
