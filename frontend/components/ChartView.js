import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

export function OnTimeRateChart({ data }) {
  const chartData = {
    labels: ["已抵達", "提早", "準時", "改時", "取消"],
    datasets: [
      {
        label: "航班比例",
        data: [
          data.arrived,
          data.early,
          data.onTime,
          data.change,
          data.cancelled,
        ],
        backgroundColor: [
          "#4DA5F3",
          "#ffd700",
          "#16a34a",
          "#dc2626",
          "#6b7280",
        ],
      },
    ],
  };
  return <Pie data={chartData} />;
}

export function DelayTrendChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "改時航班數",
        data: data.map((d) => d.count),
        backgroundColor: "#2563eb",
      },
    ],
  };
  return <Bar data={chartData} />;
}
