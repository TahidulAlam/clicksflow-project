"use client";

import React from "react";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";

import DataList from "@/components/shared/dataTable/DataList";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
import { emailTemplates } from "@/config/emailTemplatesData";

type EmailTemplateRow = {
  id: number;
  name: string;
  subject: string;
  action: string;
};

interface MenuItem {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  labelHeader?: string;
  children?: MenuItem[];
  content?: React.ReactNode;
}

const labelData: EmailTemplateRow[] = emailTemplates.map((t) => ({
  id: t.id,
  name: t.name,
  subject: t.subject,
  action: "",
}));

const labelColumns = [
  {
    header: "Name",
    width: "auto",
    accessor: "name",
    searchable: true,
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-blue-700 font-medium",
    cell: (row: EmailTemplateRow) => (
      <Link
        href={`/admin/control/configuration/notification/template/edit/${row.id}`}
        className="hover:underline text-blue-700"
      >
        {row.name}
      </Link>
    ),
  },
  {
    header: "Subject",
    accessor: "subject",
    searchable: true,
    width: "auto",
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-gray-800 text-start  whitespace-none",
  },
  {
    header: "Action",
    width: "auto",
    accessor: "action",
    headerClassName: "text-end",
    headerButtonClassName: "flex justify-end",
    cellClassName: "",
    cell: (row: EmailTemplateRow) => {
      const menuItems: MenuItem[] = [
        {
          label: (
            <Link
              href={`/admin/control/configuration/notification/template/edit/${row.id}`}
              className="flex items-end gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              Edit
            </Link>
          ),
        },
      ];

      return (
        <div className="relative flex justify-end cursor-pointer">
          <MultiLevelDropdown
            label={<BsThreeDotsVertical />}
            labelClass="text-sm font-bold border-none shadow-none cursor-pointer"
            position="bottom-right"
            menuClassName="z-[9999]"
            menuItems={menuItems}
          />
        </div>
      );
    },
  },
];

const EmailTemplate = () => {
  return (
    <DataList
      data={labelData}
      columns={labelColumns}
      showLinkButton={true}
      addLinkLabel="Global Notification Template"
      showSearchBar={false}
      showColumnToggle={false}
      showfilter={false}
      pageSizeOptions={[10, 20, 50]}
    />
  );
};

export default EmailTemplate;
