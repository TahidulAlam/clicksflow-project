/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { debounce } from "lodash";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import DataTable from "@/components/shared/dataTable/DataTable";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Link from "next/link";
import DataListSkeleton from "../skeleton/DataListSkeleton";

interface Column<T = Record<string, unknown>> {
  header: string;
  accessor: string;
  searchable?: boolean;
  ariaLabel?: string;
  cell?: (row: T) => React.ReactNode;
  fixed?: "left" | "right";
  width?: string;
  stickyAfter?: number;
  sortable?: boolean;
}

interface MenuItem<T = Record<string, unknown>> {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (row?: T) => void;
  labelHeader?: string;
  children?: MenuItem<T>[];
  content?: React.ReactNode;
}

interface DataListProps<T = Record<string, unknown>> {
  title?: string;
  data?: T[];
  columns?: Column<T>[];
  addLinkLabel?: string;
  addLinkIcon?: React.ReactNode;
  addLink?: string;
  showLinkButton?: boolean;
  showSearchBar?: boolean;
  showColumnToggle?: boolean;
  visibleColumns?: Record<string, boolean>;
  onVisibleColumnsChange?: (visible: Record<string, boolean>) => void;
  columnSearchQuery?: string;
  onColumnSearchChange?: (term: string) => void;
  onRestoreColumnsClick?: () => void;
  showfilter?: boolean;
  filterLabel?: string;
  filterItems?: MenuItem<T>[];
  onFilterSelect?: (label: string) => void;
  defaultSortField?: string;
  defaultSortOrder?: "asc" | "desc";
  className?: string;
  isLoading?: boolean;
  error?: string;
  enableRowSelection?: boolean;
  rowId?: keyof T;
  onRowSelect?: (selectedRows: T[]) => void;
  enableExport?: boolean;
  pageSizeOptions?: number[];
  rowActions?: MenuItem<T>[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
  totalItems?: number;
  onPageSizeChange?: (size: number) => void;
  showRowCount?: boolean;
  showPagination?: boolean;
}

const defaultFilterItems: MenuItem[] = [
  {
    label: "All",
    icon: <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />,
  },
  {
    label: "Paid",
    icon: <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />,
  },
  {
    label: "Unpaid",
    icon: <span className="w-2.5 h-2.5 rounded-full bg-red-400" />,
  },
];

const defaultPageSizeOptions = [10, 25, 50, 100];

const getNestedValue = <T extends Record<string, unknown>>(
  obj: T,
  accessor: string
): string => {
  try {
    const value = accessor.split(".").reduce((current, key) => {
      if (current && typeof current === "object" && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj as unknown);
    return value != null ? String(value) : "";
  } catch {
    return "";
  }
};

const DataList = <T extends Record<string, unknown>>({
  title,
  data = [],
  columns = [],
  addLinkLabel = "+ Add Item",
  addLink = "",
  showLinkButton = true,
  showSearchBar = true,
  showColumnToggle = true,
  visibleColumns,
  addLinkIcon,
  onVisibleColumnsChange,
  columnSearchQuery = "",
  onColumnSearchChange,
  onRestoreColumnsClick = () => {},
  showfilter = true,
  filterLabel = "Filter",
  filterItems = defaultFilterItems,
  onFilterSelect = () => {},
  defaultSortField,
  defaultSortOrder = "asc",
  className = "",
  isLoading = false,
  error = "",
  enableRowSelection = false,
  rowId,
  onRowSelect = () => {},
  enableExport = false,
  pageSizeOptions = defaultPageSizeOptions,
  rowActions = [],
  currentPage: propCurrentPage = 1,
  onPageChange,
  totalPages: propTotalPages,
  totalItems: propTotalItems,
  onPageSizeChange,
  showRowCount = false,
  showPagination = true,
}: DataListProps<T>) => {
  const [internalVisibleColumns, setInternalVisibleColumns] = useState<
    Record<string, boolean>
  >(columns.reduce((acc, col) => ({ ...acc, [col.accessor]: true }), {}));
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(
    pageSizeOptions[0] || 10
  );
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [internalColumnSearchQuery, setInternalColumnSearchQuery] =
    useState(columnSearchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeVisibleColumns = visibleColumns || internalVisibleColumns;
  const columnSearchTerm = onColumnSearchChange
    ? columnSearchQuery
    : internalColumnSearchQuery;
  const currentPage = onPageChange ? propCurrentPage : internalCurrentPage;
  const pageSize = onPageSizeChange
    ? pageSizeOptions[0] || 10
    : internalPageSize;

  useEffect(() => {
    if (!columns.length) {
      console.warn("DataList: 'columns' prop is empty");
    }
    if (rowId && data.some((row) => !row[rowId])) {
      console.warn(
        "DataList: Some rows are missing the specified 'rowId' property"
      );
    }
  }, [columns, rowId, data]);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setAppliedSearchTerm(term.trim().toLowerCase());
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchInput);
    return () => debouncedSearch.cancel();
  }, [searchInput, debouncedSearch]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        debouncedSearch.flush();
      }
    },
    [debouncedSearch]
  );

  const filteredData = useMemo(() => {
    if (!appliedSearchTerm) return data;
    return data.filter((row) =>
      columns.some((col) => {
        if (!col.searchable) return false;
        const value = getNestedValue(row, col.accessor);
        return value.toLowerCase().includes(appliedSearchTerm);
      })
    );
  }, [data, columns, appliedSearchTerm]);

  const totalItems = propTotalItems ?? filteredData.length;
  const totalPages = propTotalPages ?? Math.ceil(totalItems / pageSize);

  const paginatedData = useMemo(() => {
    if (onPageChange || propTotalPages) {
      return data;
    }
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize, data, onPageChange, propTotalPages]);

  const toggleColumnVisibility = useCallback(
    (accessor: string) => {
      const updated = {
        ...activeVisibleColumns,
        [accessor]: !activeVisibleColumns[accessor],
      };
      if (onVisibleColumnsChange) {
        onVisibleColumnsChange(updated);
      } else {
        setInternalVisibleColumns(updated);
      }
    },
    [activeVisibleColumns, onVisibleColumnsChange]
  );

  const restoreAllColumns = useCallback(() => {
    const allVisible = columns.reduce(
      (acc, col) => ({ ...acc, [col.accessor]: true }),
      {}
    );
    if (onVisibleColumnsChange) {
      onVisibleColumnsChange(allVisible);
    } else {
      setInternalVisibleColumns(allVisible);
    }
    onRestoreColumnsClick();
  }, [columns, onVisibleColumnsChange, onRestoreColumnsClick]);

  const handleRowSelect = useCallback(
    (row: T, isSelected: boolean) => {
      if (enableRowSelection && rowId && !row[rowId]) {
        console.warn(`DataList: Row missing valid rowId: ${String(rowId)}`);
        return;
      }
      setSelectedRows((prev) => {
        let updated;
        if (rowId) {
          const rowKey = row[rowId] as string;
          updated = isSelected
            ? [...prev, row]
            : prev.filter((r) => (r[rowId] as string) !== rowKey);
        } else {
          updated = isSelected ? [...prev, row] : prev.filter((r) => r !== row);
        }
        onRowSelect(updated);
        return updated;
      });
    },
    [onRowSelect, rowId, enableRowSelection]
  );

  const handleSelectAll = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        setSelectedRows(paginatedData);
        onRowSelect(paginatedData);
      } else {
        setSelectedRows([]);
        onRowSelect([]);
      }
    },
    [paginatedData, onRowSelect]
  );

  const isAllSelected = useMemo(
    () =>
      paginatedData.length > 0 &&
      paginatedData.every((row) =>
        selectedRows.some((selected) =>
          rowId ? selected[rowId] === row[rowId] : selected === row
        )
      ),
    [paginatedData, selectedRows, rowId]
  );

  const visibleCols = useMemo(() => {
    const baseCols = columns.filter(
      (col) => activeVisibleColumns[col.accessor]
    );

    if (enableRowSelection) {
      baseCols.unshift({
        header: "",
        accessor: "selection",
        width: "50px",
        fixed: "left",
        cell: (row: T) => (
          <input
            type="checkbox"
            checked={selectedRows.some((selected) =>
              rowId ? selected[rowId] === row[rowId] : selected === row
            )}
            onChange={(e) => handleRowSelect(row, e.target.checked)}
            aria-label={`Select row ${rowId ? row[rowId] : ""}`}
          />
        ),
      });
    }

    if (rowActions.length) {
      baseCols.push({
        header: "",
        accessor: "actions",
        cell: (row: T) => (
          <MultiLevelDropdown
            label={<BsThreeDotsVertical />}
            labelClass="p-2"
            position="bottom-right"
            menuItems={rowActions.map((action) => ({
              ...action,
              onClick: () => action.onClick && action.onClick(row),
            }))}
            ariaLabel={`Actions for row ${rowId ? row[rowId] : ""}`}
          />
        ),
      });
    }

    return baseCols;
  }, [
    columns,
    activeVisibleColumns,
    enableRowSelection,
    selectedRows,
    handleRowSelect,
    rowActions,
    rowId,
  ]);

  const exportToCSV = useCallback(() => {
    const exportColumns = visibleCols.filter(
      (col) => !["selection", "actions"].includes(col.accessor)
    );
    const headers = exportColumns.map((col) => col.header).join(",");
    const rows = filteredData.map((row) =>
      exportColumns
        .map((col) => {
          const value = col.cell
            ? String(col.cell(row)).replace(/"/g, '""')
            : getNestedValue(row, col.accessor).replace(/"/g, '""');
          return `"${value}"`;
        })
        .join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title || "data"}.csv`;
    link.click();
  }, [filteredData, visibleCols, title]);

  const filteredColumns = useMemo(
    () =>
      columns.filter((col) =>
        col.header.toLowerCase().includes(columnSearchTerm.toLowerCase())
      ),
    [columns, columnSearchTerm]
  );

  const filterDropdownItems = useMemo(() => {
    return filterItems.map((item) => ({
      ...item,
      label: (
        <span className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
      ),
      onClick: item.onClick || (() => onFilterSelect(item.label as string)),
    }));
  }, [filterItems, onFilterSelect]);

  const validSortField = useMemo(
    () =>
      columns.find((col) => col.accessor === defaultSortField && col.sortable)
        ?.accessor ||
      columns.find((col) => col.sortable)?.accessor ||
      "",
    [columns, defaultSortField]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;
      if (onPageChange) {
        onPageChange(newPage);
      } else {
        setInternalCurrentPage(newPage);
      }
    },
    [onPageChange, totalPages]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      if (!pageSizeOptions.includes(newSize)) return;
      if (onPageSizeChange) {
        onPageSizeChange(newSize);
      } else {
        setInternalPageSize(newSize);
        setInternalCurrentPage(1);
      }
      if (onPageChange) {
        onPageChange(1);
      } else {
        setInternalCurrentPage(1);
      }
    },
    [onPageSizeChange, onPageChange, pageSizeOptions]
  );

  const getPageNumbers = useCallback(() => {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  useEffect(() => {
    const totalItemsCount = propTotalItems ?? filteredData.length;
    const calculatedTotalPages = Math.ceil(totalItemsCount / pageSize);
    if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
      handlePageChange(1);
    }
  }, [
    currentPage,
    pageSize,
    filteredData.length,
    propTotalItems,
    handlePageChange,
  ]);

  useEffect(() => {
    if (!enableRowSelection) {
      setSelectedRows([]);
      onRowSelect([]);
    }
  }, [enableRowSelection, onRowSelect]);

  useEffect(() => {
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  if (isLoading) {
    return <DataListSkeleton rows={10} columns={columns.length || 5} />;
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <div className="text-red-500 text-center py-8">
          Error: {error || "Failed to load data"}
        </div>
      </div>
    );
  }

  if (columns.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <div className="text-gray-500 text-center py-8">
          No columns configured
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <div className="text-gray-500 text-center py-8">No data available</div>
        {showLinkButton && addLink && (
          <div className="text-center">
            <Link
              href={addLink}
              className="inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md bg-white px-4 py-2 text-sm border border-gray-300"
            >
              {addLinkLabel}
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Main Render
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h2 className="text-xl font-semibold">{title}</h2>}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {showLinkButton && addLink && (
            <Link
              href={addLink}
              className="inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md bg-white px-4 py-2 text-sm border border-gray-300 text-gray-700 "
              aria-label={addLinkLabel}
            >
              {addLinkIcon && (
                <>
                  <span className="text-md p-1">{addLinkIcon}</span>
                </>
              )}
              <span>{addLinkLabel}</span>
            </Link>
          )}
          {showfilter && (
            <MultiLevelDropdown
              label={
                selectedRows.length > 0
                  ? `Selected (${selectedRows.length})`
                  : filterLabel
              }
              labelClass="text-sm bg-white px-4 py-2 rounded-md border"
              position="bottom-center"
              submenuPosition="left"
              menuItems={filterDropdownItems}
              ariaLabel="Table filter options"
            />
          )}
          {enableExport && (
            <PrimaryBtn
              size="md"
              onClick={exportToCSV}
              className="flex items-center gap-2"
              aria-label="Export to CSV"
            >
              <FiDownload /> Export CSV
            </PrimaryBtn>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          {showSearchBar && (
            <div className="flex w-full sm:w-64">
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 text-sm border-l border-y border-gray-300 bg-white rounded-l-md focus:ring-0 focus:outline-none"
                aria-label="Search table data"
              />
              <button
                onClick={() => debouncedSearch.flush()}
                className="bg-gray-100 border-r border-y border-gray-300 rounded-r-md inset-y-0 right-0 px-3 flex items-center text-gray-700 hover:text-gray-900"
                aria-label="Search"
              >
                <BsSearch />
              </button>
            </div>
          )}
          {showColumnToggle && (
            <MultiLevelDropdown
              label={<BsThreeDotsVertical />}
              labelClass="bg-white px-2 h-[38px] rounded border"
              position="bottom-right"
              submenuPosition="left"
              menuItems={[
                {
                  labelHeader: "Table Actions",
                  label: "Customize Columns",
                  children: [
                    {
                      content: (
                        <div className="z-50 bg-white w-72 p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-gray-800">
                              Toggle Columns
                            </h4>
                            <button
                              className="text-sm text-blue-600 hover:underline"
                              onClick={restoreAllColumns}
                              aria-label="Restore all columns"
                            >
                              Restore
                            </button>
                          </div>
                          <input
                            type="text"
                            value={columnSearchTerm}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (onColumnSearchChange) {
                                onColumnSearchChange(val);
                              } else {
                                setInternalColumnSearchQuery(val);
                              }
                            }}
                            placeholder="Search columns..."
                            className="w-full mb-3 p-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500"
                            aria-label="Search columns"
                          />
                          <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
                            {filteredColumns.map(
                              ({ accessor, header, ariaLabel }) => (
                                <div
                                  key={accessor}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span className="text-gray-700">
                                    {header}
                                  </span>
                                  <ToggleSwitch
                                    size="sm"
                                    checked={!!activeVisibleColumns[accessor]}
                                    onChange={() =>
                                      toggleColumnVisibility(accessor)
                                    }
                                    ariaLabel={
                                      ariaLabel || `Toggle ${header} column`
                                    }
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ),
                    },
                  ],
                },
              ]}
              ariaLabel="Table options"
            />
          )}
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={paginatedData}
        columns={visibleCols}
        defaultSortField={validSortField}
        defaultSortOrder={defaultSortOrder}
        rowId={rowId as string}
        ariaLabel={title ? `${title} data table` : "Data table"}
        enableRowSelection={enableRowSelection}
        isAllSelected={isAllSelected}
        onSelectAll={handleSelectAll}
        className={className}
      />

      {/* Pagination */}
      {showPagination && (showRowCount || totalPages > 1) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
          {showRowCount && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="p-1 border rounded-md text-sm focus:ring-1 focus:ring-blue-500"
                aria-label="Rows per page"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">
                {`${(currentPage - 1) * pageSize + 1}–${Math.min(
                  currentPage * pageSize,
                  totalItems
                )} of ${totalItems}`}
              </span>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-lg rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <MdOutlineArrowBackIos />
              </button>
              {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-1 text-sm text-gray-500"
                  >
                    ...
                  </span>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-lg rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <MdOutlineArrowForwardIos />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataList;
