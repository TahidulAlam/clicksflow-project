"use client";
import React from "react";

const partnerDashboardAnnouncement = [
  {
    label: "Enable",
    value: "ON",
  },
];

const PartnerDashboardAnnouncement = () => {
  return (
    <div className=" bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
      {partnerDashboardAnnouncement.map((setting, index) => (
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

export default PartnerDashboardAnnouncement;
