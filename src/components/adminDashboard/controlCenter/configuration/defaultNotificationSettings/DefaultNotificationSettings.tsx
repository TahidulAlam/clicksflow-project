"use client";

import React, { useState } from "react";

import DataList from "@/components/shared/dataTable/DataList";
import { emailTemplates } from "@/config/emailTemplatesData";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";

type EmailTemplateRow = {
  id: number;
  name: string;
  enabled: boolean; // changed from action -> enabled (boolean toggle)
};

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

  const labelColumns = [
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
      headerButtonClassName: "flex justify-end",
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
      addLinkLabel="Global Notification Template"
      showSearchBar={false}
      showColumnToggle={false}
      showfilter={false}
      pageSizeOptions={[10, 20, 50]}
    />
  );
};

export default DefaultNotificationSettings;
