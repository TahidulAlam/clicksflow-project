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

const trafficData = [
  {
    id: 1,
    name: "Control Rule 1",
    offers: "Offer A",
    partners: "Partner X",
    controlAction: "Pause",
    effectiveBetween: "2025-01-01 to 2025-01-31",
    createdAt: "2025-01-01",
    action: "Edit",
  },
];

const trafficColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Offers", accessor: "offers", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  { header: "Control Action", accessor: "controlAction", searchable: true },
  {
    header: "Effective Between",
    accessor: "effectiveBetween",
    searchable: false,
  },
  { header: "Created at", accessor: "createdAt", searchable: false },
  { header: "Action", accessor: "action", searchable: false, fixed: "left" },
];

const TrafficControlList = () => (
  <DataList
    // title="Traffic Controls"
    data={trafficData}
    columns={trafficColumns}
    addLinkLabel="+ Add Traffic Control"
    onAddClick={() => console.log("Add new rule")}
  />
);

export default TrafficControlList;
