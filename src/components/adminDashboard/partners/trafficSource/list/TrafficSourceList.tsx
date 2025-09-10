/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React from "react";
// import DataList from "@/components/shared/dataTable/DataList";

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
// const data = [{}];

// const columns: Column[] = [
//   {
//     header: "ID",
//     accessor: "id",
//     width: "60px",
//     fixed: "left",
//   },
//   {
//     header: "Name",
//     accessor: "name",
//     width: "250px",
//   },
//   {
//     header: "Postback URL",
//     accessor: "postbackUrl",
//     width: "400px",
//   },
//   {
//     header: "Tracking Parameters",
//     accessor: "trackingParameters",
//     width: "300px",
//   },
//   {
//     header: "Action",
//     accessor: "action",
//     width: "120px",
//     fixed: "right",
//   },
// ];

// const TrafficSourceList = () => {
//   return (
//     <div>
//       <DataList data={data} columns={columns} />
//     </div>
//   );
// };

// export default TrafficSourceList;

"use client";

import DataListSkeleton from "@/components/shared/skeleton/DataListSkeleton";
import dynamic from "next/dynamic";
import React from "react";

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

const data: any[] = [];

const columns: Column[] = [
  { header: "ID", accessor: "id", width: "60px", fixed: "left" },
  { header: "Name", accessor: "name", width: "250px" },
  { header: "Postback URL", accessor: "postbackUrl", width: "400px" },
  {
    header: "Tracking Parameters",
    accessor: "trackingParameters",
    width: "300px",
  },
  { header: "Action", accessor: "action", width: "120px", fixed: "right" },
];

const TrafficSourceList = () => {
  return (
    <div>
      <DataList data={data} columns={columns} />
    </div>
  );
};

export default TrafficSourceList;
