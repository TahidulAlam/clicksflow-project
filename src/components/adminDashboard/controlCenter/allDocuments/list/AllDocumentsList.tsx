/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DataList from "@/components/shared/dataTable/DataList";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: any) => React.ReactNode;
}

interface MenuItem {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  labelHeader?: string;
  children?: MenuItem[];
  content?: React.ReactNode;
}

const documentData = [
  {
    id: 1,
    name: "Technical Guide",
    target: "Developers",
    description: "In-depth technical documentation",
    download: "https://example.com/documents/guide.pdf",
    createdAt: "2025-06-01",
    modifiedAt: "2025-07-15",
  },
  {
    id: 2,
    name: "Marketing Strategy",
    target: "Marketers",
    description: "Q3 strategic outline",
    download: "https://example.com/documents/strategy.pdf",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-10",
  },
  {
    id: 3,
    name: "Health & Safety",
    target: "All Employees",
    description: "Safety compliance policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 4,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 5,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 6,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 7,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 8,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 9,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 10,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 11,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 12,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 13,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 14,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
  {
    id: 15,
    name: "Feature",
    target: "All Employees",
    description: "Safety feature policies",
    download: "https://example.com/documents/safety.pdf",
    createdAt: "2025-06-20",
    modifiedAt: "2025-07-12",
  },
];

const documentColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "50px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Target", accessor: "target", searchable: true },
  {
    header: "Description",
    accessor: "description",
    searchable: true,
    width: "200px",
  },
  {
    header: "Download",
    accessor: "download",
    cell: (row) => (
      <a
        href={row.download}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Download
      </a>
    ),
  },
  { header: "Created at", accessor: "createdAt", searchable: true },
  { header: "Last modification", accessor: "modifiedAt", searchable: true },
  {
    header: "Action",
    accessor: "action",
    fixed: "right",
    width: "100px",
    cell: (row) => {
      const menuItems: MenuItem[] = [
        {
          label: "Edit",
          icon: <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />,
          onClick: () => toast.success(`Edit clicked for ID: ${row.id}`),
        },
        {
          label: "Delete",
          icon: <span className="w-2.5 h-2.5 rounded-full bg-red-500" />,
          onClick: () => toast.error(`Delete clicked for ID: ${row.id}`),
        },
      ];

      return (
        <div className="relative z-10">
          <MultiLevelDropdown
            label={<BsThreeDotsVertical />}
            labelClass="text-sm font-bold border-none shadow-none"
            position="bottom-right"
            menuItems={menuItems}
          />
        </div>
      );
    },
  },
];

const AllDocumentsList = () => {
  return (
    <div className="p-4">
      <DataList
        data={documentData}
        columns={documentColumns}
        showLinkButton={true}
        showSearchBar={true}
        showColumnToggle={false}
        showfilter={false}
        showPagination={true}
        // showRowCount={true}
      />
    </div>
  );
};

export default AllDocumentsList;
