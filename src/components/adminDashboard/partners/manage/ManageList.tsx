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

const partnerData = [
  {
    id: 1,
    name: "Partner A",
    country: "Bangladesh",
    email: "partnera@example.com",
    partnerManager: "Manager X",
    referredBy: "Referral Code 123",
    todaysRevenue: 250,
    todaysPayout: 125,
    paymentMethod: "Bank Transfer",
    isPayable: true,
    created: "2025-05-01",
    action: "Edit",
  },
];

const partnerColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Country", accessor: "country", searchable: true },
  { header: "Email", accessor: "email", searchable: true },
  { header: "Partner Manager", accessor: "partnerManager", searchable: true },
  { header: "Referred By", accessor: "referredBy", searchable: true },
  {
    header: "Today's Revenue",
    accessor: "todaysRevenue",
    searchable: false,
  },
  {
    header: "Today's Payout",
    accessor: "todaysPayout",
    searchable: false,
  },
  { header: "Payment Method", accessor: "paymentMethod", searchable: true },
  {
    header: "Is Payable",
    accessor: "isPayable",
    searchable: false,
    cell: (row: { isPayable: boolean }) => (
      <span className={row.isPayable ? "text-green-600" : "text-red-600"}>
        {row.isPayable ? "Yes" : "No"}
      </span>
    ),
  },
  { header: "Created", accessor: "created", searchable: false },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const ManageList = () => (
  <DataList data={partnerData} columns={partnerColumns} />
);

export default ManageList;
