"use client";
import React from "react";

const networkDomainRegInfo = [
  {
    label: "Name",
    value: "Dublia",
  },
  {
    label: "Email",
    value: "Dublia@mail.com",
  },
  {
    label: "Organization",
    value: "Dublia",
  },
  { label: "Email", value: "01789317682" },

  { label: "Address 1", value: "Pabna" },
  { label: "Address 2", value: "Rajshahi" },
  { label: "City", value: "Pabna" },
  { label: "Region", value: "Rajshahi" },
  { label: "Country", value: "Bangladesh" },
  { label: "ZIP/Postal Code", value: "6600" },
];

const NetworkDomainRegInfo = () => {
  return (
    <div className=" bg-white">
      <p>
        This information is being collected in relation to Administered Domain
        Services under the RevsBill Service Terms. This information is required
        by ICANN and will only be used for registration issues. Inaccurate
        information can lead to the suspension or cancellation of the
        Administered Domains.
      </p>
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-2">
        {networkDomainRegInfo.map((setting, index) => (
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
    </div>
  );
};

export default NetworkDomainRegInfo;
