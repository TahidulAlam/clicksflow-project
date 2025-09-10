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

const payoutCapData = [
  {
    id: 1,
    offers: "Offer A",
    partners: "Partner X",
    clickCaps: 1000,
    conversionCaps: 200,
    payoutCaps: 5000,
    revenueCaps: 8000,
    created: "2025-01-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const payoutCapColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  { header: "Offers", accessor: "offers", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  { header: "Click Caps", accessor: "clickCaps", searchable: false },
  { header: "Conversion Caps", accessor: "conversionCaps", searchable: false },
  { header: "Payout Caps", accessor: "payoutCaps", searchable: false },
  { header: "Revenue Caps", accessor: "revenueCaps", searchable: false },
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

const Caps = () => (
  <DataList
    data={payoutCapData}
    columns={payoutCapColumns}
    showSearchBar={true}
    showColumnToggle={true}
    showfilter={true}
    pageSizeOptions={[5, 10, 20]}
    addLink="/admin/offers/custom-setting/caps/add"
    showLinkButton={true}
  />
);

export default Caps;
