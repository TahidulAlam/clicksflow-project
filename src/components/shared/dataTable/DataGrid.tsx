// "use client";

// import React, { useMemo, useState, useCallback } from "react";
// import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
// import DataTable from "@/components/shared/dataTable/DataTable";
// import SearchBar from "@/components/shared/dataTable/SearchBar";
// import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
// import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FiDownload } from "react-icons/fi";

// interface Column<T = Record<string, unknown>> {
//   header: string;
//   accessor: string;
//   searchable?: boolean;
//   ariaLabel?: string;
//   cell?: (row: T) => React.ReactNode;
// }

// interface MenuItem<T = Record<string, unknown>> {
//   label: string | React.ReactNode;
//   icon?: React.ReactNode;
//   onClick?: (row?: T) => void;
//   labelHeader?: string;
//   children?: MenuItem<T>[];
//   content?: React.ReactNode;
// }

// interface DataGridProps<T = Record<string, unknown>> {
//   title?: string;
//   data?: T[];
//   columns?: Column<T>[];
//   addLinkLabel?: string;
//   showLinkButton?: boolean;
//   onAddClick?: () => void;
//   showSearchBar?: boolean;
//   searchTerm?: string;
//   onSearchChange?: (term: string) => void;
//   showColumnToggle?: boolean;
//   visibleColumns?: Record<string, boolean>;
//   onVisibleColumnsChange?: (visible: Record<string, boolean>) => void;
//   columnSearchQuery?: string;
//   onColumnSearchChange?: (term: string) => void;
//   onRestoreColumnsClick?: () => void;
//   showFilter?: boolean;
//   filterLabel?: string;
//   filterItems?: MenuItem<T>[];
//   onFilterSelect?: (label: string) => void;
//   defaultSortField?: string;
//   defaultSortOrder?: "asc" | "desc";
//   className?: string;
//   isLoading?: boolean;
//   error?: string;
//   enableRowSelection?: boolean;
//   onRowSelect?: (selectedRows: T[]) => void;
//   enableExport?: boolean;
//   pageSizeOptions?: number[];
//   rowActions?: MenuItem<T>[];
// }

// const defaultFilterItems: MenuItem[] = [
//   {
//     label: "All",
//     icon: <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />,
//   },
//   {
//     label: "Paid",
//     icon: <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />,
//   },
//   {
//     label: "Unpaid",
//     icon: <span className="w-2.5 h-2.5 rounded-full bg-red-400" />,
//   },
// ];

// const getNestedValue = <T extends Record<string, unknown>>(
//   obj: T,
//   accessor: string
// ): string => {
//   try {
//     const value = accessor.split(".").reduce((current, key) => {
//       if (current && typeof current === "object" && key in current) {
//         return (current as Record<string, unknown>)[key];
//       }
//       return undefined;
//     }, obj as unknown);
//     return value != null ? String(value) : "";
//   } catch {
//     return "";
//   }
// };

// const DataGrid = <T extends Record<string, unknown>>({
//   title,
//   data = [],
//   columns = [],
//   addLinkLabel = "+ Add Item",
//   showLinkButton = true,
//   onAddClick = () => {},
//   showSearchBar = true,
//   searchTerm = "",
//   onSearchChange = () => {},
//   showColumnToggle = true,
//   visibleColumns,
//   onVisibleColumnsChange,
//   columnSearchQuery = "",
//   onColumnSearchChange = () => {},
//   onRestoreColumnsClick = () => {},
//   showFilter = true,
//   filterLabel = "Unpaid",
//   filterItems = defaultFilterItems,
//   onFilterSelect = () => {},
//   defaultSortField,
//   defaultSortOrder = "asc",
//   className = "",
//   isLoading = false,
//   error = "",
//   enableRowSelection = false,
//   onRowSelect = () => {},
//   enableExport = false,
//   pageSizeOptions = [10, 25, 50, 100],
//   rowActions = [],
// }: DataGridProps<T>) => {
//   const [internalVisibleColumns, setInternalVisibleColumns] = useState<
//     Record<string, boolean>
//   >(columns.reduce((acc, col) => ({ ...acc, [col.accessor]: true }), {}));
//   const [selectedRows, setSelectedRows] = useState<T[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

