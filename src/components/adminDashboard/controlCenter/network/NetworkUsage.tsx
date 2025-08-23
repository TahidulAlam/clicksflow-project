/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import DataGrid from "@/components/shared/dataTable/DataGrid";
import React from "react";

type Column<T> = {
  header: string;
  accessor: string;
  searchable?: boolean;
  hidden?: boolean;
};

interface User {
  id: number;
  month: string;
  billableClicks: number;
  nonbillableClicks: number;
  billableImpressions: number;
  nonbillableImpressions: number;
}

type MenuItem<T> = {
  label: string;
  onClick: (row?: T) => void;
};

const columns: Column<User>[] = [
  { header: "ID", accessor: "id", searchable: true, hidden: true },
  { header: "Month", accessor: "month", searchable: true },
  { header: "Billable Clicks", accessor: "billableClicks", searchable: true },
  {
    header: "Non-Billable Clicks",
    accessor: "nonbillableClicks",
    searchable: true,
  },
  {
    header: "Billable Impressions",
    accessor: "billableImpressions",
    searchable: true,
  },
  {
    header: "Non-Billable Impressions",
    accessor: "nonbillableImpressions",
    searchable: true,
  },
];

const data: Record<string, unknown>[] = [
  {
    id: 1,
    month: "June, 2020",
    billableClicks: 20,
    nonbillableClicks: 20,
    billableImpressions: 20,
    nonbillableImpressions: 20,
  },
  {
    id: 2,
    month: "Feb, 2020",
    billableClicks: 10,
    nonbillableClicks: 0,
    billableImpressions: 0,
    nonbillableImpressions: 20,
  },
];

const NetworkUsage = () => {
  return (
    <div>
      <DataGrid
        data={data}
        columns={columns}
        showLinkButton={false}
        enableRowSelection={false}
        enableExport={false}
        showSearchBar={false}
        showColumnToggle={false}
        showFilter={false}
      />
    </div>
  );
};

export default NetworkUsage;
