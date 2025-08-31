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
const advertisersData = [
  {
    id: 1,
    name: "ACME Corp",
    accountManager: "Alice Smith",
    salesManager: "Bob Johnson",
    labels: "High Priority, Finance",
    todaysRevenue: "$1,200",
    todaysPayout: "$600",
    action: "Edit",
  },
];

const advertisersColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  {
    header: "Name",
    accessor: "name",
    searchable: true,
    fixed: "left",
  },
  {
    header: "Account Manager",
    accessor: "accountManager",
    searchable: true,
  },
  {
    header: "Sales Manager",
    accessor: "salesManager",
    searchable: true,
  },
  {
    header: "Labels",
    accessor: "labels",
    searchable: true,
  },
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
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const AdvertisersList = () => (
  <DataList
    data={advertisersData}
    columns={advertisersColumns}
  />
);

export default AdvertisersList;
