// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// const DataList = dynamic(
//   () => import("@/components/shared/dataTable/DataList"),
//   {
//     ssr: false,
//     loading: () => (
//       <DataListSkeleton rows={5} columns={12} showToolbar={true} />
//     ),
//   }
// );
// interface Column {
//   header: string;
//   accessor: string;
//   searchable?: boolean;
//   fixed?: "left" | "right";
//   width?: string;
//   cell?: (row: any) => React.ReactNode;
//   headerClassName?: string;
//   cellClassName?: string;
// }
// const trafficBlockingData = [
//   {
//     id: 1,
//     partner: "Partner A",
//     offer: "Offer X",
//     sub1: "Value 1",
//     sub2: "Value 2",
//     sub3: "Value 3",
//     sub4: "Value 4",
//     sub5: "Value 5",
//     sourceId: "SRC123",
//     createdAt: "2025-05-10",
//     lastModification: "2025-05-18",
//     action: "Block",
//   },
// ];

// const trafficBlockingColumns: Column[] = [
//   {
//     header: "ID",
//     accessor: "id",
//     searchable: false,
//     fixed: "left",
//     width: "60px",
//   },
//   {
//     header: "Partner",
//     accessor: "partner",
//     searchable: true,
//   },
//   {
//     header: "Offer",
//     accessor: "offer",
//     searchable: true,
//   },
//   {
//     header: "Sub1",
//     accessor: "sub1",
//     searchable: true,
//   },
//   {
//     header: "Sub2",
//     accessor: "sub2",
//     searchable: true,
//   },
//   {
//     header: "Sub3",
//     accessor: "sub3",
//     searchable: true,
//   },
//   {
//     header: "Sub4",
//     accessor: "sub4",
//     searchable: true,
//   },
//   {
//     header: "Sub5",
//     accessor: "sub5",
//     searchable: true,
//   },
//   {
//     header: "Source ID",
//     accessor: "sourceId",
//     searchable: true,
//   },
//   {
//     header: "Created At",
//     accessor: "createdAt",
//     searchable: false,
//   },
//   {
//     header: "Last Modification",
//     accessor: "lastModification",
//     searchable: false,
//   },
//   {
//     header: "Action",
//     accessor: "action",
//     searchable: false,
//     fixed: "right",
//     width: "100px",
//   },
// ];

// const TrafficBlockingList = () => (
//   <DataList
//     data={trafficBlockingData}
//     columns={trafficBlockingColumns}
//   />
// );

// export default TrafficBlockingList;

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";

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

// Static mock data
const trafficBlockingData = [
  {
    id: 1,
    partner: "Partner A",
    offer: "Offer X",
    sub1: "Value 1",
    sub2: "Value 2",
    sub3: "Value 3",
    sub4: "Value 4",
    sub5: "Value 5",
    sourceId: "SRC123",
    createdAt: "2025-05-10",
    lastModification: "2025-05-18",
    action: "Block",
  },
];

// Columns definition (can stay as plain constant since it’s static)
const trafficBlockingColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: false,
    fixed: "left",
    width: "60px",
  },
  { header: "Partner", accessor: "partner", searchable: true },
  { header: "Offer", accessor: "offer", searchable: true },
  { header: "Sub1", accessor: "sub1", searchable: true },
  { header: "Sub2", accessor: "sub2", searchable: true },
  { header: "Sub3", accessor: "sub3", searchable: true },
  { header: "Sub4", accessor: "sub4", searchable: true },
  { header: "Sub5", accessor: "sub5", searchable: true },
  { header: "Source ID", accessor: "sourceId", searchable: true },
  { header: "Created At", accessor: "createdAt", searchable: false },
  {
    header: "Last Modification",
    accessor: "lastModification",
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

const TrafficBlockingList = () => (
  <div>
    <DataList data={trafficBlockingData} columns={trafficBlockingColumns} />
  </div>
);

export default TrafficBlockingList;
