/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { useMemo, useState, useRef, useCallback } from "react";
// import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

// export interface Column<T> {
//   header: string;
//   accessor: keyof T | ((row: T) => any);
//   cell?: (row: T) => React.ReactNode;
//   searchable?: boolean;
//   fixed?: "left" | "right";
//   stickyAfter?: number;
//   width?: string;
//   ariaLabel?: string;
//   hidden?: boolean;
//   headerClassName?: string;
//   headerButtonClassName?: string;
//   cellClassName?: string | ((row: T, rowIndex: number) => string);
//   sortIconClassName?: string;
// }

// interface DataTableProps<T extends Record<string, unknown>> {
//   data: T[];
//   columns: Column<T>[];
//   defaultSortField?: keyof T;
//   defaultSortOrder?: "asc" | "desc";
//   rowId?: keyof T;
//   ariaLabel?: string;
//   className?: string;
//   tableContainerClassName?: string;
//   tableClassName?: string;
//   theadClassName?: string;
//   tbodyClassName?: string;
//   headerRowClassName?: string;
//   rowClassName?: string | ((row: T, rowIndex: number) => string);
//   noDataClassName?: string;
//   sortAscIcon?: React.ReactNode;
//   sortDescIcon?: React.ReactNode;
//   sortDefaultIcon?: React.ReactNode;
//   enableRowSelection?: boolean;
//   isAllSelected?: boolean;
//   onSelectAll?: (isChecked: boolean) => void;
// }

