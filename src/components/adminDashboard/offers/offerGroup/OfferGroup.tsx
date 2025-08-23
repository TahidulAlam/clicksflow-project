"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import DataTable from "@/components/shared/dataTable/DataTable";
import SearchBar from "@/components/shared/dataTable/SearchBar";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";

interface Offer {
  id: number;
  name: string;
  advertiser: string;
  offers: number;
  todaysClicks: number;
  todaysConversions: number;
  dailyPayoutCap: number;
  dailyRevenueCap: number;
  dailyClickCap: number;
  dailyConversionCap: number;
  weeklyPayoutCap: number;
  weeklyRevenueCap: number;
  weeklyClickCap: number;
  weeklyConversionCap: number;
  monthlyPayoutCap: number;
  monthlyRevenueCap: number;
  monthlyClickCap: number;
  monthlyConversionCap: number;
  globalPayoutCap: number;
  globalRevenueCap: number;
  globalClickCap: number;
  globalConversionCap: number;
  created: string;
  modified: string;
  action: string;
  [key: string]: unknown;
}

const data: Offer[] = [
  {
    id: 13,
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

const columns = [
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
    sortable: false,
    width: "100px",
    fixed: "right" as const,
  },
];

const OfferGroup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    () =>
      columns.reduce((acc, col) => {
        acc[col.accessor] = true;
        return acc;
      }, {} as Record<string, boolean>)
  );

  const toggleColumnVisibility = (accessor: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [accessor]: !prev[accessor],
    }));
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter((row) =>
      columns.some((col) => {
        if (!col.searchable) return false;
        const value = row[col.accessor as keyof Offer];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

  const visibleCols = useMemo(
    () => columns.filter((col) => visibleColumns[col.accessor]),
    [visibleColumns]
  );

  const {
    formState: { isSubmitting, isLoading },
  } = useForm({
    defaultValues: {
      forceSSL: false,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <PrimaryBtn size="md">+ Add Offer</PrimaryBtn>
          <PrimaryBtn size="md">Active</PrimaryBtn>
        </div>
        <div className="flex items-center gap-2 relative">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search offers..."
          />
          <PrimaryBtn size="lg">
            <FaFilter />
          </PrimaryBtn>

          <div className="relative" ref={dropdownRef}>
            <PrimaryBtn
              size="lg"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <BsThreeDotsVertical />
            </PrimaryBtn>

            {showDropdown && (
              <div className="absolute right-0 top-12 z-50 bg-white shadow-lg border rounded-md p-4 w-72 max-h-96 overflow-y-auto">
                <div>
                  <h4 className="font-semibold mb-3">Toggle Columns</h4>
                  <button
                    onClick={() =>
                      setVisibleColumns(
                        columns.reduce(
                          (
                            acc: Record<string, boolean>,
                            col: { accessor: string }
                          ) => {
                            acc[col.accessor] = true;
                            return acc;
                          },
                          {} as Record<string, boolean>
                        )
                      )
                    }
                    className="text-sm font-medium text-blue-600 hover:underline self-start"
                  >
                    Restore All
                  </button>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {columns.map((col: { header: string; accessor: string }) => (
                    <div
                      key={col.accessor}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>{col.header}</span>
                      <ToggleSwitch
                        size="sm"
                        checked={visibleColumns[col.accessor]}
                        onChange={() => toggleColumnVisibility(col.accessor)}
                        disabled={isSubmitting || isLoading}
                        aria-label={`Toggle ${col.header}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DataTable
        data={
          filteredData.map((offer) => ({ ...offer })) as Record<
            string,
            unknown
          >[]
        }
        columns={visibleCols}
        defaultSortField="name"
        defaultSortOrder="asc"
      />
    </div>
  );
};

export default OfferGroup;
