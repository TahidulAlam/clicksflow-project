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

const categoryData = [
  {
    id: 1,
    name: "Technology",
    slug: "technology",
    status: "Active",
    createdAt: "2025-06-01",
    modifiedAt: "2025-07-15",
  },
  {
    id: 2,
    name: "Business",
    slug: "business",
    status: "Inactive",
    createdAt: "2025-06-05",
    modifiedAt: "2025-07-10",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
  {
    id: 3,
    name: "Health",
    slug: "health",
    status: "Active",
    createdAt: "2025-06-10",
    modifiedAt: "2025-07-12",
  },
];

const categoryColumns: Column[] = [
  { header: "ID", accessor: "id", searchable: true },
  { header: "Category Name", accessor: "name", searchable: true },
  { header: "Slug", accessor: "slug", searchable: true },
  { header: "Status", accessor: "status", searchable: true },
  { header: "Created At", accessor: "createdAt", searchable: true },
  { header: "Modified At", accessor: "modifiedAt", searchable: true },
  {
    header: "Action",
    accessor: "action",
    fixed: "right",
    cell: (row) => {
      const menuItems: MenuItem[] = [
        {
          label: "Edit",
          icon: <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />,
          onClick: () => toast.success(`Edit clicked for ID: ${row.id}`),
        },
      ];

      return (
        <div className="z-50">
          <MultiLevelDropdown
            label={
              <>
                <BsThreeDotsVertical />
              </>
            }
            labelClass="text-sm font-bold border-none shadow-none -z-10 bg-none"
            position="bottom-right"
            menuClassName="z-50"
            menuItems={menuItems}
          />
        </div>
      );
    },
  },
];

const AllCategoriesList = () => {
  return (
    <div className="p-4">
      <DataList
        data={categoryData}
        columns={categoryColumns}
        showLinkButton={true}
        showSearchBar={true}
        showColumnToggle={false}
        showfilter={false}
      />
    </div>
  );
};

export default AllCategoriesList;
