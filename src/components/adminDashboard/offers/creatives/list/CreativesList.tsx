/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

const data = [
  {
    id: 1,
    name: "Creative 1",
    type: "Banner",
    isPrivate: false,
    preview: "Preview Link",
    download: "Download Link",
    dateCreated: "2025-01-01",
    dateModified: "2025-01-10",
    action: "Edit",
  },
];
const columns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "60px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Type", accessor: "type", searchable: true },
  { header: "Is Private", accessor: "isPrivate", searchable: false },
  { header: "Preview", accessor: "preview", searchable: false },
  { header: "Download", accessor: "download", searchable: false },
  { header: "Date Created", accessor: "dateCreated", searchable: false },
  { header: "Date Modified", accessor: "dateModified", searchable: false },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const CreativesList = () => (
  <DataList
    // title="Traffic Controls"
    data={data}
    columns={columns}
    showSearchBar={true}
    showColumnToggle={true}
    addLink="/admin/offers/creative/add"
  />
);

export default CreativesList;
