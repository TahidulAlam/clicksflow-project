"use client";
import React from "react";

const configGlobalSetting = [
  {
    label: "Enable Fail Traffic and Forwarding Rules when offer is paused",
    value: "ON",
  },
  { label: "Enable Offer Caps in Partner UI", value: "OFF" },
  { label: "Enable Partner Notifications for Offer Caps", value: "ON" },
  {
    label: "Carry Over Partner Visibility Selection From Previous Setting",
    value: "ON",
  },
  { label: "Hide Partner Impression Links", value: "ON" },
  { label: "Hide Partner Tracking Links", value: "ON" },
  { label: "Hide Partner Smart Links", value: "OFF" },
  { label: "Allow partners to manage Postbacks", value: "ON" },
  { label: "Allow rejected clicks to convert", value: "ON" },
];

const ConfigGlobalSetting = () => {
  return (
    <div className=" bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
      {configGlobalSetting.map((setting, index) => (
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

export default ConfigGlobalSetting;
