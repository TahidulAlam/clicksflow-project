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

const conversionData = [
  {
    id: 1,
    partner: "John Doe",
    offer: "Offer A",
    level: "Level 1",
    method: "GET",
    postbackURL: "https://example.com/postback",
    htmlCode: "<script>console.log('pixel');</script>",
    descriptions: "Sample pixel for tracking conversions",
    created: "2025-04-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const conversionColumns: Column[] = [
  {
    header: "Pixel ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "100px",
  },
  { header: "Partner", accessor: "partner", searchable: true },
  { header: "Offer", accessor: "offer", searchable: true },
  { header: "Level", accessor: "level", searchable: true },
  { header: "Method", accessor: "method", searchable: true },
  {
    header: "Postback URL",
    accessor: "postbackURL",
    searchable: false,
    width: "200px",
  },
  {
    header: "HTML Code",
    accessor: "htmlCode",
    searchable: false,
    width: "200px",
  },
  {
    header: "Descriptions",
    accessor: "descriptions",
    searchable: false,
    width: "200px",
  },
  { header: "Created", accessor: "created", searchable: false, width: "200px" },
  { header: "Modified", accessor: "modified", searchable: false },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    cell: () => <button className="text-blue-600 hover:underline">Edit</button>,
    fixed: "right",
    width: "100px",
  },
];

const Conversion = () => {
  return (
    <DataList
      data={conversionData}
      columns={conversionColumns}
      addLinkLabel="+ Add Pixel"
      onAddClick={() => console.log("Add Pixel")}
    />
  );
};

export default Conversion;
