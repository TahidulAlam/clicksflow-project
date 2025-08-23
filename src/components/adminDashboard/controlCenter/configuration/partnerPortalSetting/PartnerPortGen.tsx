"use client";
import React from "react";

const partnerPortGen = [
  {
    label: "Show Account Manager Details",
    value: "ON",
  },
  { label: "Hide Total Click", value: "ON" },
];

const PartnerPortGen = () => {
  return (
    <div className=" bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
      {partnerPortGen.map((setting, index) => (
        <div key={index} className="flex-col px-4 py-2 ">
          <div>
            <span className="text-xs font-bold text-black">
              {setting.label}
            </span>
          </div>
          <div>
            <span
              className={`text-xs py-1 ${
                setting.value === "ON" ? " text-green-700" : " text-black"
              }`}
            >
              {setting.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartnerPortGen;