//   const activeVisibleColumns = visibleColumns || internalVisibleColumns;

//   const toggleColumnVisibility = useCallback(
//     (accessor: string) => {
//       const updated = {
//         ...activeVisibleColumns,
//         [accessor]: !activeVisibleColumns[accessor],
//       };
//       if (onVisibleColumnsChange) {
//         onVisibleColumnsChange(updated);
//       } else {
//         setInternalVisibleColumns(updated);
//       }
//     },
//     [activeVisibleColumns, onVisibleColumnsChange]
//   );

//   const restoreAllColumns = useCallback(() => {
//     const allVisible = columns.reduce(
//       (acc, col) => ({ ...acc, [col.accessor]: true }),
//       {}
//     );
//     if (onVisibleColumnsChange) {
//       onVisibleColumnsChange(allVisible);
//     } else {
//       setInternalVisibleColumns(allVisible);
//     }
//     onRestoreColumnsClick();
//   }, [columns, onVisibleColumnsChange, onRestoreColumnsClick]);

//   const handleRowSelect = useCallback(
//     (row: T, isSelected: boolean) => {
//       const updated = isSelected
//         ? [...selectedRows, row]
//         : selectedRows.filter((r) => r !== row);
//       setSelectedRows(updated);
//       onRowSelect(updated);
//     },
//     [selectedRows, onRowSelect]
//   );

//   const filteredData = useMemo(() => {
//     const term = searchTerm.trim().toLowerCase();
//     if (!term) return data;

//     return data.filter((row) =>
//       columns.some((col) => {
//         if (!col.searchable) return false;
//         const value = getNestedValue(row, col.accessor);
//         return value.toLowerCase().includes(term);
//       })
//     );
//   }, [data, columns, searchTerm]);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return filteredData.slice(start, start + pageSize);
//   }, [filteredData, currentPage, pageSize]);

//   // Moved visibleCols above exportToCSV to resolve declaration order issue
//   const visibleCols = useMemo(() => {
//     const baseCols = columns.filter(
//       (col) => activeVisibleColumns[col.accessor]
//     );
//     if (enableRowSelection) {
//       baseCols.unshift({
//         header: "",
//         accessor: "selection",
//         cell: (row: T) => (
//           <input
//             type="checkbox"
//             checked={selectedRows.includes(row)}
//             onChange={(e) => handleRowSelect(row, e.target.checked)}
//             aria-label={`Select row`}
//           />
//         ),
//       });
//     }
//     if (rowActions.length) {
//       baseCols.push({
//         header: "",
//         accessor: "actions",
//         cell: (row: T) => (
//           <MultiLevelDropdown
//             label={<BsThreeDotsVertical />}
//             labelClass="p-2"
//             position="bottom-right"
//             menuItems={rowActions.map((action) => ({
//               ...action,
//               onClick: () => action.onClick && action.onClick(row),
//             }))}
//           />
//         ),
//       });
//     }
//     return baseCols;
//   }, [
//     columns,
//     activeVisibleColumns,
//     enableRowSelection,
//     selectedRows,
//     handleRowSelect,
//     rowActions,
//   ]);

//   const exportToCSV = useCallback(() => {
//     const headers = visibleCols.map((col) => col.header).join(",");
//     const rows = filteredData.map((row) =>
//       visibleCols
//         .map((col) => {
//           const value = getNestedValue(row, col.accessor);
//           return `"${value.replace(/"/g, '""')}"`;
//         })
//         .join(",")
//     );
//     const csv = [headers, ...rows].join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `${title || "data"}.csv`;
//     link.click();
//   }, [filteredData, visibleCols, title]);

//   const filteredColumns = useMemo(
//     () =>
//       columns.filter((col) =>
//         col.header.toLowerCase().includes(columnSearchQuery.toLowerCase())
//       ),
//     [columns, columnSearchQuery]
//   );

//   const filterDropdownItems = useMemo(
//     () =>
//       filterItems.map((item) => ({
//         ...item,
//         label: (
//           <span className="flex items-center gap-2">
//             {item.icon}
//             {item.label}
//           </span>
//         ),
//         onClick: item.onClick || (() => onFilterSelect(item.label as string)),
//       })),
//     [filterItems, onFilterSelect]
//   );

