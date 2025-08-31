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

const data = [
  {
    id: 1,
    name: "Control A",
    status: "Active",
    offers: "Offer 1, Offer 2",
    partners: "Partner X, Partner Y",
    controlAction: "Block Postback",
    controlCondition: "Clicks > 1000",
    effectiveBetween: "2025-01-01 to 2025-06-01",
    createdAt: "2025-01-01",
    action: "Edit",
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
    header: "Status",
    accessor: "status",
    searchable: true,
  },
  {
    header: "Offers",
    accessor: "offers",
    searchable: true,
  },
  {
    header: "Partners",
    accessor: "partners",
    searchable: true,
  },
  {
    header: "Control Action",
    accessor: "controlAction",
    searchable: true,
  },
  {
    header: "Control Condition",
    accessor: "controlCondition",
    searchable: true,
  },
  {
    header: "Effective Between",
    accessor: "effectiveBetween",
    searchable: false,
  },
  {
    header: "Created at",
    accessor: "createdAt",
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

const PostbackControlList = () => (
  <DataList
    data={data}
    columns={columns}
  />
);

export default PostbackControlList;
