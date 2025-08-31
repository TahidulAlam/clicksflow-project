/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
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

const eventData: Record<string, string | number | boolean | null>[] = [];
const eventColumns: Column[] = [
  { header: "Pixel ID", accessor: "id", searchable: true },
  { header: "Partner", accessor: "partner", searchable: true },
  { header: "Offer", accessor: "offer", searchable: true },
  { header: "Event", accessor: "event", searchable: true },
  { header: "Level", accessor: "level", searchable: true },
  { header: "Method", accessor: "method", searchable: true },
  { header: "Postback URL", accessor: "postbackURL", searchable: false },
  { header: "Descriptions", accessor: "descriptions", searchable: false },
  { header: "Created", accessor: "created", searchable: false },
  { header: "Modified", accessor: "modified", searchable: false },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    cell: () => <button className="text-blue-600 hover:underline">Edit</button>,
  },
];

const Event = () => {
  return (
    <DataList
      data={eventData}
      columns={eventColumns}
      addLinkLabel="+ Add Event"
      // emptyMessage="Data not found."
    />
  );
};

export default Event;
