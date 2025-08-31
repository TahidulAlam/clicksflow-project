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

const kycData = [
  {
    id: 1,
    name: "John Doe",
    accountManager: "Manager X",
    salesExecutive: "Executive Y",
    registeredAt: "2025-04-01",
    modifiedAt: "2025-05-01",
    download: "Download",
    action: "Edit",
  },
];

const kycColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Account Manager", accessor: "accountManager", searchable: true },
  { header: "Sales Executive", accessor: "salesExecutive", searchable: true },
  { header: "Registered at", accessor: "registeredAt", searchable: false },
  { header: "Modified at", accessor: "modifiedAt", searchable: false },
  {
    header: "Download",
    accessor: "download",
    searchable: false,
    cell: () => (
      <button className="text-blue-600 hover:underline">Download</button>
    ),
  },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    cell: () => <button className="text-blue-600 hover:underline">Edit</button>,
    fixed: "right",
    width: "100px",
  },
];

const KycList = () => (
  <DataList
    data={kycData}
    columns={kycColumns}
  />
);

export default KycList;
