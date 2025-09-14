"use client";

import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export function OnTimeRateChart({ data }) {
  // data: { arrived, early, onTime, delayed }
  const chartData = {
    labels: ["已抵達", "提早", "準時", "改時"],
    datasets: [
      {
        label: "航班比例",
        data: [data.arrived, data.early, data.onTime, data.change],
        backgroundColor: ["#4DA5F3", "#ffd700", "#16a34a", "#dc2626"],
      },
    ],
  };

  return <Pie data={chartData} />;
}

export function ArrivedRateChart({ data }) {
  // data: { arrived, total }
  const chartData = {
    labels: ["已抵達", "未抵達"],
    datasets: [
      {
        label: "抵達比例",
        data: [data.arrived, data.total - data.arrived],
        backgroundColor: ["#4DA5F3", "#e5e7eb"],
      },
    ],
  };

  return <Pie data={chartData} />;
}

export function DelayTrendChart({ data }) {
  // data: [{ date: "2025-09-13", count: 5 }, ...]
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "改時航班數",
        data: data.map((d) => d.count),
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return <Line data={chartData} />;
}
