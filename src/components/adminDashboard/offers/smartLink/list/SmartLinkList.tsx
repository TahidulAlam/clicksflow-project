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

interface SmartLinkData {
  header: string;
  accessor: string;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: any) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}
const labelData = [{}];

const columns: SmartLinkData[] = [
  { header: "ID", accessor: "id", searchable: true },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Encoded Value", accessor: "encodedValue", searchable: true },
  { header: "Offers", accessor: "offers" },
  { header: "Catch all offer", accessor: "catchAllOffer" },
  { header: "Show to partners", accessor: "showToPartners" },
  { header: "Today's Revenue", accessor: "todaysRevenue" },
  { header: "Today's Payout", accessor: "todaysPayout" },
  { header: "Action", accessor: "action" },
];

const SmartLinkList: React.FC = () => {
  return (
    <div>
      <DataList
        data={labelData}
        columns={columns}
        addLink="/admin/offers/smart-link/add"
        showLinkButton={true}
        showSearchBar={true}
        showColumnToggle={true}
        showfilter={true}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default SmartLinkList;
