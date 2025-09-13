import React from "react";
import clsx from "clsx";

interface SectionDividerProps {
  label: string;
  backgroundClass?: string;
  border?: boolean;
  padding?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  backgroundClass = "bg-[#F2F7FD]",
  border = false,
  padding = "py-2 px-0",
}) => {
  return (
    <div
      className={clsx(
        "relative w-full lg:my-1.5 my-0.5",
        backgroundClass,
        padding,
        border && "border border-red-500"
      )}
    >
      {/* Horizontal line */}
      <div className="border-t border-gray-300 w-full"></div>

      {/* Center label */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F2F7FD] px-3 py-1 rounded-md text-xs text-gray-700 border border-gray-300">
        {label}
      </div>
    </div>
  );
};

export default SectionDivider;