//   const validSortField = useMemo(
//     () =>
//       visibleCols.find((col) => col.accessor === defaultSortField)?.accessor ||
//       visibleCols[0]?.accessor ||
//       "",
//     [visibleCols, defaultSortField]
//   );

//   if (isLoading) {
//     return (
//       <div className={`space-y-4 ${className}`}>
//         {title && <h2 className="text-xl font-semibold">{title}</h2>}
//         <div className="text-gray-500 text-center py-8">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`space-y-4 ${className}`}>
//         {title && <h2 className="text-xl font-semibold">{title}</h2>}
//         <div className="text-red-500 text-center py-8">{error}</div>
//       </div>
//     );
//   }

//   if (!data.length || !columns.length) {
//     return (
//       <div className={`space-y-4 ${className}`}>
//         {title && <h2 className="text-xl font-semibold">{title}</h2>}
//         <div className="text-gray-500 text-center py-8">No data available</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`space-y-4 ${className}`}>
//       {title && <h2 className="text-xl font-semibold">{title}</h2>}

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//         <div className="flex flex-wrap gap-2">
//           {showLinkButton && (
//             <PrimaryBtn size="md" onClick={onAddClick}>
//               {addLinkLabel}
//             </PrimaryBtn>
//           )}
//           {showFilter && (
//             <MultiLevelDropdown
//               label={filterLabel}
//               labelClass="text-sm"
//               position="bottom-center"
//               submenuPosition="left"
//               menuItems={filterDropdownItems}
//             />
//           )}
//           {enableExport && (
//             <PrimaryBtn
//               size="md"
//               onClick={exportToCSV}
//               className="flex items-center gap-2"
//             >
//               <FiDownload /> Export CSV
//             </PrimaryBtn>
//           )}
//         </div>

//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//           {showSearchBar && (
//             <SearchBar
//               value={searchTerm}
//               onChange={onSearchChange}
//               placeholder="Search..."
//               ariaLabel="Search table data"
//             />
//           )}
//           {showColumnToggle && (
//             <MultiLevelDropdown
//               label={<BsThreeDotsVertical />}
//               labelClass="bg-white p-2 rounded border"
//               position="bottom-right"
//               submenuPosition="left"
//               menuItems={[
//                 {
//                   labelHeader: "Table Actions",
//                   label: "Customize Columns",
//                   children: [
//                     {
//                       content: (
//                         <div className="z-50 bg-white w-72 p-4 shadow-lg rounded-md">
//                           <div className="flex justify-between items-center mb-3">
//                             <h4 className="font-semibold text-gray-800">
//                               Toggle Columns
//                             </h4>
//                             <button
//                               className="text-sm text-blue-600 hover:underline"
//                               onClick={restoreAllColumns}
//                             >
//                               Restore
//                             </button>
//                           </div>
//                           <input
//                             type="text"
//                             value={columnSearchQuery}
//                             onChange={(e) =>
//                               onColumnSearchChange(e.target.value)
//                             }
//                             placeholder="Search columns..."
//                             className="w-full mb-3 p-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500"
//                             aria-label="Search columns"
//                           />
//                           <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
//                             {filteredColumns.map(
//                               ({ accessor, header, ariaLabel }) => (
//                                 <div
//                                   key={accessor}
//                                   className="flex justify-between items-center text-sm"
//                                 >
//                                   <span className="text-gray-700">
//                                     {header}
//                                   </span>
//                                   <ToggleSwitch
//                                     size="sm"
//                                     checked={!!activeVisibleColumns[accessor]}
//                                     onChange={() =>
//                                       toggleColumnVisibility(accessor)
//                                     }
//                                     ariaLabel={
//                                       ariaLabel || `Toggle ${header} column`
//                                     }
//                                   />
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       ),
//                     },
//                   ],
//                 },
//               ]}
//             />
//           )}
//         </div>
//       </div>

//       <DataTable
//         data={paginatedData}
//         columns={visibleCols}
//         defaultSortField={validSortField}
//         defaultSortOrder={defaultSortOrder}
//       />

