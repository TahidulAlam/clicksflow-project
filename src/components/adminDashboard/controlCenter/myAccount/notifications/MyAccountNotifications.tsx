/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DataListSkeleton from "@/components/shared/skeleton/DataListSkeleton";
import dynamic from "next/dynamic";

const DataList = dynamic(
  () => import("@/components/shared/dataTable/DataList"),
  {
    ssr: false,
    loading: () => (
      <DataListSkeleton rows={5} columns={12} showToolbar={true} />
    ),
  }
);

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: any) => React.ReactNode;
}
const ListData = [{}];

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
];

const MyAccountNotifications = () => {
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

export default MyAccountNotifications;
