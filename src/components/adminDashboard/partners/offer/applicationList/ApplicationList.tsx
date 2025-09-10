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

const applicationData = [
  {
    id: 1,
    offer: "Offer X",
    partner: "Partner A",
    advertiser: "Advertiser Z",
    partnerManager: "Manager X",
    questionnaire: "Submitted",
    requestedAt: "2025-05-15",
    lastUpdate: "2025-05-17",
    action: "Review",
  },
];

const applicationColumns: Column[] = [
  {
    header: "Offer",
    accessor: "offer",
    searchable: true,
    fixed: "left",
  },
  {
    header: "Partner",
    accessor: "partner",
    searchable: true,
  },
  {
    header: "Advertiser",
    accessor: "advertiser",
    searchable: true,
  },
  {
    header: "Partner Manager",
    accessor: "partnerManager",
    searchable: true,
  },
  {
    header: "Questionnaire",
    accessor: "questionnaire",
    searchable: true,
  },
  {
    header: "Requested at",
    accessor: "requestedAt",
    searchable: false,
  },
  {
    header: "Last update",
    accessor: "lastUpdate",
    searchable: false,
  },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const ApplicationList = () => (
  <DataList data={applicationData} columns={applicationColumns} />
);

export default ApplicationList;
