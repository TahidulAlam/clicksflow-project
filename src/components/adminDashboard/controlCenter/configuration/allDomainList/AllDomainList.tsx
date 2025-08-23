// import React from "react";

// const AllDomainList = () => {
//   return <div>AllDomainList</div>;
// };

// export default AllDomainList;
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

// ✅ Example mock data
const domainData = [
  {
    id: 1,
    url: "https://example.com",
    type: "Affiliate",
    status: "Active",
  },
  {
    id: 2,
    url: "https://another.com",
    type: "Referral",
    status: "Paused",
  },
];

// ✅ Table columns
const domainColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    width: "80px",
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-gray-800 font-medium",
  },
  {
    header: "URL",
    accessor: "url",
    searchable: true,
    width: "260px",
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-blue-700 underline",
  },
  {
    header: "Type",
    accessor: "type",
    searchable: true,
    width: "140px",
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-purple-700 font-medium",
  },
  {
    header: "Status",
    accessor: "status",
    searchable: true,
    width: "120px",
    headerClassName: "text-xs text-gray-600 uppercase",
  },
];

// ✅ Component
const AllDomainList = () => {
  return (
    <div className="p-4">
      <DataList
        data={domainData}
        columns={domainColumns}
        showLinkButton={false}
        showSearchBar={true}
        showColumnToggle={false}
        showfilter={false}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default AllDomainList;
