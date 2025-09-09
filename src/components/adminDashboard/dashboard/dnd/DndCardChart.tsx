// "use client";
"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

// Register minimal chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [10, 20, 30, 40, 50, 70],
      fill: true,
      backgroundColor: "rgba(135, 206, 235, 0.3)",
      borderColor: "rgba(135, 206, 235, 1)",
      borderWidth: 4,
      tension: 0.4,
      pointRadius: 0,
      height: 40,
      width: 100,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    title: { display: false },
  },
  scales: {
    x: {
      display: false, // hide X axis
    },
    y: {
      display: false, // hide Y axis
    },
  },
};

const DndCardChart = () => {
  return (
    <div className="w-full h-[68px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default DndCardChart;

// "use client";
// import React from "react";
// // import "./styles.css";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// // Register the required components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Trend",
//       data: [10, 20, 30, 40, 50, 70], // Approximated upward trend
//       fill: true,
//       backgroundColor: "rgba(135, 206, 235, 0.3)", // Light blue fill
//       borderColor: "rgba(0, 0, 255, 1)", // Darker blue line
//       tension: 0.4, // Slight curve for a smoother line
//     },
//   ],
// };

// const options = {
//   scales: {
//     y: {
//       beginAtZero: true,
//     },
//     x: {
//       grid: {
//         display: true,
//         color: "rgba(200, 200, 200, 0.2)", // Light grid lines
//       },
//     },
//   },
// };

// const DndCardChart = () => {
//   return <Line data={data} options={options} />;
// };

// export default DndCardChart;