//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-700">Rows per page:</span>
//           <select
//             value={pageSize}
//             onChange={(e) => {
//               setPageSize(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//             className="p-1 border rounded-md text-sm"
//           >
//             {pageSizeOptions.map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="p-2 text-sm border rounded-md disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="text-sm">
//             Page {currentPage} of {Math.ceil(filteredData.length / pageSize)}
//           </span>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) =>
//                 Math.min(prev + 1, Math.ceil(filteredData.length / pageSize))
//               )
//             }
//             disabled={currentPage === Math.ceil(filteredData.length / pageSize)}
//             className="p-2 text-sm border rounded-md disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataGrid;

"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import DataTable from "@/components/shared/dataTable/DataTable";
import SearchBar from "@/components/shared/dataTable/SearchBar";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface Column<T = Record<string, unknown>> {
  header: string;
  accessor: string;
  searchable?: boolean;
  ariaLabel?: string;
  cell?: (row: T) => React.ReactNode;
}

interface MenuItem<T = Record<string, unknown>> {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (row?: T) => void;
  labelHeader?: string;
  children?: MenuItem<T>[];
  content?: React.ReactNode;
}

interface DataGridProps<T = Record<string, unknown>> {
  title?: string;
  data?: T[];
  columns?: Column<T>[];
  addLinkLabel?: string;
  showLinkButton?: boolean;
  onAddClick?: () => void;
  showSearchBar?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  showColumnToggle?: boolean;
  visibleColumns?: Record<string, boolean>;
  onVisibleColumnsChange?: (visible: Record<string, boolean>) => void;
  columnSearchQuery?: string;
  onColumnSearchChange?: (term: string) => void;
  onRestoreColumnsClick?: () => void;
  showFilter?: boolean;
  rowCount?: boolean;
  pagination?: boolean;
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

const DataGrid = <T extends Record<string, unknown>>({
  title,
  data = [],
  columns = [],
  addLinkLabel = "+ Add Item",
  showLinkButton = true,
  onAddClick = () => {},
  showSearchBar = true,
  searchTerm = "",
  onSearchChange = () => {},
  showColumnToggle = true,
  visibleColumns,
  onVisibleColumnsChange,
  columnSearchQuery = "",
  onColumnSearchChange = () => {},
  onRestoreColumnsClick = () => {},
  showFilter = true,
  filterLabel = "Unpaid",
  filterItems = defaultFilterItems,
  onFilterSelect = () => {},
  defaultSortField,
  defaultSortOrder = "asc",
  className = "",
  isLoading = false,
  error = "",
  enableRowSelection = false,
  rowCount = false,
  pagination = false,

  rowId,
  onRowSelect = () => {},
  enableExport = false,
  pageSizeOptions = [10, 25, 50, 100],
  rowActions = [],
  currentPage: propCurrentPage = 1,
  onPageChange,
  totalPages: propTotalPages,
  totalItems: propTotalItems,
  onPageSizeChange,
}: DataGridProps<T>) => {
  // State for internal pagination if not controlled
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(pageSizeOptions[0]);

  const currentPage = onPageChange ? propCurrentPage : internalCurrentPage;
  const pageSize = onPageSizeChange ? pageSizeOptions[0] : internalPageSize;

  const [internalVisibleColumns, setInternalVisibleColumns] = useState<
    Record<string, boolean>
  >(columns.reduce((acc, col) => ({ ...acc, [col.accessor]: true }), {}));
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const activeVisibleColumns = visibleColumns || internalVisibleColumns;

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

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
      setSelectedRows((prev) => {
        let updated;
        if (rowId) {
          const rowKey = row[rowId] as unknown as string;
          if (isSelected) {
            updated = [...prev, row];
          } else {
            updated = prev.filter(
              (r) => (r[rowId] as unknown as string) !== rowKey
            );
          }
        } else {
          // Fallback to reference comparison
          updated = isSelected ? [...prev, row] : prev.filter((r) => r !== row);
        }
        onRowSelect(updated);
        return updated;
      });
    },
    [onRowSelect, rowId]
  );

  const filteredData = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    if (!term) return data;

    return data.filter((row) =>
      columns.some((col) => {
        if (!col.searchable) return false;
        const value = getNestedValue(row, col.accessor);
        return value.toLowerCase().includes(term);
      })
    );
  }, [data, columns, debouncedSearchTerm]);

  // Calculate pagination values
  const totalItems = propTotalItems ?? filteredData.length;
  const totalPages = propTotalPages ?? Math.ceil(totalItems / pageSize);

  const paginatedData = useMemo(() => {
    if (onPageChange || propTotalPages) {
      // Server-side pagination - just use provided data
      return data;
    }

    // Client-side pagination
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize, data, onPageChange, propTotalPages]);

  // Prepare visible columns
  const visibleCols = useMemo(() => {
    const baseCols = columns.filter(
      (col) => activeVisibleColumns[col.accessor]
    );

    if (enableRowSelection) {
      baseCols.unshift({
        header: "",
        accessor: "selection",
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
    // Filter out internal columns
    const exportColumns = visibleCols.filter(
      (col) => !["selection", "actions"].includes(col.accessor)
    );

    const headers = exportColumns.map((col) => col.header).join(",");
    const rows = filteredData.map((row) =>
      exportColumns
        .map((col) => {
          const value = getNestedValue(row, col.accessor);
          return `"${value.replace(/"/g, '""')}"`;
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
        col.header.toLowerCase().includes(columnSearchQuery.toLowerCase())
      ),
    [columns, columnSearchQuery]
  );

  const filterDropdownItems = useMemo(
    () =>
      filterItems.map((item) => ({
        ...item,
        label: (
          <span className="flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
        ),
        onClick: item.onClick || (() => onFilterSelect(item.label as string)),
      })),
    [filterItems, onFilterSelect]
  );

  const validSortField = useMemo(
    () =>
      visibleCols.find((col) => col.accessor === defaultSortField)?.accessor ||
      visibleCols[0]?.accessor ||
      "",
    [visibleCols, defaultSortField]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (onPageChange) {
        onPageChange(newPage);
      } else {
        setInternalCurrentPage(newPage);
      }
    },
    [onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
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
    [onPageSizeChange, onPageChange]
  );

  // Render loading state
  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <div className="text-gray-500 text-center py-8">Loading data...</div>
      </div>
    );
  }

  // Render error state
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

  // Render no columns state
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

  // Render no data state
  if (data.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <div className="text-gray-500 text-center py-8">No data available</div>
        {showLinkButton && (
          <div className="text-center">
            <PrimaryBtn size="md" onClick={onAddClick}>
              {addLinkLabel}
            </PrimaryBtn>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h2 className="text-xl font-semibold">{title}</h2>}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {showLinkButton && (
            <PrimaryBtn size="md" onClick={onAddClick}>
              {addLinkLabel}
            </PrimaryBtn>
          )}
          {showFilter && (
            <MultiLevelDropdown
              label={filterLabel}
              labelClass="text-sm"
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
            <SearchBar
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search..."
              ariaLabel="Search table data"
            />
          )}
          {showColumnToggle && (
            <MultiLevelDropdown
              label={<BsThreeDotsVertical />}
              labelClass="bg-white p-2 rounded border"
              position="bottom-right"
              submenuPosition="left"
              menuItems={[
                {
                  labelHeader: "Table Actions",
                  label: "Customize Columns",
                  children: [
                    {
                      content: (
                        <div className="z-50 bg-white w-72 p-4 shadow-lg rounded-md">
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
                            value={columnSearchQuery}
                            onChange={(e) =>
                              onColumnSearchChange(e.target.value)
                            }
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

      <DataTable
        data={paginatedData}
        columns={visibleCols}
        defaultSortField={validSortField}
        defaultSortOrder={defaultSortOrder}
        rowId={rowId as string}
        ariaLabel={title ? `${title} data table` : "Data table"}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        {rowCount && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="p-1 border rounded-md text-sm"
                aria-label="Rows per page"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {pagination && (
          <>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-lg disabled:opacity-50"
                aria-label="Previous page"
              >
                <MdOutlineArrowBackIos />
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-lg disabled:opacity-50"
                aria-label="Next page"
              >
                <MdOutlineArrowForwardIos />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataGrid;
