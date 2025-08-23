"use client";
import React from "react";

const advertiserSignUp = [
  {
    label: "Custom Sign Up Header",
    value: "OFF",
  },
  { label: "Custom Sign Up Confirmation", value: "OFF" },
];

const AdvertiserSignUp = () => {
  return (
    <div className=" bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
      {advertiserSignUp?.map((setting, index) => (
        <div key={index} className="flex-col px-4 py-2 ">
          <div>
            <span className="text-xs font-bold text-black">
              {setting.label}
            </span>
          </div>
          <div>
            <span
              className={`text-xs px-2 py-1 ${
                setting.value === "ON" ? " text-green-700" : " text-red-700"
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

export default AdvertiserSignUp;
