/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";

import DataList from "@/components/shared/dataTable/DataList";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";

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

interface MenuItem {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  labelHeader?: string;
  children?: MenuItem[];
  content?: React.ReactNode;
}

const labelData = [
  {
    id: 1,
    name: "nxt",
    createdAt: "2025-05-17 04:09 PM",
    modifiedAt: "2025-05-17 04:09 PM",
  },
];

const labelColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    width: "80px",
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-gray-800 font-medium",
  },
  {
    header: "Name",
    accessor: "name",
    searchable: true,
    width: "160px",
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-blue-800 font-semibold",
  },
  {
    header: "Create",
    accessor: "createdAt",
    searchable: true,
    width: "200px",
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-green-700",
  },
  {
    header: "Modified",
    accessor: "modifiedAt",
    searchable: true,
    width: "200px",
    headerClassName: "text-xs text-gray-600 !uppercase",
    cellClassName: "text-yellow-700",
  },
  {
    header: "Action",
    accessor: "action",
    width: "100px",
    headerClassName: "text-xs text-gray-600 uppercase text-center",
    cellClassName: "text-center",
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
        <div className="relative flex justify-center">
          <MultiLevelDropdown
            label={<BsThreeDotsVertical />}
            labelClass="text-sm font-bold border-none shadow-none"
            position="bottom-right"
            menuClassName="z-[9999]"
            menuItems={menuItems}
          />
        </div>
      );
    },
  },
];

const AllLabelsList = () => {
  return (
    <div className="p-4">
      <DataList
        data={labelData}
        columns={labelColumns}
        showLinkButton={true}
        showSearchBar={true}
        showColumnToggle={false}
        showfilter={false}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default AllLabelsList;
