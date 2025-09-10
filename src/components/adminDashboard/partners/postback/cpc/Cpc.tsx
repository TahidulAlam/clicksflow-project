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
  headerClassName?: string;
  cellClassName?: string;
}

const cpcData: Record<string, string | number | boolean | null>[] = [];

const cpcColumns: Column[] = [
  { header: "Pixel ID", accessor: "id", searchable: true },
  { header: "Partner", accessor: "partner", searchable: true },
  { header: "Offer", accessor: "offer", searchable: true },
  { header: "Level", accessor: "level", searchable: true },
  { header: "Method", accessor: "method", searchable: true },
  { header: "Postback URL", accessor: "postbackURL", searchable: false },
  { header: "Descriptions", accessor: "descriptions", searchable: false },
  { header: "Created", accessor: "created", searchable: false },
  { header: "Modified", accessor: "modified", searchable: false },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    cell: () => <button className="text-blue-600 hover:underline">Edit</button>,
  },
];

const CPC = () => {
  return (
    <DataList
      data={cpcData}
      columns={cpcColumns}
      // emptyMessage="Data not found."
    />
  );
};

export default CPC;
