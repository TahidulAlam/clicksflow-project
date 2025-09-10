/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

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
import { emailTemplates } from "@/config/emailTemplatesData";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";

type EmailTemplateRow = {
  id: number;
  name: string;
  enabled: boolean; // changed from action -> enabled (boolean toggle)
};
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
// initial data with toggle state
const initialData: EmailTemplateRow[] = emailTemplates.map((t) => ({
  id: t.id,
  name: t.name,
  enabled: false,
}));

const DefaultNotificationSettings = () => {
  const [rows, setRows] = useState<EmailTemplateRow[]>(initialData);

  // handle toggle change
  const handleToggle = (id: number, value: boolean) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, enabled: value } : row))
    );
  };

  const labelColumns: Column[] = [
    {
      header: "Name",
      width: "auto",
      accessor: "name",
      searchable: true,
      headerClassName: "text-xs text-gray-600 uppercase",
      cellClassName: "text-blue-700 font-medium",
    },
    {
      header: "Action",
      width: "auto",
      accessor: "enabled",
      headerClassName: "text-end",
      cellClassName: "",
      cell: (row: EmailTemplateRow) => (
        <div className="flex justify-end">
          <ToggleSwitch
            label="Email"
            checked={row.enabled}
            onChange={(val) => handleToggle(row.id, val)}
            aria-label={`Toggle ${row.name}`}
          />
        </div>
      ),
    },
  ];

  return (
    <DataList
      data={rows}
      columns={labelColumns}
      showLinkButton={true}
      addLinkIcon={<BsGlobeCentralSouthAsia />}
      addLink="/admin/control-center/configuration/notification-templates"
      showSearchBar={false}
      showColumnToggle={false}
      showfilter={false}
      pageSizeOptions={[10, 20, 50]}
    />
  );
};

export default DefaultNotificationSettings;
