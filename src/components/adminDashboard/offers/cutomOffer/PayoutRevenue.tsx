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

const payoutData = [
  {
    id: 1,
    name: "Revenue Campaign",
    offer: "Offer Z",
    partners: "Partner A",
    description: "Internal notes",
    publicDescription: "Visible to users",
    event: "Purchase",
    revenue: 200,
    payout: 120,
    firePostback: true,
    effectiveBetween: "2025-01-01 to 2025-12-31",
    created: "2025-01-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const payoutColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Offer", accessor: "offer", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  { header: "Description", accessor: "description", searchable: true },
  {
    header: "Public Description",
    accessor: "publicDescription",
    searchable: true,
  },
  { header: "Event", accessor: "event", searchable: true },
  { header: "Revenue", accessor: "revenue", searchable: false },
  { header: "Payout", accessor: "payout", searchable: false },
  { header: "Fire Postback", accessor: "firePostback", searchable: false },
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

const PayoutRevenue = () => (
  <DataList
    data={payoutData}
    columns={payoutColumns}
    showSearchBar={true}
    showColumnToggle={true}
    showfilter={true}
    pageSizeOptions={[5, 10, 20]}
    addLink="/admin/offers/custom-setting/payout-revenue/add"
    showLinkButton={true}
  />
);

export default PayoutRevenue;
