import React from "react";

interface MetricCardProps {
  id: string;
  title: string;
  unit: string;
  isMoney?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, unit, isMoney }) => {
  return (
    <div className="flex flex-col justify-between rounded-lg shadow h-[180px] w-full p-5 active:border-4 active:border-dashed bg-white cursor-move">
      <div className="text-gray-500 text-sm font-medium">{title}</div>
      <div className="text-2xl font-bold text-gray-800">
        {isMoney ? "$" : ""}0{unit === "%" ? "%" : ""}
      </div>
      <div className="text-xs text-gray-400 text-right">TODAY</div>

      <div className="mt-2 text-xs text-gray-500 space-y-1">
        <div className="flex justify-between">
          <span>Yesterday</span>
          <span>
            {isMoney ? "$" : ""}0{unit === "%" ? "%" : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Current Month</span>
          <span>
            {isMoney ? "$" : ""}0{unit === "%" ? "%" : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Last Month</span>
          <span>
            {isMoney ? "$" : ""}0{unit === "%" ? "%" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
