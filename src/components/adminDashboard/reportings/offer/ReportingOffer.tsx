/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DataFilterTable from "@/components/shared/dataFilterTable/DataFilterTable";

// Define types if not exported from DataFilterTable
interface MenuItem {
  label: string;
  labelHeader?: React.ReactNode;
  depthHeader?: React.ReactNode;
  onClick?: () => void;
  children?: MenuItem[];
  parentKey?: string;
}

interface Metric {
  label: string;
  value: string | number;
}

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: any) => React.ReactNode;
}

// Invoice data
const InvoiceListData = [
  {
    id: 1,
    invoiceId: "INV-001",
    advertiser: "Partner A",
    status: "Pending",
    advertiserVisibility: "Private",
    paymentTerms: "Net 30",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    amount: "$1,200.00",
    publicNotes: "Expected to clear within 30 days",
    internalNotes: "Partner has good history",
    dateCreated: "2025-05-01",
    lastModified: "2025-05-20",
    action: "Review",
  },
];

// Invoice table columns
const invoiceColumns: Column[] = [
  {
    header: "Invoice ID",
    accessor: "invoiceId",
    searchable: true,
    fixed: "left",
  },
  {
    header: "Advertiser",
    accessor: "advertiser",
    searchable: true,
  },
  {
    header: "Status",
    accessor: "status",
    searchable: true,
  },
  {
    header: "Advertiser Visibility",
    accessor: "advertiserVisibility",
    searchable: true,
  },
  {
    header: "Payment Terms",
    accessor: "paymentTerms",
    searchable: true,
  },
  {
    header: "Time Period",
    accessor: "timePeriod",
    searchable: false,
    cell: (row: any) => `${row.startDate} to ${row.endDate}`,
  },
  {
    header: "Amount",
    accessor: "amount",
    searchable: false,
  },
  {
    header: "Public Notes",
    accessor: "publicNotes",
    searchable: true,
    width: "200px",
  },
  {
    header: "Internal Notes",
    accessor: "internalNotes",
    searchable: true,
  },
  {
    header: "Date Created",
    accessor: "dateCreated",
    searchable: false,
  },
  {
    header: "Last Modification",
    accessor: "lastModified",
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

// Metrics for the summary accordion
const metrics: Metric[] = [
  { label: "Impressions", value: 0 },
  { label: "Gross Clicks", value: 0 },
  { label: "Clicks", value: 0 },
  { label: "Total CV", value: 0 },
  { label: "VT CV", value: "0.00%" },
  { label: "CTR", value: "0.00%" },
  { label: "Events", value: 0 },
  { label: "CVR", value: "0.00%" },
  { label: "CPC", value: "$0.00" },
  { label: "CPA", value: "$0.00" },
  { label: "RPC", value: "$0.00" },
  { label: "CPM", value: "$0.00" },
  { label: "RPM", value: "$0.00" },
  { label: "RPA", value: "$0.00" },
  { label: "Payout", value: "$0.00" },
  { label: "Revenue", value: "$0.00" },
  { label: "Profit", value: "$0.00" },
  { label: "Margin", value: "0.00%" },
  { label: "Avg. Sale Value", value: "$0.00" },
  { label: "Gross Sales", value: "$0.00" },
];

// Filter menu items
const rawMenuItems: MenuItem[] = [
  {
    labelHeader: "Table Actions",
    label: "Filter",
    children: [
      {
        label: "Offer",
        children: [
          { label: "IdentityIQ Credit Essentials (US) $1 Trial (1)" },
          { label: "IdentityIQ Credit Score - $1 Trial (US) (2)" },
          { label: "ScoreCasterIQ (CTQ) - $34.99 - Non-Incent (3)" },
          {
            label:
              "IdentityIQ Credit Essentials - US $1 Trial - Lifestyle Lander (4)",
          },
          { label: "Credit Score Hero - $1 - 7 Days Trial (US) (5)" },
          { label: "Credit Score Hero V2 - 17 Days Trial (US) (6)" },
        ],
      },
      {
        label: "Advertiser",
        children: [
          { label: "OneClick Media Group" },
          { label: "CreditGenie LLC" },
          { label: "DigitalIQ Solutions" },
          { label: "LeadScore Partners" },
        ],
      },
      {
        label: "Partner",
        children: [
          { label: "JohnDoe Affiliate (ID 102)" },
          { label: "JaneSmith Marketing (ID 204)" },
          { label: "TopLead Partners (ID 311)" },
        ],
      },
      {
        label: "Offer Group",
        children: [
          { label: "Financial Trials - US" },
          { label: "Incent Offers - Global" },
          { label: "Credit Repair Offers" },
        ],
      },
      {
        label: "Smart Link",
        children: [
          { label: "SmartLink US - CreditFlow" },
          { label: "Universal Offer SmartLink" },
        ],
      },
      {
        label: "Partner Tier",
        children: [
          { label: "Tier 1 - Premium" },
          { label: "Tier 2 - Standard" },
          { label: "Tier 3 - Newbie" },
        ],
      },
      {
        label: "Tracking Domain",
        children: [
          { label: "trk1.affnetwork.com" },
          { label: "clicks.leadsdirect.net" },
          { label: "campaign.trkzone.io" },
        ],
      },
    ],
  },
  {
    label: "Exclusion",
    children: [
      {
        label: "Offer",
        children: [
          { label: "IdentityIQ Credit Essentials (US) $1 Trial (1)" },
          { label: "IdentityIQ Credit Score - $1 Trial (US) (2)" },
          { label: "ScoreCasterIQ (CTQ) - $34.99 - Non-Incent (3)" },
          {
            label:
              "IdentityIQ Credit Essentials - US $1 Trial - Lifestyle Lander (4)",
          },
          { label: "Credit Score Hero - $1 - 7 Days Trial (US) (5)" },
          { label: "Credit Score Hero V2 - 17 Days Trial (US) (6)" },
        ],
      },
      {
        label: "Advertiser",
        children: [
          { label: "OneClick Media Group" },
          { label: "CreditGenie LLC" },
          { label: "DigitalIQ Solutions" },
          { label: "LeadScore Partners" },
        ],
      },
      {
        label: "Partner",
        children: [
          { label: "JohnDoe Affiliate (ID 102)" },
          { label: "JaneSmith Marketing (ID 204)" },
          { label: "TopLead Partners (ID 311)" },
        ],
      },
      {
        label: "Offer Group",
        children: [
          { label: "Financial Trials - US" },
          { label: "Incent Offers - Global" },
          { label: "Credit Repair Offers" },
        ],
      },
      {
        label: "Smart Link",
        children: [
          { label: "SmartLink US - CreditFlow" },
          { label: "Universal Offer SmartLink" },
        ],
      },
      {
        label: "Partner Tier",
        children: [
          { label: "Tier 1 - Premium" },
          { label: "Tier 2 - Standard" },
          { label: "Tier 3 - Newbie" },
        ],
      },
      {
        label: "Tracking Domain",
        children: [
          { label: "trk1.affnetwork.com" },
          { label: "clicks.leadsdirect.net" },
          { label: "campaign.trkzone.io" },
        ],
      },
    ],
  },
];

// ReportingOffer component
const ReportingOffer = () => {
  return (
    <div>
      <DataFilterTable
        data={InvoiceListData}
        columns={invoiceColumns}
        metrics={metrics}
        menuItems={rawMenuItems}
        summaryTitle="Invoice Summary"
        onFilterChange={(filters) =>
          console.log("Invoice filters changed:", filters)
        }
        onDateRangeChange={(range) =>
          console.log("Invoice date range changed:", range)
        }
        runButtonLabel="Run Invoice Report"
      />
    </div>
  );
};

export default ReportingOffer;
