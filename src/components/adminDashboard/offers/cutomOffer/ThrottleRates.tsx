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

const payoutThrottleData = [
  {
    id: 1,
    name: "Throttle Rule 1",
    offers: "Offer A",
    partners: "Partner X",
    conversionStatus: "Enabled",
    throttlePercentage: 30,
    effectiveBetween: "2025-01-01 to 2025-12-31",
    created: "2025-01-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const payoutThrottleColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Offers", accessor: "offers", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  {
    header: "Conversion Status",
    accessor: "conversionStatus",
    searchable: true,
  },
  {
    header: "Throttle Percentage",
    accessor: "throttlePercentage",
    searchable: false,
  },
  {
    header: "Effective Between",
    accessor: "effectiveBetween",
    searchable: false,
  },
  { header: "Created", accessor: "created", searchable: false },
  { header: "Modified", accessor: "modified", searchable: false },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const ThrottleRates = () => (
  <DataList
    data={payoutThrottleData}
    columns={payoutThrottleColumns}
    showSearchBar={true}
    showColumnToggle={true}
    showfilter={true}
    pageSizeOptions={[5, 10, 20]}
    addLink="/admin/offers/custom-setting/throttle-rate/add"
    showLinkButton={true}
  />
);

export default ThrottleRates;
