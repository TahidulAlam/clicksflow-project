/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DataList from "@/components/shared/dataTable/DataList";

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: any) => React.ReactNode;
}
const ListData = [
  {
    date: "2025-05-13, 10:15 AM",
    ip: "103.153.155.12",
    location: "Bangladesh",
    os: "Windows 10",
    browser: "Chrome",
  },
  {
    date: "2025-05-13, 03:28 PM",
    ip: "37.111.230.126",
    location: "Dhaka, Bangladesh",
    os: "Windows 10",
    browser: "Chrome",
  },
  {
    date: "2025-05-13, 04:22 PM",
    ip: "37.111.230.126",
    location: "Dhaka, Bangladesh",
    os: "Windows 10",
    browser: "Chrome",
  },
  {
    date: "2025-05-17, 04:06 PM",
    ip: "37.111.229.13",
    location: "Dhaka, Bangladesh",
    os: "Windows 10",
    browser: "Chrome",
  },
  {
    date: "2025-05-17, 04:24 PM",
    ip: "104.28.163.16",
    location: "Singapore, Singapore",
    os: "Windows 10",
    browser: "Chrome",
  },
  {
    date: "2025-05-18, 05:03 AM",
    ip: "202.134.8.192",
    location: "Dhaka, Bangladesh",
    os: "Windows 10",
    browser: "Chrome",
  },
];

//  table columns
const Columns: Column[] = [
  {
    header: "Login Time",
    accessor: "date",
    searchable: false,
  },
  {
    header: "IP",
    accessor: "ip",
    searchable: false,
  },
  {
    header: "Location",
    accessor: "location",
    searchable: false,
  },
  {
    header: "OS",
    accessor: "os",
    searchable: false,
  },
  {
    header: "Browser",
    accessor: "browser",
    searchable: false,
  },
];

const MyAccountLogins = () => {
  return (
    <div>
      <DataList
        data={ListData}
        columns={Columns}
        showLinkButton={false}
        showSearchBar={false}
        showColumnToggle={false}
        showfilter={false}
      />
    </div>
  );
};

export default MyAccountLogins;
