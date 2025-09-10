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
const data = [
  {
    id: 1,
    name: "Advertiser ABC",
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

const AdvertiserKycPending = () => <DataList data={data} columns={columns} />;

export default AdvertiserKycPending;
