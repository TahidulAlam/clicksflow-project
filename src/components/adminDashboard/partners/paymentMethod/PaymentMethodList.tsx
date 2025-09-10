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

const paymentMethodData = [
  {
    id: 1,
    name: "John Doe",
    partnerManager: "Manager A",
    paymentMethod: "Bank Transfer",
    methodInformation: "Bank: ABC Bank, Account: 123456789",
    action: "Edit",
  },
];

const paymentMethodColumns: Column[] = [
  {
    header: "Name",
    accessor: "name",
    searchable: true,
    fixed: "left",
  },
  {
    header: "Partner Manager",
    accessor: "partnerManager",
    searchable: true,
  },
  {
    header: "Payment Method",
    accessor: "paymentMethod",
    searchable: true,
  },
  {
    header: "Method Information",
    accessor: "methodInformation",
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

const PaymentMethodList = () => (
  <DataList data={paymentMethodData} columns={paymentMethodColumns} />
);

export default PaymentMethodList;
