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

const ticketData = [
  {
    id: 1,
    subject: "Login issue",
    submittedBy: "Alice",
    status: "active",
    priority: "High",
    lastReply: "2h ago",
  },
  {
    id: 2,
    subject: "Payment failed",
    submittedBy: "Bob",
    status: "inactive",
    priority: "Medium",
    lastReply: "1d ago",
  },
  {
    id: 3,
    subject: "Feature request",
    submittedBy: "Charlie",
    status: "active",
    priority: "Low",
    lastReply: "3d ago",
  },
  {
    id: 4,
    subject: "Bug in dashboard",
    submittedBy: "David",
    status: "inactive",
    priority: "High",
    lastReply: "5h ago",
  },
  {
    id: 5,
    subject: "Unable to export report",
    submittedBy: "Eva",
    status: "active",
    priority: "Medium",
    lastReply: "6h ago",
  },
];

const ticketColumns: Column[] = [
  {
    header: "Subject",
    accessor: "subject",
    searchable: true,
  },
  {
    header: "Submitted By",
    accessor: "submittedBy",
    searchable: false,
  },
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
    header: "Priority",
    accessor: "priority",
  },
  {
    header: "Last Reply",
    accessor: "lastReply",
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
          onClick: () => toast.success(`Edit clicked for Ticket ID: ${row.id}`),
        },
        {
          label: "Delete",
          icon: <span className="w-2.5 h-2.5 rounded-full bg-red-500" />,
          onClick: () => toast.error(`Delete clicked for Ticket ID: ${row.id}`),
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

const SupportTickets = () => {
  return (
    <div>
      <DataList
        data={ticketData}
        columns={ticketColumns}
        showLinkButton={false}
        showSearchBar={false}
        showColumnToggle={false}
        showfilter={true}
        showPagination={false}
      />
    </div>
  );
};

export default SupportTickets;
