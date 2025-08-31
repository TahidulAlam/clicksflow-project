"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import CustomDatePicker from "../calender/CustomDatePicker";
import { format } from "date-fns";

import { TiFilter } from "react-icons/ti";
import MultiLevelDropdown from "../dropdown/MultiLevelDropdown";
import PrimaryBtn from "../buttons/PrimaryBtn";
import DataList from "../dataTable/DataList";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "../boxAccordion/BoxAccordion";

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

const invoiceColumns = [
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
type Metric = {
  label: string;
  value: string | number;
};
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

const BoxDateFilter = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

  // Menu structure
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

  const enhanceMenuItems = (
    items: MenuItem[],
    parentKey: string | null = null
  ): MenuItem[] =>
    items.map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: enhanceMenuItems(item.children, item.label),
        };
      } else {
        return {
          ...item,
          parentKey: parentKey ?? "",
          onClick: () => handleLabelClick(item.label, parentKey ?? ""),
        };
      }
    });

  const enhancedMenuItems = enhanceMenuItems(rawMenuItems);

  const handleLabelClick = (label: string, group: string) => {
    setSelectedFilters((prev) => {
      const filtered = prev.filter((f) => f.group !== group);
      return [...filtered, { label, group }];
    });
  };

  const handleRemoveFilter = (label: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f.label !== label));
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    setDateRange([null, null]);
  };

  const [startDate, endDate] = dateRange;

  return (
    <div className="space-y-4">
      <div>
        <div className="bg-white rounded-md border border-gray-300">
          <div className="flex justify-between flex-wrap gap-4 p-4">
            <div className="flex gap-4 flex-wrap">
              {/* Date Picker */}
              <div>
                <div className="flex gap-2 items-center">
                  <div>
                    <CustomDatePicker
                      monthsShown={2}
                      mode="range"
                      showIcon={true}
                      showPresetsPanel={true}
                      value={dateRange}
                      showYearDropdown={true}
                      showMonthDropdown={true}
                      onChange={(range) =>
                        setDateRange(range as [Date | null, Date | null])
                      }
                      showApplyCancel
                      minDate={new Date(2025, 0, 1)}
                      maxDate={new Date(2025, 11, 31)}
                    />
                  </div>
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
              </div>

              {/* Filter Dropdown */}
              <div className="py-2">
                <MultiLevelDropdown
                  label={
                    <div className="flex gap-2 items-center">
                      <div className="bg-blue-950 p-2 rounded-lg">
                        <TiFilter className="text-white text-xl" />
                      </div>
                      <span className="text-sm">MultiLevelDropdown</span>
                    </div>
                  }
                  showDepthHeader={true}
                  labelHeaderClass="whitespace-nowrap"
                  labelClass="border-none "
                  position="bottom-left"
                  submenuPosition="right"
                  menuItems={enhancedMenuItems}
                  searchInput={true}
                  submenuClassName="bg-blue-200 rounded-lg"
                  depthItemSubmenuClassNames={[
                    "max-h-[200px] overflow-y-auto",
                    "max-h-[300px] overflow-y-auto",
                  ]}
                  depthSubmenuClassNames={["w-[200px] ", "w-[200px] "]}
                />
                <div className="rounded-md h-16 px-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filter, index) => (
                      <span
                        key={index}
                        className="bg-white border border-gray-300 text-blue-950 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        {filter.label}
                        <button
                          onClick={() => handleRemoveFilter(filter.label)}
                          className="ml-1 text-base text-blue-800 hover:text-red-600"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="bg-blue-950 rounded-b-md ">
            <div className="flex items-center justify-center p-2">
              <PrimaryBtn>Run Button</PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
      <div>
        <BoxAccordion>
          <BoxHeader collapsible={false} className="bg-blue-100">
            <h2 className="text-sm font-base py-1">Summery</h2>
          </BoxHeader>
          <BoxContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 xl:grid-cols-7 gap-4 p-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-blue-100 rounded-2xl p-2 flex flex-col justify-between items-center hover:shadow-lg transition"
                >
                  <h4 className="text-gray-600 text-sm font-medium">
                    {metric.label}
                  </h4>
                  <div className="text-xl text-gray-900 mt-2">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </BoxContent>
        </BoxAccordion>
      </div>
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
