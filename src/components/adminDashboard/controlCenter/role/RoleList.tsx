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
}

const roleData = [
  {
    id: 1,
    name: "Login History",
    totalStaff: 1,
    status: "Active",
    created: "2025-05-13, 10:15 AM",
    modified: "2025-05-13, 10:15 AM",
  },
  {
    id: 2,
    name: "Login History",
    totalStaff: 1,
    status: "Active",
    created: "2025-05-13, 10:15 AM",
    modified: "2025-05-13, 10:15 AM",
  },
  {
    id: 3,
    name: "Login History",
    totalStaff: 1,
    status: "Active",
    created: "2025-05-13, 10:15 AM",
    modified: "2025-05-13, 10:15 AM",
  },
  {
    id: 4,
    name: "Login History",
    totalStaff: 1,
    status: "Active",
    created: "2025-05-13, 10:15 AM",
    modified: "2025-05-13, 10:15 AM",
  },
  {
    id: 5,
    name: "Login History",
    totalStaff: 1,
    status: "Active",
    created: "2025-05-13, 10:15 AM",
    modified: "2025-05-13, 10:15 AM",
  },
];

const roleColumns: Column[] = [
  { header: "ID", accessor: "id", searchable: true },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Total Staff", accessor: "totalStaff", searchable: true },
  { header: "Status", accessor: "status", searchable: true },
  { header: "Created", accessor: "created", searchable: true },
  { header: "Modified", accessor: "modified", searchable: true },
  {
    header: "Action",
    accessor: "action",
    cell: (row) => (
      <div className="flex gap-2">
        <button
          className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => console.log("Edit clicked", row)}
        >
          Edit
        </button>
        <button
          className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => console.log("Delete clicked", row)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

const RoleList = () => {
  return (
    <div>
      <DataList
        title="Role List"
        data={roleData}
        columns={roleColumns}
        showLinkButton={true}
        showSearchBar={false}
        showColumnToggle={false}
        showfilter={false}
      />
    </div>
  );
};

export default RoleList;
