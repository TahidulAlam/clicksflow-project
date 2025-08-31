"use client";

import React from "react";

type BoxItem = {
  label: string;
  value: string;
};

interface BoxDataGridProps {
  data?: BoxItem[];
  columns?: number;
  gap?: number;
  emptyMessage?: string;
}

const BoxDataGrid: React.FC<BoxDataGridProps> = ({
  data = [],
  columns = 2,
  gap = 2,
  emptyMessage = "No data available",
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-white p-4 text-center text-sm text-gray-500 rounded">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={`bg-white grid grid-cols-1 sm:grid-cols-${columns} gap-${gap} rounded`}
    >
      {data.map((item, idx) => (
        <div key={idx} className="flex flex-col px-4 py-1">
          <span className="text-xs font-semibold text-gray-800">
            {item.label}
          </span>
          <span
            className={`text-xs py-1 mt-1 inline-block rounded ${
              item.value.toUpperCase() === "ON"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BoxDataGrid;
