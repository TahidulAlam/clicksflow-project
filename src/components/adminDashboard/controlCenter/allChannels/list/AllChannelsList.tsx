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
  { id: 1, name: "User Onboarding Guide", status: "active" },
  { id: 2, name: "Quarterly Sales Report", status: "inactive" },
  { id: 3, name: "Company Policy Manual", status: "active" },
  { id: 4, name: "Release Notes v2.0", status: "inactive" },
  { id: 5, name: "Technical Whitepaper", status: "active" },
  { id: 6, name: "Team Training Schedule", status: "inactive" },
  { id: 7, name: "Security Checklist", status: "active" },
  { id: 8, name: "Client Feedback Summary", status: "inactive" },
  { id: 9, name: "Bug Report Log", status: "active" },
  { id: 10, name: "Performance Review Sheet", status: "inactive" },
  { id: 11, name: "Holiday Calendar", status: "active" },
  { id: 12, name: "Travel Reimbursement Policy", status: "inactive" },
  { id: 13, name: "Brand Guidelines", status: "active" },
  { id: 14, name: "Website Analytics Report", status: "inactive" },
  { id: 15, name: "Product Roadmap", status: "active" },
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
  {
    header: "Status",
    accessor: "status",
    searchable: true,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            row.status === "active" ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <span className="capitalize text-sm">{row.status}</span>
      </div>
    ),
  },
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

const AllChannelsList = () => {
  return (
    <div>
      <DataList
        data={documentData}
        columns={documentColumns}
        showLinkButton={true}
        showSearchBar={true}
        showColumnToggle={false}
        showfilter={false}
        showPagination={true}
      />
    </div>
  );
};

export default AllChannelsList;
