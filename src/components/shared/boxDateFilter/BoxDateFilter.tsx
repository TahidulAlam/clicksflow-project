"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CustomDatePicker from "../calender/CustomDatePicker";
import { format } from "date-fns";
import DataList from "../dataTable/DataList";
import BoxAccordion, { BoxContent, BoxHeader } from "../boxAccordion/BoxAccordion";

// Generic Column interface
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


// Sample data
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

// Columns definition
const invoiceColumns: Column[] = [
  { header: "Invoice ID", accessor: "invoiceId", searchable: true, fixed: "left" },
  { header: "Advertiser", accessor: "advertiser", searchable: true },
  { header: "Status", accessor: "status", searchable: true },
  { header: "Advertiser Visibility", accessor: "advertiserVisibility", searchable: true },
  { header: "Payment Terms", accessor: "paymentTerms", searchable: true },
  {
    header: "Time Period",
    accessor: "startDate", // logical accessor
    searchable: false,
    cell: (row) => (
      <span>{`${row.startDate} to ${row.endDate}`}</span>
    ),
  },
  { header: "Amount", accessor: "amount", searchable: false },
  { header: "Public Notes", accessor: "publicNotes", searchable: true, width: "200px" },
  { header: "Internal Notes", accessor: "internalNotes", searchable: true },
  { header: "Date Created", accessor: "dateCreated", searchable: false },
  { header: "Last Modification", accessor: "lastModified", searchable: false },
  { header: "Action", accessor: "action", searchable: false, fixed: "right", width: "100px" },
];

// Filter type
interface SelectedFilter {
  label: string;
  group: string;
}


const metrics = [
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

const BoxDateFilter: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

  // Filter functions
  // const handleLabelClick = (label: string, group: string): void => {
  //   setSelectedFilters((prev) => [
  //     ...prev.filter((f) => f.group !== group),
  //     { label, group },
  //   ]);
  // };

  const handleRemoveFilter = (label: string): void => {
    setSelectedFilters((prev) => prev.filter((f) => f.label !== label));
  };

  const handleClearFilters = (): void => {
    setSelectedFilters([]);
    setDateRange([null, null]);
  };

  const [startDate, endDate] = dateRange;

  return (
    <div className="space-y-4">
      {/* Date Picker & Filter UI */}
      <div className="bg-white rounded-md border border-gray-300 p-4">
        <div className="flex gap-4 flex-wrap">
          <CustomDatePicker
            monthsShown={2}
            mode="range"
            showIcon
            showPresetsPanel
            value={dateRange}
            onChange={(range) => setDateRange(range as [Date | null, Date | null])}
            showApplyCancel
            minDate={new Date(2025, 0, 1)}
            maxDate={new Date(2025, 11, 31)}
          />
          <div className="flex flex-col text-sm text-gray-700 items-center">
            <span>
              <strong>Start:</strong>{" "}
              {startDate ? format(startDate, "dd MMM yyyy") : "N/A"}
            </span>
            <span>
              <strong>End:</strong>{" "}
              {endDate ? format(endDate, "dd MMM yyyy") : "N/A"}
            </span>
          </div>
        </div>

        {/* Active Filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedFilters.map((filter) => (
              <span
                key={filter.label}
                className="px-2 py-1 text-xs bg-blue-100 rounded-md flex items-center gap-1"
              >
                {filter.label}
                <button
                  type="button"
                  onClick={() => handleRemoveFilter(filter.label)}
                  className="text-red-600 text-xs"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Clear Button */}
        <div className="mt-2">
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-sm text-red-600 hover:underline"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Metrics Accordion */}
      <BoxAccordion>
        <BoxHeader collapsible={false} className="bg-blue-100">
          <h2 className="text-sm font-medium py-1">Summary</h2>
        </BoxHeader>
        <BoxContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 xl:grid-cols-7 gap-4 p-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-blue-100 rounded-2xl p-2 flex flex-col items-center hover:shadow-lg transition"
              >
                <h4 className="text-gray-600 text-sm font-medium">{metric.label}</h4>
                <div className="text-xl text-gray-900 mt-2">{metric.value}</div>
              </div>
            ))}
          </div>
        </BoxContent>
      </BoxAccordion>

      {/* DataList */}
      <div>
        <DataList data={InvoiceListData} columns={invoiceColumns} />
      </div>
    </div>
  );
};

export default BoxDateFilter;
