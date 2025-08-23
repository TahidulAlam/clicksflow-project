/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataList from "@/components/shared/dataTable/DataList";

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
    addLinkLabel="+ Add Cap Rule"
    onAddClick={() => console.log("Add cap rule")}
  />
);

export default Caps;
