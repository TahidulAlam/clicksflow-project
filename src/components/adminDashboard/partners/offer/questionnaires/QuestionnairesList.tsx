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

const questionnairesData = [
  {
    id: 2,
    name: "Questionnaire Pro",
    associatedOffers: 0,
    createdAt: "2025-04-24 01:18 PM",
    lastModified: "2025-04-24 01:18 PM",
    action: "Edit",
  },
  {
    id: 1,
    name: "What traffic type will you use to promote?",
    associatedOffers: 0,
    createdAt: "2025-04-24 01:15 PM",
    lastModified: "2025-04-24 01:15 PM",
    action: "Edit",
  },
];

const questionnairesColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "60px",
  },
  {
    header: "Name",
    accessor: "name",
    searchable: true,
  },
  {
    header: "Associated Offer(s)",
    accessor: "associatedOffers",
    searchable: false,
  },
  {
    header: "Date created",
    accessor: "createdAt",
    searchable: false,
  },
  {
    header: "Last modification",
    accessor: "lastModified",
    searchable: false,
  },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
    cell: (row: { id: number; action: string }) => (
      <button
        className="text-blue-600 underline hover:text-blue-800"
        onClick={() => console.log(`Editing questionnaire ID ${row.id}`)}
      >
        {row.action}
      </button>
    ),
  },
];

const QuestionnairesList = () => (
  <DataList data={questionnairesData} columns={questionnairesColumns} />
);

export default QuestionnairesList;
