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

const scheduledActionsData = [
  {
    id: 1,
    type: "Backup",
    status: "Pending",
    internalNotes: "Full DB backup",
    createdBy: "Admin",
    scheduledTime: "2025-07-20, 03:00 PM / UTC+6",
    createdAt: "2025-07-17, 10:00 AM",
    modifiedAt: "2025-07-17, 11:30 AM",
  },
  {
    id: 2,
    type: "Maintenance",
    status: "Completed",
    internalNotes: "Server upgrade",
    createdBy: "DevOps",
    scheduledTime: "2025-07-16, 02:00 AM / UTC+6",
    createdAt: "2025-07-14, 09:00 AM",
    modifiedAt: "2025-07-16, 04:00 AM",
  },
  {
    id: 3,
    type: "Report Generation",
    status: "In Progress",
    internalNotes: "Weekly analytics",
    createdBy: "Analyst",
    scheduledTime: "2025-07-19, 06:00 PM / UTC+6",
    createdAt: "2025-07-15, 12:00 PM",
    modifiedAt: "2025-07-15, 01:00 PM",
  },
  {
    id: 4,
    type: "Deployment",
    status: "Scheduled",
    internalNotes: "v2.5 frontend update",
    createdBy: "Engineer",
    scheduledTime: "2025-07-21, 11:00 AM / UTC+6",
    createdAt: "2025-07-16, 08:30 AM",
    modifiedAt: "2025-07-16, 09:00 AM",
  },
  {
    id: 5,
    type: "Security Scan",
    status: "Failed",
    internalNotes: "Scan aborted",
    createdBy: "Security",
    scheduledTime: "2025-07-18, 01:00 AM / UTC+6",
    createdAt: "2025-07-14, 07:00 AM",
    modifiedAt: "2025-07-14, 07:30 AM",
  },
];

const scheduledActionColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
  },
  {
    header: "Type / Status",
    accessor: "type",
    searchable: true,
    cell: (row) => (
      <div>
        <div className="font-medium">{row.type}</div>
        <div className="text-xs text-gray-500">{row.status}</div>
      </div>
    ),
  },
  {
    header: "Internal Notes",
    accessor: "internalNotes",
    searchable: true,
  },
  {
    header: "Created By",
    accessor: "createdBy",
    searchable: true,
  },
  {
    header: "Scheduled Time / Timezone",
    accessor: "scheduledTime",
    searchable: true,
    width: "250px",
  },
  {
    header: "Created at / Last Modification",
    accessor: "createdAt",
    searchable: true,
    width: "250px",
    cell: (row) => (
      <div>
        <div>{row.createdAt}</div>
        <div className="text-xs text-gray-500">{row.modifiedAt}</div>
      </div>
    ),
  },
  {
    header: "Action",
    accessor: "id",
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

const ScheduledActionList = () => {
  return (
    <div>
      <DataList
        title="Scheduled Actions"
        data={scheduledActionsData}
        columns={scheduledActionColumns}
        showLinkButton={true}
        showSearchBar={true}
        showColumnToggle={false}
        showfilter={false}
      />
    </div>
  );
};

export default ScheduledActionList;
