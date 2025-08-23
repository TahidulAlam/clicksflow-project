// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import CustomDatePicker from "../calender/CustomDatePicker";
import { format } from "date-fns";
import { TiFilter } from "react-icons/ti";
import MultiLevelDropdown from "../dropdown/MultiLevelDropdown";
import PrimaryBtn from "../buttons/PrimaryBtn";
import DataList from "../dataTable/DataList";
import BoxAccordion, {
  BoxHeader,
  BoxContent,
} from "../boxAccordion/BoxAccordion";

// Define interfaces for props and state
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
  cell?: (
    row: Record<string, string | number | boolean | null>
  ) => React.ReactNode;
}

interface DataFilterTableProps {
  data?: Record<string, string | number | boolean | null>[];
  columns?: Column[];
  metrics?: Metric[];
  menuItems?: MenuItem[];
  summaryTitle?: string;
  minDate?: Date;
  maxDate?: Date;
  onFilterChange?: (filters: SelectedFilter[]) => void;
  onDateRangeChange?: (range: [Date | null, Date | null]) => void;
  runButtonLabel?: string;
  className?: string;
  showDatePicker?: boolean;
  showFilterDropdown?: boolean;
  showClearButton?: boolean;
  showRunButton?: boolean;
  showSummaryAccordion?: boolean;
  showDataList?: boolean;
}

// Error boundary component
const ErrorBoundary: React.FC<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> = ({ children, fallback }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Error in DataFilterTable:", error);
    return <>{fallback}</>;
  }
};