// const DataTable = <T extends Record<string, unknown>>({
//   data,
//   columns,
//   defaultSortField,
//   defaultSortOrder = "asc",
//   rowId,
//   ariaLabel = "Data Table",
//   className = "",
//   tableContainerClassName = "border border-gray-300 rounded-md max-h-[500px] overflow-auto",
//   tableClassName = "table-auto min-w-full border-separate border-spacing-0",
//   theadClassName = "sticky top-0 z-30 bg-gray-100",
//   tbodyClassName = "bg-white text-start",
//   headerRowClassName = "",
//   rowClassName = "hover:bg-gray-50",
//   noDataClassName = "px-4 py-4 text-gray-500 text-center",
//   sortAscIcon = <FaSortUp />,
//   sortDescIcon = <FaSortDown />,
//   sortDefaultIcon = <FaSort className="text-gray-400" />,
//   enableRowSelection = false,
//   isAllSelected = false,
//   onSelectAll = () => {},
// }: DataTableProps<T>) => {
//   const [sortField, setSortField] = useState<string | undefined>(
//     defaultSortField as string
//   );
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const visibleColumns = useMemo(
//     () => columns.filter((col) => !col.hidden),
//     [columns]
//   );

//   const columnMap = useMemo(() => {
//     return new Map(
//       visibleColumns.map((col) => {
//         const key =
//           typeof col.accessor === "function"
//             ? col.header
//             : String(col.accessor);
//         return [key, col];
//       })
//     );
//   }, [visibleColumns]);

//   const cumulativeWidths = useMemo(() => {
//     const result = [0];
//     let total = 0;

//     visibleColumns.forEach((col) => {
//       let width = 150;
//       if (col.width) {
//         const numericPart = col.width.replace(/[^\d]/g, "");
//         if (numericPart) {
//           width = parseInt(numericPart, 10);
//         }
//       }
//       total += width;
//       result.push(total);
//     });

//     return result;
//   }, [visibleColumns]);

//   const stickyStates = useMemo(() => {
//     return visibleColumns.map((col, index) => {
//       let isSticky = false;
//       let side: "left" | "right" | null = null;
//       let offset = 0;

//       if (col.fixed) {
//         isSticky = true;
//         side = col.fixed;
//       } else if (typeof col.stickyAfter === "number") {
//         isSticky = index > col.stickyAfter;
//         side = "left";
//         if (isSticky && typeof col.stickyAfter === "number") {
//           offset = cumulativeWidths[col.stickyAfter + 1] || 0;
//         }
//       }

//       return { isSticky, side, offset };
//     });
//   }, [visibleColumns, cumulativeWidths]);

//   const [columnStyles, headerStyles] = useMemo(() => {
//     const parseWidth = (width: string | undefined): number => {
//       if (!width) return 150;
//       const numericPart = width.replace(/[^\d]/g, "");
//       return numericPart ? parseInt(numericPart, 10) : 150;
//     };

//     let leftFixedAccum = 0;
//     const leftOffsets = visibleColumns.map((col) => {
//       const offset = leftFixedAccum;
//       if (col.fixed === "left") {
//         leftFixedAccum += parseWidth(col.width);
//       }
//       return offset;
//     });

//     let rightFixedAccum = 0;
//     const rightOffsets = visibleColumns
//       .slice()
//       .reverse()
//       .map((col) => {
//         const offset = rightFixedAccum;
//         if (col.fixed === "right") {
//           rightFixedAccum += parseWidth(col.width);
//         }
//         return offset;
//       })
//       .reverse();

//     const colStyles = visibleColumns.map((col, idx) => {
//       const state = stickyStates[idx];
//       const style: React.CSSProperties = {
//         width: col.width || "150px",
//         minWidth: col.width || "150px",
//         maxWidth: col.width || "150px",
//       };

//       if (state.isSticky) {
//         style.position = "sticky";
//         style.zIndex = 20;

//         if (state.side === "right") {
//           style.right = rightOffsets[idx];
//         } else {
//           if (col.fixed === "left") {
//             style.left = leftOffsets[idx];
//           } else {
//             style.left = state.offset;
//           }
//         }
//       }

//       return style;
//     });

//     const headStyles = colStyles.map((s, idx) => {
//       if (stickyStates[idx].isSticky) {
//         return { ...s, zIndex: 30 };
//       }
//       return s;
//     });

//     return [colStyles, headStyles];
//   }, [visibleColumns, stickyStates]);

//   const sortedData = useMemo(() => {
//     if (!sortField) return data;
//     const column = columnMap.get(sortField);
//     if (!column) return data;

//     return [...data].sort((a, b) => {
//       const getValue = (item: T) =>
//         typeof column.accessor === "function"
//           ? column.accessor(item)
//           : item[column.accessor as keyof T];

//       const aVal = getValue(a);
//       const bVal = getValue(b);

//       if (aVal === null || aVal === undefined)
//         return sortOrder === "asc" ? -1 : 1;
//       if (bVal === null || bVal === undefined)
//         return sortOrder === "asc" ? 1 : -1;

//       if (typeof aVal === "number" && typeof bVal === "number") {
//         return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
//       }

//       if (aVal instanceof Date && bVal instanceof Date) {
//         return sortOrder === "asc"
//           ? aVal.getTime() - bVal.getTime()
//           : bVal.getTime() - aVal.getTime();
//       }

//       return sortOrder === "asc"
//         ? String(aVal).localeCompare(String(bVal))
//         : String(bVal).localeCompare(String(aVal));
//     });
//   }, [data, sortField, sortOrder, columnMap]);

//   const handleSort = useCallback((colKey: string) => {
//     setSortField((prev) => {
//       if (prev === colKey) {
//         setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
//         return colKey;
//       }
//       setSortOrder("asc");
//       return colKey;
//     });
//   }, []);

//   return (
//     <div
//       className={`w-full text-xs font-medium overflow-x-auto ${className}`}
//       ref={containerRef}
//       role="region"
//       aria-label={ariaLabel}
//       tabIndex={0}
//     >
//       <div className={tableContainerClassName}>
//         <table className={tableClassName}>
//           <thead className={theadClassName}>
//             <tr className={headerRowClassName}>
//               {visibleColumns.map((col, idx) => {
//                 const colKey =
//                   typeof col.accessor === "function"
//                     ? col.header
//                     : String(col.accessor);
//                 const isSorted = sortField === colKey;
//                 const ariaSort = isSorted
//                   ? sortOrder === "asc"
//                     ? "ascending"
//                     : "descending"
//                   : "none";

//                 if (col.accessor === "selection" && enableRowSelection) {
//                   return (
//                     <th
//                       key={idx}
//                       className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap bg-gray-100 ${
//                         col.headerClassName || "text-gray-600"
//                       } ${
//                         stickyStates[idx].isSticky
//                           ? "shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.1)]"
//                           : ""
//                       }`}
//                       style={headerStyles[idx]}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={isAllSelected}
//                         onChange={(e) => onSelectAll(e.target.checked)}
//                         aria-label="Select all rows"
//                       />
//                     </th>
//                   );
//                 }

//                 return (
//                   <th
//                     key={idx}
//                     className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap bg-gray-100 ${
//                       col.headerClassName || "text-gray-600"
//                     } ${
//                       stickyStates[idx].isSticky
//                         ? "shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.1)]"
//                         : ""
//                     }`}
//                     style={headerStyles[idx]}
//                     aria-sort={ariaSort}
//                   >
//                     <button
//                       className={`flex items-center gap-1 w-full text-start ${
//                         col.headerButtonClassName || ""
//                       }`}
//                       onClick={() => handleSort(colKey)}
//                       aria-label={
//                         col.ariaLabel ||
//                         `Sort by ${col.header} ${
//                           isSorted
//                             ? sortOrder === "asc"
//                               ? "descending"
//                               : "ascending"
//                             : "ascending"
//                         }`
//                       }
//                     >
//                       {col.header}
//                       {isSorted ? (
//                         sortOrder === "asc" ? (
//                           <span className={col.sortIconClassName}>
//                             {sortAscIcon}
//                           </span>
//                         ) : (
//                           <span className={col.sortIconClassName}>
//                             {sortDescIcon}
//                           </span>
//                         )
//                       ) : (
//                         <span className={col.sortIconClassName}>
//                           {sortDefaultIcon}
//                         </span>
//                       )}
//                     </button>
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>
//           <tbody className={tbodyClassName}>
//             {sortedData.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={visibleColumns.length}
//                   className={`${noDataClassName} py-8`}
//                 >
//                   No data available
//                 </td>
//               </tr>
//             ) : (
//               sortedData.map((row, rowIndex) => {
//                 const key =
//                   rowId && row[rowId] ? String(row[rowId]) : `row-${rowIndex}`;
//                 const rowClass =
//                   typeof rowClassName === "function"
//                     ? rowClassName(row, rowIndex)
//                     : rowClassName;

//                 return (
//                   <tr key={key} className={rowClass} data-row-id={key}>
//                     {visibleColumns.map((col, colIndex) => {
//                       const cellValue = col.cell
//                         ? col.cell(row)
//                         : typeof col.accessor === "function"
//                         ? col.accessor(row)
//                         : row[col.accessor as keyof T];

//                       const cellClass =
//                         typeof col.cellClassName === "function"
//                           ? col.cellClassName(row, rowIndex)
//                           : col.cellClassName || "";

//                       return (
//                         <td
//                           key={colIndex}
//                           className={`px-4 py-3 whitespace-nowrap ${
//                             stickyStates[colIndex].isSticky
//                               ? "bg-white z-10"
//                               : ""
//                           } ${cellClass}`}
//                           style={columnStyles[colIndex]}
//                         >
//                           {cellValue !== null && cellValue !== undefined ? (
//                             typeof cellValue === "string" ||
//                             typeof cellValue === "number" ||
//                             typeof cellValue === "boolean" ||
//                             React.isValidElement(cellValue) ? (
//                               cellValue
//                             ) : (
//                               JSON.stringify(cellValue)
//                             )
//                           ) : (
//                             <span className="text-gray-400">-</span>
//                           )}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DataTable;

import React, { useMemo, useState, useCallback } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => any);
  cell?: (row: T) => React.ReactNode;
  searchable?: boolean;
  fixed?: "left" | "right";
  stickyAfter?: number;
  width?: string;
  ariaLabel?: string;
  hidden?: boolean;
  headerClassName?: string;
  headerButtonClassName?: string;
  cellClassName?: string | ((row: T, rowIndex: number) => string);
  sortIconClassName?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  defaultSortField?: keyof T;
  defaultSortOrder?: "asc" | "desc";
  rowId?: keyof T;
  ariaLabel?: string;
  className?: string;
  tableContainerClassName?: string;
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  headerRowClassName?: string;
  headerButtonClassName?: string;
  cellClassName?: string; // Default for all cells
  rowClassName?: string | ((row: T, rowIndex: number) => string);
  noDataClassName?: string;
  sortAscIcon?: React.ReactNode;
  sortDescIcon?: React.ReactNode;
  sortDefaultIcon?: React.ReactNode;
  enableRowSelection?: boolean;
  isAllSelected?: boolean;
  onSelectAll?: (isChecked: boolean) => void;
}

