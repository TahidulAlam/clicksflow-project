/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DataList from "@/components/shared/dataTable/DataList";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
  sortable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: any) => React.ReactNode;
}

interface MenuItem {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  labelHeader?: string;
  children?: MenuItem[];
  content?: React.ReactNode;
}

const categoryData = [
  {
    id: 1,
    name: "Leptozan - SS - Diet Supplement - TSL & VSL - [US, CA, AU, NZ]",
    advertiser: "Test ADV (EF) (1)",
    offers: 0,
    todaysClicks: 0,
    todaysConversions: 0,
    dailyPayoutCap: 0,
    dailyRevenueCap: 0,
    dailyClickCap: 0,
    dailyConversionCap: 0,
    weeklyPayoutCap: 0,
    weeklyRevenueCap: 0,
    weeklyClickCap: 0,
    weeklyConversionCap: 0,
    monthlyPayoutCap: 0,
    monthlyRevenueCap: 0,
    monthlyClickCap: 0,
    monthlyConversionCap: 0,
    globalPayoutCap: 0,
    globalRevenueCap: 0,
    globalClickCap: 0,
    globalConversionCap: 0,
    created: "2025-05-05",
    modified: "2025-05-05",
    action: "View",
  },
];

const categoryColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    sortable: true,
    searchable: true,
    width: "50px",
    fixed: "left" as const,
  },
  {
    header: "Name",
    accessor: "name",
    sortable: true,
    searchable: true,
    width: "400px",
  },
  {
    header: "Advertiser",
    accessor: "advertiser",
    sortable: true,
    searchable: true,
  },
  { header: "Offers", accessor: "offers", sortable: true },
  { header: "Today's Clicks", accessor: "todaysClicks", sortable: true },
  {
    header: "Today's Conversions",
    accessor: "todaysConversions",
    sortable: true,
  },
  { header: "Daily Payout Cap", accessor: "dailyPayoutCap", sortable: true },
  { header: "Daily Revenue Cap", accessor: "dailyRevenueCap", sortable: true },
  { header: "Daily Click Cap", accessor: "dailyClickCap", sortable: true },
  {
    header: "Daily Conversion Cap",
    accessor: "dailyConversionCap",
    sortable: true,
  },
  { header: "Weekly Payout Cap", accessor: "weeklyPayoutCap", sortable: true },
  {
    header: "Weekly Revenue Cap",
    accessor: "weeklyRevenueCap",
    sortable: true,
  },
  { header: "Weekly Click Cap", accessor: "weeklyClickCap", sortable: true },
  {
    header: "Weekly Conversion Cap",
    accessor: "weeklyConversionCap",
    sortable: true,
  },
  {
    header: "Monthly Payout Cap",
    accessor: "monthlyPayoutCap",
    sortable: true,
  },
  {
    header: "Monthly Revenue Cap",
    accessor: "monthlyRevenueCap",
    sortable: true,
  },
  { header: "Monthly Click Cap", accessor: "monthlyClickCap", sortable: true },
  {
    header: "Monthly Conversion Cap",
    accessor: "monthlyConversionCap",
    sortable: true,
  },
  { header: "Global Payout Cap", accessor: "globalPayoutCap", sortable: true },
  {
    header: "Global Revenue Cap",
    accessor: "globalRevenueCap",
    sortable: true,
  },
  { header: "Global Click Cap", accessor: "globalClickCap", sortable: true },
  {
    header: "Global Conversion Cap",
    accessor: "globalConversionCap",
    sortable: true,
  },
  { header: "Created", accessor: "created", sortable: true },
  { header: "Modified", accessor: "modified", sortable: true },

  {
    header: "Action",
    accessor: "action",
    fixed: "right",
    cell: (row) => {
      const menuItems: MenuItem[] = [
        {
          label: "Edit",
          icon: <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />,
          onClick: () => toast.success(`Edit clicked for ID: ${row.id}`),
        },
      ];

      return (
        <div className="z-50">
          <MultiLevelDropdown
            label={
              <>
                <BsThreeDotsVertical />
              </>
            }
            labelClass="text-sm font-bold border-none shadow-none -z-10 bg-none"
            position="bottom-right"
            menuClassName="z-50"
            menuItems={menuItems}
          />
        </div>
      );
    },
  },
];

const OfferGroup = () => {
  return (
    <div className="p-4">
      <DataList
        data={categoryData}
        columns={categoryColumns}
        addLink="/admin/offers/group/add"
        addLinkLabel="+ Add Category"
        showLinkButton={true}
        showSearchBar={true}
        showColumnToggle={true}
        showfilter={true}
      />
    </div>
  );
};

export default OfferGroup;
