("use client");

/* eslint-disable @typescript-eslint/no-explicit-any */

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

const data = [
  {
    id: 1,
    name: "Advertiser ABC",
    registeredAt: "2025-01-01",
    modifiedAt: "2025-01-10",
    kycStatus: "Pending",
    action: "Review",
  },
  {
    id: 2,
    name: "Advertiser EFG",
    registeredAt: "2025-01-01",
    modifiedAt: "2025-01-10",
    kycStatus: "Pending",
    action: "Review",
  },
];

const columns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "60px",
  },
  {
    header: "Name",
    accessor: "name",
    searchable: true,
  },
  {
    header: "Registered at",
    accessor: "registeredAt",
    searchable: false,
  },
  {
    header: "Modified at",
    accessor: "modifiedAt",
    searchable: false,
  },
  {
    header: "KYC Status",
    accessor: "kycStatus",
    searchable: true,
  },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const AdvertiserKycVerified = () => (
  <DataList data={data} columns={columns} addLinkLabel="+ Add Advertiser" />
);

export default AdvertiserKycVerified;