const DataFilterTable: React.FC<DataFilterTableProps> = ({
  data = [],
  columns = [],
  metrics = [],
  menuItems = [],
  summaryTitle = "Summary",
  minDate = new Date(2025, 0, 1),
  maxDate = new Date(2025, 11, 31),
  onFilterChange,
  onDateRangeChange,
  runButtonLabel = "Run Button",
  className = "",
  showDatePicker = true,
  showFilterDropdown = true,
  showClearButton = true,
  showRunButton = true,
  showSummaryAccordion = true,
  showDataList = true,
}) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Validate props on mount
  useEffect(() => {
    if (minDate > maxDate) {
      setError("minDate cannot be greater than maxDate");
    }
    if (
      !Array.isArray(data) ||
      !Array.isArray(columns) ||
      !Array.isArray(menuItems)
    ) {
      setError("Invalid data, columns, or menuItems prop: must be arrays");
    }
    // Validate data values
    if (
      data.some((item) =>
        Object.values(item).some(
          (value) =>
            value !== null &&
            typeof value !== "string" &&
            typeof value !== "number" &&
            typeof value !== "boolean"
        )
      )
    ) {
      setError(
        "Data contains invalid values; only string, number, boolean, or null are allowed"
      );
    }
  }, [data, columns, menuItems, minDate, maxDate]);

  // Memoize enhanced menu items
  const enhanceMenuItems = useCallback(
    (items: MenuItem[], parentKey: string | null = null): MenuItem[] =>
      items.map((item) => {
        if (
          item.children &&
          Array.isArray(item.children) &&
          item.children.length > 0
        ) {
          return {
            ...item,
            children: enhanceMenuItems(item.children, item.label),
          };
        }
        return {
          ...item,
          parentKey: parentKey ?? "",
          onClick: () => handleLabelClick(item.label, parentKey ?? ""),
        };
      }),
    []
  );

  const enhancedMenuItems = useMemo(
    () => enhanceMenuItems(menuItems),
    [menuItems, enhanceMenuItems]
  );

  // Controlled filter click handler
  const handleLabelClick = useCallback(
    (label: string, group: string) => {
      if (!label || !group) {
        console.warn("Invalid filter label or group");
        return;
      }
      setSelectedFilters((prev) => {
        const filtered = prev.filter((f) => f.group !== group);
        const newFilters = [...filtered, { label, group }];
        try {
          onFilterChange?.(newFilters);
        } catch (err) {
          console.error("Error in onFilterChange callback:", err);
        }
        return newFilters;
      });
    },
    [onFilterChange]
  );

  // Controlled filter removal
  const handleRemoveFilter = useCallback(
    (label: string) => {
      setSelectedFilters((prev) => {
        const newFilters = prev.filter((f) => f.label !== label);
        try {
          onFilterChange?.(newFilters);
        } catch (err) {
          console.error("Error in onFilterChange callback:", err);
        }
        return newFilters;
      });
    },
    [onFilterChange]
  );

  // Controlled clear filters
  const handleClearFilters = useCallback(() => {
    setSelectedFilters([]);
    setDateRange([null, null]);
    try {
      onFilterChange?.([]);
      onDateRangeChange?.([null, null]);
    } catch (err) {
      console.error("Error in clear filters callbacks:", err);
    }
  }, [onFilterChange, onDateRangeChange]);

  // Controlled date range change
  const handleDateRangeChange = useCallback(
    (date: Date | [Date | null, Date | null] | null) => {
      if (Array.isArray(date)) {
        const [start, end] = date;
        if (start && end && start > end) {
          setError("Start date cannot be after end date");
          return;
        }
        setDateRange(date);
        try {
          onDateRangeChange?.(date);
        } catch (err) {
          console.error("Error in onDateRangeChange callback:", err);
        }
      }
    },
    [onDateRangeChange]
  );

  const [startDate, endDate] = dateRange;

  // Fallback UI for errors
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={<div>Something went wrong. Please try again.</div>}
    >
      <div className={`space-y-4 ${className}`}>
        <div className="bg-white rounded-md border border-gray-300">
          <div className="flex justify-between flex-wrap gap-4 p-4">
            <div className="flex gap-4 flex-wrap">
              {showDatePicker && (
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
                        onChange={handleDateRangeChange}
                        showApplyCancel
                        minDate={minDate}
                        maxDate={maxDate}
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
              )}

              {showFilterDropdown && (
                <div className="py-2">
                  <MultiLevelDropdown
                    label={
                      <div className="flex gap-2 items-center">
                        <div className="bg-blue-950 p-2 rounded-lg">
                          <TiFilter className="text-white text-xl" />
                        </div>
                        <span className="text-sm">Filters</span>
                      </div>
                    }
                    showDepthHeader={true}
                    labelHeaderClass="whitespace-nowrap"
                    labelClass="border-none"
                    position="bottom-left"
                    submenuPosition="right"
                    menuItems={enhancedMenuItems}
                    searchInput={true}
                    submenuClassName="bg-blue-200 rounded-lg"
                    depthItemSubmenuClassNames={[
                      "max-h-[200px] overflow-y-auto",
                      "max-h-[300px] overflow-y-auto",
                    ]}
                    depthSubmenuClassNames={["w-[200px]", "w-[200px]"]}
                  />
                  <div className="rounded-md h-16 px-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedFilters.map((filter, index) => (
                        <span
                          key={`${filter.label}-${index}`}
                          className="bg-white border border-gray-300 text-blue-950 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          {filter.label}
                          <button
                            onClick={() => handleRemoveFilter(filter.label)}
                            className="ml-1 text-base text-blue-800 hover:text-red-600"
                            aria-label={`Remove filter ${filter.label}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {showClearButton && (
              <div>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-sm text-red-600 hover:underline"
                  disabled={
                    selectedFilters.length === 0 && !startDate && !endDate
                  }
                  aria-label="Clear all filters"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {showRunButton && (
            <div className="bg-blue-950 rounded-b-md">
              <div className="flex items-center justify-center p-2">
                {/* <PrimaryBtn disabled={!startDate || !endDate}>
                  {runButtonLabel}
                </PrimaryBtn> */}
                <PrimaryBtn>{runButtonLabel}</PrimaryBtn>
              </div>
            </div>
          )}
        </div>

        {showSummaryAccordion && (
          <div>
            <BoxAccordion>
              <BoxHeader className="bg-blue-100">
                <h2 className="text-sm font-base py-1">{summaryTitle}</h2>
              </BoxHeader>
              <BoxContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 xl:grid-cols-7 gap-4 p-4">
                  {metrics.length > 0 ? (
                    metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-blue-100 rounded-2xl p-2 flex flex-col justify-between items-center hover:shadow-lg transition"
                      >
                        <h4 className="text-gray-600 text-sm font-medium">
                          {metric.label}
                        </h4>
                        <div className="text-gray-900 mt-2">{metric.value}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No metrics available</div>
                  )}
                </div>
              </BoxContent>
            </BoxAccordion>
          </div>
        )}

        {showDataList && (
          <div>
            <DataList
              data={data}
              columns={columns}
              showLinkButton={false}
              showSearchBar={true}
              showColumnToggle={true}
              showfilter={false}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default DataFilterTable;
