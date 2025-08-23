"use client";
import React from "react";
import Image from "next/image";

const configData = {
  networkId: "RevsBill",
  networkDisplayName: "RevsBill",
  id: 36,
  supportEmail: "support@revsbill.com",
  timezone: "America/Nassau (GMT -04:00)",
  showName: "ON",
  logo: "/logo.png",
  favicon: "/favicon.ico",
  currency: "USD",
};

const ConfigGenData = () => {
  return (
    <div className=" bg-white gap-4 grid grid-cols-2 w-[100%]">
      {Object.entries(configData).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase font-medium">
            {formatLabel(key)}
          </span>
          {key === "logo" || key === "favicon" ? (
            <Image
              src={String(value)}
              alt={key}
              width={48}
              height={48}
              className="mt-1 w-12 h-12 object-contain bg-gray-100 rounded"
            />
          ) : (
            <span className="text-sm text-gray-800">{value}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const formatLabel = (str: string) =>
  str
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (s) => s.toUpperCase());

export default ConfigGenData;
