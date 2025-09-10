/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import React from "react";

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: any) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

const data = [
  {
    id: 1,
    name: "Sample Offer A",
    margin: "20%",
    labels: "Top",
    status: "Active",
    action: "View",
  },
  {
    id: 2,
    name: "Sample Offer B",
    margin: "15%",
    labels: "Seasonal",
    status: "Paused",
    action: "View",
  },
];

const columns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    width: "50px",
    fixed: "left",
  },
  {
    header: "Name",
    accessor: "name",
    width: "300px",
  },
  {
    header: "Margin",
    accessor: "margin",
  },
  {
    header: "Labels",
    accessor: "labels",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Action",
    accessor: "action",
    width: "100px",
    fixed: "right",
  },
];

const TiersList = () => {
  return (
    <div>
      <DataList data={data} columns={columns} />
    </div>
  );
};

export default TiersList;
