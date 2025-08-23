"use client";
import React from "react";

const configLoginLinks = [
  {
    label: "Network Login Link",
    url: "https://beta.clicksflowclient.io/admin",
  },
  {
    label: "Partner Login Form",
    url: "https://beta.clicksflowclient.io/partner",
  },
  {
    label: "Advertiser Login Form",
    url: "https://beta.clicksflowclient.io/advertiser",
  },
  {
    label: "Partner Sign Up Form",
    url: "https://beta.clicksflowclient.io/partner/register",
  },
  {
    label: "Advertiser Sign Up Form",
    url: "https://beta.clicksflowclient.io/advertiser/register",
  },
];

const ConfigLoginLinks = () => {
  return (
    <div className=" bg-white shadow rounded grid grid-cols-1 gap-2">
      {configLoginLinks.map((link, index) => (
        <div key={index} className="flex flex-col gap-1">
          <span className="text-xs font-bold text-black">{link.label}</span>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:underline text-xs break-all"
          >
            {link.url}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ConfigLoginLinks;
