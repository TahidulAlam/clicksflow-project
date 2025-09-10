import React from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import DndCardChart from "./DndCardChart";

interface MetricCardProps {
  id: string;
  title: string;
  unit: string;
  isMoney?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, unit, isMoney }) => {
  return (
    <div className="flex flex-col justify-between rounded-lg shadow  w-full p-5 active:border active:border-dashed bg-[#F2F7FD] border-gray-400 cursor-move">
      <div className="flex justify-between">
        <div>
          <div className="text-gray-500 text-sm font-bold ">{title}</div>
        </div>
        <div className="flex flex-col items-end text-sm font-medium gap-0">
          <div className="text-xs text-gray-400 text-left">TODAY</div>
          <div className="flex items-center gap-1 text-sm font-semibold ">
            <span>
              <FaArrowCircleDown className="text-red-500" />
            </span>
            <span>+16%</span>
          </div>
        </div>
      </div>

      <div className="text-2xl font-bold text-gray-800">
        {isMoney ? "$" : ""}0{unit === "%" ? "%" : ""}
      </div>
      <DndCardChart />

      <div className="mt-2 text-xs text-gray-500 space-y-1">
        <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
          <span>Yesterday</span>
          <span className="font-bold">
            {isMoney ? "$" : ""}0{unit === "%" ? "%" : ""}
          </span>
        </div>
        <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
          <span>Current Month</span>
          <span className="font-bold">
            {isMoney ? "$" : ""}0{unit === "%" ? "%" : ""}
          </span>
        </div>
        <div className="flex justify-between border-b border-dashed border-gray-200 pb-1">
          <span>Last Month</span>
          <span className="font-bold">
            {isMoney ? "$" : ""}0{unit === "%" ? "%" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