const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  defaultSortField,
  defaultSortOrder = "asc",
  rowId,
  ariaLabel = "Data Table",
  className = "",
  tableContainerClassName = "border border-gray-300 rounded-md max-h-[500px] overflow-auto",
  tableClassName = "table-auto min-w-full border-separate border-spacing-0",
  theadClassName = "sticky top-0 z-30 bg-gray-100",
  tbodyClassName = "bg-white text-start",
  headerRowClassName = "",
  headerButtonClassName,
  cellClassName,
  rowClassName = "hover:bg-gray-50",
  noDataClassName = "px-4 py-4 text-gray-500 text-center",
  sortAscIcon = <FaSortUp />,
  sortDescIcon = <FaSortDown />,
  sortDefaultIcon = <FaSort className="text-gray-400" />,
  enableRowSelection = false,
  isAllSelected = false,
  onSelectAll = () => {},
}: DataTableProps<T>) => {
  // -------------------------
  // Utilities
  // -------------------------
  const parseWidthToPx = (w?: string): number => {
    if (!w) return 150;
    const trimmed = String(w).trim();
    if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    const m = trimmed.match(/^(\d+(?:\.\d+)?)(px|rem|em)$/i);
    if (m) {
      const val = parseFloat(m[1]);
      const unit = m[2].toLowerCase();
      if (unit === "px") return Math.round(val);
      if (unit === "rem" || unit === "em") return Math.round(val * 16);
    }
    return 150;
  };

  const buildStableKey = (col: Column<T>, index: number) =>
    typeof col.accessor === "function" ? `__fn_${index}` : String(col.accessor);

  // -------------------------
  // State
  // -------------------------
  const [sortField, setSortField] = useState<string | undefined>(
    defaultSortField ? String(defaultSortField) : undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

  // -------------------------
  // Memoized column prep
  // -------------------------
  const visibleColumns = useMemo(
    () => columns.filter((c) => !c.hidden),
    [columns]
  );

  const headerKeys = useMemo(
    () => visibleColumns.map((c, i) => buildStableKey(c, i)),
    [visibleColumns, buildStableKey]
  );

  const columnMap = useMemo(
    () => new Map(visibleColumns.map((c, i) => [headerKeys[i], c] as const)),
    [visibleColumns, headerKeys]
  );

  const colPxWidths = useMemo(
    () => visibleColumns.map((c) => parseWidthToPx(c.width)),
    [visibleColumns]
  );

  const cumulativeLeft = useMemo(() => {
    const out = [0];
    let sum = 0;
    for (let i = 0; i < colPxWidths.length; i++) {
      sum += colPxWidths[i] ?? 150;
      out.push(sum);
    }
    return out;
  }, [colPxWidths]);

  const stickyStates = useMemo(() => {
    return visibleColumns.map((col, index) => {
      let isSticky = false;
      let side: "left" | "right" | null = null;
      let offset = 0;

      if (col.fixed) {
        isSticky = true;
        side = col.fixed;
      } else if (typeof col.stickyAfter === "number") {
        isSticky = index > col.stickyAfter;
        side = "left";
        if (isSticky) {
          offset = cumulativeLeft[col.stickyAfter + 1] || 0;
        }
      }

      return { isSticky, side, offset };
    });
  }, [visibleColumns, cumulativeLeft]);

  const [columnStyles, headerStyles] = useMemo(() => {
    let leftAccum = 0;
    const leftOffsets = visibleColumns.map((col, idx) => {
      const off = leftAccum;
      if (col.fixed === "left") leftAccum += colPxWidths[idx] ?? 150;
      return off;
    });

    let rightAccum = 0;
    const rightOffsets = visibleColumns
      .slice()
      .reverse()
      .map((col, ridx) => {
        const off = rightAccum;
        if (col.fixed === "right") {
          const realIdx = visibleColumns.length - 1 - ridx;
          rightAccum += colPxWidths[realIdx] ?? 150;
        }
        return off;
      })
      .reverse();

    const colStyles = visibleColumns.map((col, idx) => {
      const widthPx = colPxWidths[idx] ?? 150;
      const state = stickyStates[idx];

      const style: React.CSSProperties = {
        width: `${widthPx}px`,
        minWidth: `${widthPx}px`,
        maxWidth: `${widthPx}px`,
      };

      if (state.isSticky) {
        style.position = "sticky";
        style.zIndex = 20;

        if (state.side === "right") {
          style.right = rightOffsets[idx];
        } else {
          style.left = col.fixed === "left" ? leftOffsets[idx] : state.offset;
        }
      }

      return style;
    });

    const headStyles = colStyles.map((s, idx) =>
      stickyStates[idx].isSticky ? { ...s, zIndex: 30 } : s
    );

    return [colStyles, headStyles] as const;
  }, [visibleColumns, stickyStates, colPxWidths]);

  // -------------------------
  // Sorting
  // -------------------------
  const sortedData = useMemo(() => {
    if (!sortField) return data;
    const column = columnMap.get(sortField);
    if (!column) return data;

    const getValue = (item: T) =>
      typeof column.accessor === "function"
        ? column.accessor(item)
        : item[column.accessor as keyof T];

    const compare = (a: unknown, b: unknown) => {
      const dir = sortOrder === "asc" ? 1 : -1;

      if (a == null && b == null) return 0;
      if (a == null) return -1 * dir;
      if (b == null) return 1 * dir;

      if (typeof a === "number" && typeof b === "number") {
        return (a - b) * dir;
      }

      if (typeof a === "boolean" && typeof b === "boolean") {
        return (+a - +b) * dir;
      }

      if (a instanceof Date && b instanceof Date) {
        return (a.getTime() - b.getTime()) * dir;
      }

      const aTime = typeof a === "string" ? Date.parse(a) : NaN;
      const bTime = typeof b === "string" ? Date.parse(b) : NaN;
      if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
        return (aTime - bTime) * dir;
      }

      return String(a).localeCompare(String(b)) * dir;
    };

    return [...data].sort((ra, rb) => compare(getValue(ra), getValue(rb)));
  }, [data, sortField, sortOrder, columnMap]);

  // -------------------------
  // Handlers
  // -------------------------
  const handleSort = useCallback((colKey: string) => {
    setSortField((prev) => {
      if (prev === colKey) {
        setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
        return colKey;
      }
      setSortOrder("asc");
      return colKey;
    });
  }, []);

  // -------------------------
  // Render
  // -------------------------
  return (
    <div
      className={`w-full text-xs font-medium overflow-x-auto ${className}`}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <div className={tableContainerClassName}>
        <table className={tableClassName}>
          <colgroup>
            {visibleColumns.map((_, idx) => (
              <col
                key={`col-${idx}`}
                style={{ width: columnStyles[idx].width }}
              />
            ))}
          </colgroup>

          <thead className={theadClassName}>
            <tr className={headerRowClassName}>
              {visibleColumns.map((col, idx) => {
                const colKey = headerKeys[idx];
                const isSorted = sortField === colKey;
                const ariaSort = isSorted
                  ? sortOrder === "asc"
                    ? "ascending"
                    : "descending"
                  : "none";

                if (col.accessor === "selection" && enableRowSelection) {
                  return (
                    <th
                      key={idx}
                      scope="col"
                      className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap bg-gray-100 ${
                        col.headerClassName || "text-gray-600"
                      }`}
                      style={headerStyles[idx]}
                    >
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={(e) => onSelectAll(e.target.checked)}
                        aria-label="Select all rows"
                      />
                    </th>
                  );
                }

                return (
                  <th
                    key={idx}
                    scope="col"
                    className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap bg-gray-100 ${
                      col.headerClassName || "text-gray-600"
                    }`}
                    style={headerStyles[idx]}
                    aria-sort={ariaSort}
                  >
                    <button
                      type="button"
                      className={`flex items-center gap-1 w-full text-start ${
                        headerButtonClassName ?? ""
                      } ${col.headerButtonClassName ?? ""}`}
                      onClick={() => handleSort(colKey)}
                      aria-label={`Sort by ${col.header}`}
                    >
                      {col.header}
                      {isSorted
                        ? sortOrder === "asc"
                          ? sortAscIcon
                          : sortDescIcon
                        : sortDefaultIcon}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className={tbodyClassName}>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className={`${noDataClassName} py-8`}
                >
                  No data available
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => {
                const key =
                  rowId && row[rowId] != null
                    ? String(row[rowId])
                    : `row-${rowIndex}`;

                const rowClass =
                  typeof rowClassName === "function"
                    ? rowClassName(row, rowIndex)
                    : rowClassName;

                return (
                  <tr key={key} className={rowClass} data-row-id={key}>
                    {visibleColumns.map((col, colIndex) => {
                      const rawValue =
                        typeof col.accessor === "function"
                          ? col.accessor(row)
                          : row[col.accessor as keyof T];

                      const content = col.cell ? col.cell(row) : rawValue;

                      const columnCellClass =
                        typeof col.cellClassName === "function"
                          ? col.cellClassName(row, rowIndex)
                          : col.cellClassName || "";

                      let rendered: React.ReactNode;
                      if (content === null || content === undefined) {
                        rendered = <span className="text-gray-400">-</span>;
                      } else if (
                        typeof content === "string" ||
                        typeof content === "number" ||
                        typeof content === "boolean" ||
                        React.isValidElement(content)
                      ) {
                        rendered = content as React.ReactNode;
                      } else {
                        try {
                          rendered = JSON.stringify(content) ?? (
                            <span className="text-gray-400">-</span>
                          );
                        } catch {
                          rendered = String(content);
                        }
                      }

                      const style: React.CSSProperties = {
                        ...columnStyles[colIndex],
                        ...(stickyStates[colIndex].isSticky
                          ? { background: "white" }
                          : null),
                      };

                      return (
                        <td
                          key={colIndex}
                          className={`${columnCellClass} ${
                            cellClassName ?? ""
                          } px-4 py-3`}
                          style={style}
                        >
                          {rendered}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

// import React, { useMemo, useState, useCallback } from "react";
// import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

// export interface Column<T> {
//   header: string;
//   accessor: keyof T | ((row: T) => any);
//   cell?: (row: T) => React.ReactNode;
//   searchable?: boolean;
//   fixed?: "left" | "right";
//   stickyAfter?: number;
//   width?: string;
//   ariaLabel?: string;
//   hidden?: boolean;
//   headerClassName?: string;
//   headerButtonClassName?: string;
//   cellClassName?: string | ((row: T, rowIndex: number) => string);
//   sortIconClassName?: string;
// }

// interface DataTableProps<T extends Record<string, unknown>> {
//   data: T[];
//   columns: Column<T>[];
//   defaultSortField?: keyof T;
//   defaultSortOrder?: "asc" | "desc";
//   rowId?: keyof T;
//   ariaLabel?: string;
//   className?: string;
//   tableContainerClassName?: string;
//   tableClassName?: string;
//   theadClassName?: string;
//   tbodyClassName?: string;
//   headerRowClassName?: string;
//   headerButtonClassName?: string;
//   rowClassName?: string | ((row: T, rowIndex: number) => string);
//   noDataClassName?: string;
//   sortAscIcon?: React.ReactNode;
//   sortDescIcon?: React.ReactNode;
//   sortDefaultIcon?: React.ReactNode;
//   enableRowSelection?: boolean;
//   isAllSelected?: boolean;
//   onSelectAll?: (isChecked: boolean) => void;
// }

// const DataTable = <T extends Record<string, unknown>>({
//   data,
//   columns,
//   defaultSortField,
//   defaultSortOrder = "asc",
//   rowId,
//   ariaLabel = "Data Table",
//   className = "",
//   tableContainerClassName = "border border-gray-300 rounded-md max-h-[500px] overflow-auto",
//   tableClassName = "table-auto min-w-full border-separate border-spacing-0",
//   theadClassName = "sticky top-0 z-30 bg-gray-100",
//   tbodyClassName = "bg-white text-start",
//   headerRowClassName = "",
//   headerButtonClassName = "flex items-center gap-1 w-full text-start",
//   rowClassName = "hover:bg-gray-50",
//   noDataClassName = "px-4 py-4 text-gray-500 text-center",
//   sortAscIcon = <FaSortUp />,
//   sortDescIcon = <FaSortDown />,
//   sortDefaultIcon = <FaSort className="text-gray-400" />,
//   enableRowSelection = false,
//   isAllSelected = false,
//   onSelectAll = () => {},
// }: DataTableProps<T>) => {
//   // -------------------------
//   // Utilities
//   // -------------------------
//   const parseWidthToPx = (w?: string): number => {
//     if (!w) return 150;
//     const trimmed = String(w).trim();
//     if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10); // "150"
//     const m = trimmed.match(/^(\d+(?:\.\d+)?)(px|rem|em)$/i);
//     if (m) {
//       const val = parseFloat(m[1]);
//       const unit = m[2].toLowerCase();
//       if (unit === "px") return Math.round(val);
//       if (unit === "rem" || unit === "em") return Math.round(val * 16); // approximate
//     }
//     return 150; // fallback for %, vw, etc.
//   };

//   const buildStableKey = (col: Column<T>, index: number) =>
//     typeof col.accessor === "function" ? `__fn_${index}` : String(col.accessor);

//   // -------------------------
//   // State
//   // -------------------------
//   const [sortField, setSortField] = useState<string | undefined>(
//     defaultSortField ? String(defaultSortField) : undefined
//   );
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

//   // -------------------------
//   // Memoized column prep
//   // -------------------------
//   const visibleColumns = useMemo(
//     () => columns.filter((c) => !c.hidden),
//     [columns]
//   );

//   const headerKeys = useMemo(
//     () => visibleColumns.map((c, i) => buildStableKey(c, i)),
//     [visibleColumns]
//   );

//   const columnMap = useMemo(
//     () => new Map(visibleColumns.map((c, i) => [headerKeys[i], c] as const)),
//     [visibleColumns, headerKeys]
//   );

//   const colPxWidths = useMemo(
//     () => visibleColumns.map((c) => parseWidthToPx(c.width)),
//     [visibleColumns]
//   );

//   // cumulative left widths for stickyAfter
//   const cumulativeLeft = useMemo(() => {
//     const out = [0];
//     let sum = 0;
//     for (let i = 0; i < colPxWidths.length; i++) {
//       sum += colPxWidths[i] ?? 150;
//       out.push(sum);
//     }
//     return out; // length = cols + 1
//   }, [colPxWidths]);

//   // Sticky states
//   const stickyStates = useMemo(() => {
//     return visibleColumns.map((col, index) => {
//       let isSticky = false;
//       let side: "left" | "right" | null = null;
//       let offset = 0;

//       if (col.fixed) {
//         isSticky = true;
//         side = col.fixed;
//       } else if (typeof col.stickyAfter === "number") {
//         isSticky = index > col.stickyAfter;
//         side = "left";
//         if (isSticky) {
//           offset = cumulativeLeft[col.stickyAfter + 1] || 0;
//         }
//       }

//       return { isSticky, side, offset };
//     });
//   }, [visibleColumns, cumulativeLeft]);

//   // Offsets for pinned left/right columns in px
//   const [columnStyles, headerStyles] = useMemo(() => {
//     let leftAccum = 0;
//     const leftOffsets = visibleColumns.map((col, idx) => {
//       const off = leftAccum;
//       if (col.fixed === "left") leftAccum += colPxWidths[idx] ?? 150;
//       return off;
//     });

//     let rightAccum = 0;
//     const rightOffsets = visibleColumns
//       .slice()
//       .reverse()
//       .map((col, ridx) => {
//         const off = rightAccum;
//         if (col.fixed === "right") {
//           const realIdx = visibleColumns.length - 1 - ridx;
//           rightAccum += colPxWidths[realIdx] ?? 150;
//         }
//         return off;
//       })
//       .reverse();

//     const colStyles = visibleColumns.map((col, idx) => {
//       const widthPx = colPxWidths[idx] ?? 150;
//       const state = stickyStates[idx];

//       const style: React.CSSProperties = {
//         width: `${widthPx}px`,
//         minWidth: `${widthPx}px`,
//         maxWidth: `${widthPx}px`,
//       };

//       if (state.isSticky) {
//         style.position = "sticky";
//         style.zIndex = 20;

//         if (state.side === "right") {
//           style.right = rightOffsets[idx];
//         } else {
//           style.left = col.fixed === "left" ? leftOffsets[idx] : state.offset;
//         }
//       }

//       return style;
//     });

//     const headStyles = colStyles.map((s, idx) =>
//       stickyStates[idx].isSticky ? { ...s, zIndex: 30 } : s
//     );

//     return [colStyles, headStyles] as const;
//   }, [visibleColumns, stickyStates, colPxWidths]);

//   // -------------------------
//   // Sorting
//   // -------------------------
//   const sortedData = useMemo(() => {
//     if (!sortField) return data;
//     const column = columnMap.get(sortField);
//     if (!column) return data;

//     const getValue = (item: T) =>
//       typeof column.accessor === "function"
//         ? column.accessor(item)
//         : item[column.accessor as keyof T];

//     const compare = (a: unknown, b: unknown) => {
//       const dir = sortOrder === "asc" ? 1 : -1;

//       if (a == null && b == null) return 0;
//       if (a == null) return -1 * dir;
//       if (b == null) return 1 * dir;

//       if (typeof a === "number" && typeof b === "number") {
//         return (a - b) * dir;
//       }

//       if (typeof a === "boolean" && typeof b === "boolean") {
//         return (+a - +b) * dir;
//       }

//       if (a instanceof Date && b instanceof Date) {
//         return (a.getTime() - b.getTime()) * dir;
//       }

//       // date-like strings
//       const aTime = typeof a === "string" ? Date.parse(a) : NaN;
//       const bTime = typeof b === "string" ? Date.parse(b) : NaN;
//       if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
//         return (aTime - bTime) * dir;
//       }

//       return String(a).localeCompare(String(b)) * dir;
//     };

//     return [...data].sort((ra, rb) => compare(getValue(ra), getValue(rb)));
//   }, [data, sortField, sortOrder, columnMap]);

//   // -------------------------
//   // Handlers
//   // -------------------------
//   const handleSort = useCallback((colKey: string) => {
//     setSortField((prev) => {
//       if (prev === colKey) {
//         setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
//         return colKey;
//       }
//       setSortOrder("asc");
//       return colKey;
//     });
//   }, []);

//   // -------------------------
//   // Render
//   // -------------------------
//   return (
//     <div
//       className={`w-full text-xs font-medium overflow-x-auto ${className}`}
//       role="region"
//       aria-label={ariaLabel}
//       tabIndex={0}
//     >
//       <div className={tableContainerClassName}>
//         <table className={tableClassName}>
//           {/* Keep header/body width aligned */}
//           <colgroup>
//             {visibleColumns.map((_, idx) => (
//               <col
//                 key={`col-${idx}`}
//                 style={{ width: columnStyles[idx].width }}
//               />
//             ))}
//           </colgroup>

//           <thead className={theadClassName}>
//             <tr className={headerRowClassName}>
//               {visibleColumns.map((col, idx) => {
//                 const colKey = headerKeys[idx];
//                 const isSorted = sortField === colKey;
//                 const ariaSort = isSorted
//                   ? sortOrder === "asc"
//                     ? "ascending"
//                     : "descending"
//                   : "none";

//                 if (col.accessor === "selection" && enableRowSelection) {
//                   return (
//                     <th
//                       key={idx}
//                       scope="col"
//                       className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap bg-gray-100 ${
//                         col.headerClassName || "text-gray-600"
//                       } ${
//                         stickyStates[idx].isSticky
//                           ? "shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.1)]"
//                           : ""
//                       }`}
//                       style={headerStyles[idx]}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={isAllSelected}
//                         onChange={(e) => onSelectAll(e.target.checked)}
//                         aria-label="Select all rows"
//                       />
//                     </th>
//                   );
//                 }

//                 return (
//                   <th
//                     key={idx}
//                     scope="col"
//                     className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap bg-gray-100 ${
//                       col.headerClassName || "text-gray-600"
//                     } ${
//                       stickyStates[idx].isSticky
//                         ? "shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.1)]"
//                         : ""
//                     }`}
//                     style={headerStyles[idx]}
//                     aria-sort={ariaSort}
//                   >
//                     <button
//                       type="button"
//                       className={
//                         col.headerButtonClassName ?? headerButtonClassName
//                       }
//                       onClick={() => handleSort(colKey)}
//                       aria-label={
//                         col.ariaLabel ||
//                         `Sort by ${col.header} ${
//                           isSorted
//                             ? sortOrder === "asc"
//                               ? "descending"
//                               : "ascending"
//                             : "ascending"
//                         }`
//                       }
//                     >
//                       {col.header}
//                       {isSorted ? (
//                         sortOrder === "asc" ? (
//                           <span className={col.sortIconClassName}>
//                             {sortAscIcon}
//                           </span>
//                         ) : (
//                           <span className={col.sortIconClassName}>
//                             {sortDescIcon}
//                           </span>
//                         )
//                       ) : (
//                         <span className={col.sortIconClassName}>
//                           {sortDefaultIcon}
//                         </span>
//                       )}
//                     </button>
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>

//           <tbody className={tbodyClassName}>
//             {sortedData.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={visibleColumns.length}
//                   className={`${noDataClassName} py-8`}
//                 >
//                   No data available
//                 </td>
//               </tr>
//             ) : (
//               sortedData.map((row, rowIndex) => {
//                 const key =
//                   rowId && row[rowId] != null
//                     ? String(row[rowId])
//                     : `row-${rowIndex}`;

//                 const rowClass =
//                   typeof rowClassName === "function"
//                     ? rowClassName(row, rowIndex)
//                     : rowClassName;

//                 return (
//                   <tr key={key} className={rowClass} data-row-id={key}>
//                     {visibleColumns.map((col, colIndex) => {
//                       const rawValue =
//                         typeof col.accessor === "function"
//                           ? col.accessor(row)
//                           : row[col.accessor as keyof T];

//                       const content = col.cell ? col.cell(row) : rawValue;

//                       const cellClass =
//                         typeof col.cellClassName === "function"
//                           ? col.cellClassName(row, rowIndex)
//                           : col.cellClassName || "";

//                       let rendered: React.ReactNode;
//                       if (content === null || content === undefined) {
//                         rendered = <span className="text-gray-400">-</span>;
//                       } else if (
//                         typeof content === "string" ||
//                         typeof content === "number" ||
//                         typeof content === "boolean" ||
//                         React.isValidElement(content)
//                       ) {
//                         rendered = content as React.ReactNode;
//                       } else {
//                         try {
//                           rendered = JSON.stringify(content) ?? (
//                             <span className="text-gray-400">-</span>
//                           );
//                         } catch {
//                           rendered = String(content);
//                         }
//                       }

//                       const style: React.CSSProperties = {
//                         ...columnStyles[colIndex],
//                         ...(stickyStates[colIndex].isSticky
//                           ? { background: "white" }
//                           : null),
//                       };

//                       return (
//                         <td
//                           key={colIndex}
//                           className={`px-4 py-3 whitespace-nowrap ${cellClass}`}
//                           style={style}
//                         >
//                           {rendered}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DataTable;
