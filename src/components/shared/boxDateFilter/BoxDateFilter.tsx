"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import CustomDatePicker from "../calender/CustomDatePicker";
import { format } from "date-fns";
import { TiFilter } from "react-icons/ti";
import MultiLevelDropdown from "../dropdown/MultiLevelDropdown";
import PrimaryBtn from "../buttons/PrimaryBtn";
import DataList from "../dataTable/DataList";
import BoxAccordion, { BoxContent, BoxHeader } from "../boxAccordion/BoxAccordion";

// Generic Column interface
interface Column<T = any> {
  header: string;
  accessor: keyof T;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

// Data type for Invoice
interface Invoice {
  id: number;
  invoiceId: string;
  advertiser: string;
  status: string;
  advertiserVisibility: string;
  paymentTerms: string;
  startDate: string;
  endDate: string;
  amount: string;
  publicNotes: string;
  internalNotes: string;
  dateCreated: string;
  lastModified: string;
  action: string;
}

// Sample data
const InvoiceListData: Invoice[] = [
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
const invoiceColumns: Column<Invoice>[] = [
  { header: "Invoice ID", accessor: "invoiceId", searchable: true, fixed: "left" },
  { header: "Advertiser", accessor: "advertiser", searchable: true },
  { header: "Status", accessor: "status", searchable: true },
  { header: "Advertiser Visibility", accessor: "advertiserVisibility", searchable: true },
  { header: "Payment Terms", accessor: "paymentTerms", searchable: true },
  { 
    header: "Time Period", 
    accessor: "startDate", // Use startDate as accessor
    searchable: false, 
    cell: (row: Invoice) => `${row.startDate} to ${row.endDate}` 
  },
  { header: "Amount", accessor: "amount", searchable: false },
  { header: "Public Notes", accessor: "publicNotes", searchable: true, width: "200px" },
  { header: "Internal Notes", accessor: "internalNotes", searchable: true },
  { header: "Date Created", accessor: "dateCreated", searchable: false },
  { header: "Last Modification", accessor: "lastModified", searchable: false },
  { header: "Action", accessor: "action", searchable: false, fixed: "right", width: "100px" },
];

// Menu and Filter types
interface MenuItem {
  label: string;
  labelHeader?: React.ReactNode;
  depthHeader?: React.ReactNode;
  onClick?: () => void;
  children?: MenuItem[];
  parentKey?: string;
}

interface SelectedFilter {
  label: string;
  group: string;
}

type Metric = { label: string; value: string | number };
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

const BoxDateFilter: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

  // Handle filter selection
  const handleLabelClick = (label: string, group: string) => {
    setSelectedFilters((prev) => [...prev.filter(f => f.group !== group), { label, group }]);
  };
  const handleRemoveFilter = (label: string) => setSelectedFilters(prev => prev.filter(f => f.label !== label));
  const handleClearFilters = () => { setSelectedFilters([]); setDateRange([null, null]); };

  const [startDate, endDate] = dateRange;

  return (
    <div className="space-y-4">
      {/* Date Picker & Filter UI */}
      <div className="bg-white rounded-md border border-gray-300 p-4">
        {/* Date Picker */}
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
            <span><strong>Start:</strong> {startDate ? format(startDate, "dd MMM yyyy") : "N/A"}</span>
            <span><strong>End:</strong> {endDate ? format(endDate, "dd MMM yyyy") : "N/A"}</span>
          </div>
        </div>

        {/* Clear Button */}
        <div className="mt-2">
          <button type="button" onClick={handleClearFilters} className="text-sm text-red-600 hover:underline">Clear</button>
        </div>
      </div>

      {/* Metrics Accordion */}
      <BoxAccordion>
        <BoxHeader collapsible={false} className="bg-blue-100">
          <h2 className="text-sm font-base py-1">Summary</h2>
        </BoxHeader>
        <BoxContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 xl:grid-cols-7 gap-4 p-4">
            {metrics.map(metric => (
              <div key={metric.label} className="bg-blue-100 rounded-2xl p-2 flex flex-col items-center hover:shadow-lg transition">
                <h4 className="text-gray-600 text-sm font-medium">{metric.label}</h4>
                <div className="text-xl text-gray-900 mt-2">{metric.value}</div>
              </div>
            ))}
          </div>
        </BoxContent>
      </BoxAccordion>

      {/* DataList */}
      <div>
        <DataList
          data={InvoiceListData}
          columns={invoiceColumns}
        />
      </div>
    </div>
  );
};

export default BoxDateFilter;
