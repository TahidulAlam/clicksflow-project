"use client";
import React from "react";

const networkBillingAddress = [
  {
    label: "Address 1",
    value: "Dublia",
  },
  { label: "Address 2", value: "Dublia pur" },

  { label: "City", value: "Pabna" },
  { label: "Region", value: "Rajshahi" },
  { label: "Country", value: "Bangladesh" },
  { label: "ZIP/Postal Code", value: "6600" },
];

const NetworkBillingAddress = () => {
  return (
    <div className=" bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
      {networkBillingAddress.map((setting, index) => (
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

export default NetworkBillingAddress;
