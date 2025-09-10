/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";
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

interface Metric {
  label: string;
  value: string | number;
}
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
    id: 1,
    Id: "INV-001",
    advertiser: "Partner A",
    status: "Pending",
    advertiserVisibility: "Private",
    paymentTerms: "Net 30",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    amount: "$1,200.00",
    publicNotes: "Expected to clear within 30 days",
    internalNotes: "Partner has good history",
    dateCreated: "2025-05-01",
    lastModified: "2025-05-20",
    action: "Review",
  },
];

//  table columns
const Columns: Column[] = [
  {
    header: " ID",
    accessor: "Id",
    searchable: true,
    fixed: "left",
  },
  {
    header: "Advertiser",
    accessor: "advertiser",
    searchable: true,
  },
  {
    header: "Status",
    accessor: "status",
    searchable: true,
  },
  {
    header: "Advertiser Visibility",
    accessor: "advertiserVisibility",
    searchable: true,
  },
  {
    header: "Payment Terms",
    accessor: "paymentTerms",
    searchable: true,
  },
  {
    header: "Time Period",
    accessor: "timePeriod",
    searchable: false,
    cell: (row: any) => `${row.startDate} to ${row.endDate}`,
  },
  {
    header: "Amount",
    accessor: "amount",
    searchable: false,
  },
  {
    header: "Public Notes",
    accessor: "publicNotes",
    searchable: true,
    width: "200px",
  },
  {
    header: "Internal Notes",
    accessor: "internalNotes",
    searchable: true,
  },
  {
    header: "Date Created",
    accessor: "dateCreated",
    searchable: false,
  },
  {
    header: "Last Modification",
    accessor: "lastModified",
    searchable: false,
  },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const metrics: Metric[] = [
  { label: "Impressions", value: 0 },
  { label: "Gross Clicks", value: 0 },
  { label: "Clicks", value: 0 },
  { label: "Total CV", value: 0 },
];

const MarketPlace = () => {
  return (
    <div>
      <BoxAccordion collapsible={false}>
        <BoxHeader className="bg-blue-100">
          <h2 className="text-sm font-base py-1">Summery</h2>
        </BoxHeader>
        <BoxContent>
          <div className="grid grid-cols-1 sm:grid-cols-22 md:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
            {metrics.length > 0 ? (
              metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-blue-100 rounded-2xl p-2 flex flex-col justify-between items-center hover:shadow-lg transition"
                >
                  <h4 className="text-gray-600 text-sm font-medium">
                    {metric.label}
                  </h4>
                  <div className="text-gray-900 mt-2">{metric.value}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No metrics available</div>
            )}
          </div>
        </BoxContent>
      </BoxAccordion>
      <DataList
        data={ListData}
        columns={Columns}
        showLinkButton={false}
        showSearchBar={true}
        showColumnToggle={true}
        showfilter={false}
      />
    </div>
  );
};

export default MarketPlace;
