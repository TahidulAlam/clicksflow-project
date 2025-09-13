// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */

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
//   cellClassName?: string;
//   rowClassName?: string | ((row: T, rowIndex: number) => string);
//   noDataClassName?: string;
//   sortAscIcon?: React.ReactNode;
//   sortDescIcon?: React.ReactNode;
//   sortDefaultIcon?: React.ReactNode;
//   enableRowSelection?: boolean;
//   isAllSelected?: boolean;
//   onSelectAll?: (isChecked: boolean) => void;
// }
// // #F3F4F6
// // #E8EAEE
// const DataTable = <T extends Record<string, unknown>>({
//   data,
//   columns,
//   defaultSortField,
//   defaultSortOrder = "asc",
//   rowId,
//   ariaLabel = "Data Table",
//   className = "",
//   tableContainerClassName = "border border-gray-300 rounded-md max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
//   tableClassName = "table-auto min-w-full border-separate border-spacing-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
//   theadClassName = "sticky top-0 z-30 bg-[#E8EAEE]",
//   tbodyClassName = "bg-[#F2F7FD] text-start",
//   headerRowClassName = "bg-[#E8EAEE]",
//   headerButtonClassName,
//   cellClassName,
//   rowClassName = "",
//   noDataClassName = "px-4 py-4 text-gray-500 text-center",
//   sortAscIcon = <FaSortUp />,
//   sortDescIcon = <FaSortDown />,
//   sortDefaultIcon = <FaSort className="text-gray-400" />,
//   enableRowSelection = false,
//   isAllSelected = false,
//   onSelectAll = () => {},
// }: DataTableProps<T>) => {
//   const parseWidthToPx = (w?: string): number => {
//     if (!w) return 150;
//     const trimmed = String(w).trim();
//     if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10);
//     const m = trimmed.match(/^(\d+(?:\.\d+)?)(px|rem|em)$/i);
//     if (m) {
//       const val = parseFloat(m[1]);
//       const unit = m[2].toLowerCase();
//       if (unit === "px") return Math.round(val);
//       if (unit === "rem" || unit === "em") return Math.round(val * 16);
//     }
//     return 150;
//   };

//   const buildStableKey = (col: Column<T>, index: number) =>
//     typeof col.accessor === "function" ? `__fn_${index}` : String(col.accessor);

//   const [sortField, setSortField] = useState<string | undefined>(
//     defaultSortField ? String(defaultSortField) : undefined
//   );
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

//   const visibleColumns = useMemo(
//     () => columns.filter((c) => !c.hidden),
//     [columns]
//   );

//   const headerKeys = useMemo(
//     () => visibleColumns.map((c, i) => buildStableKey(c, i)),
//     [visibleColumns, buildStableKey]
//   );

//   const columnMap = useMemo(
//     () => new Map(visibleColumns.map((c, i) => [headerKeys[i], c] as const)),
//     [visibleColumns, headerKeys]
//   );

//   const colPxWidths = useMemo(
//     () => visibleColumns.map((c) => parseWidthToPx(c.width)),
//     [visibleColumns]
//   );

//   const cumulativeLeft = useMemo(() => {
//     const out = [0];
//     let sum = 0;
//     for (let i = 0; i < colPxWidths.length; i++) {
//       sum += colPxWidths[i] ?? 150;
//       out.push(sum);
//     }
//     return out;
//   }, [colPxWidths]);

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

//       const aTime = typeof a === "string" ? Date.parse(a) : NaN;
//       const bTime = typeof b === "string" ? Date.parse(b) : NaN;
//       if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
//         return (aTime - bTime) * dir;
//       }

//       return String(a).localeCompare(String(b)) * dir;
//     };

//     return [...data].sort((ra, rb) => compare(getValue(ra), getValue(rb)));
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
//       role="region"
//       aria-label={ariaLabel}
//       tabIndex={0}
//     >
//       <div className={tableContainerClassName}>
//         <table className={tableClassName}>
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
//                       className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap ${
//                         col.headerClassName || "text-gray-600"
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
//                     className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap bg-[#E8EAEE] ${
//                       col.headerClassName || "text-gray-600"
//                     }`}
//                     style={headerStyles[idx]}
//                     aria-sort={ariaSort}
//                   >
//                     <button
//                       type="button"
//                       className={`flex items-center gap-1 w-full text-start ${
//                         headerButtonClassName ?? ""
//                       } ${col.headerButtonClassName ?? ""}`}
//                       onClick={() => handleSort(colKey)}
//                       aria-label={`Sort by ${col.header}`}
//                     >
//                       {col.header}
//                       {isSorted
//                         ? sortOrder === "asc"
//                           ? sortAscIcon
//                           : sortDescIcon
//                         : sortDefaultIcon}
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

//                       const columnCellClass =
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
//                           ? { background: "#F2F7FD" }
//                           : null),
//                       };

//                       return (
//                         <td
//                           key={colIndex}
//                           className={`${columnCellClass} ${
//                             cellClassName ?? ""
//                           } px-4 py-3 border-b border-gray-300 align-center whitespace-nowrap`}
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useState, useCallback } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => any);
  cell?: (row: T) => React.ReactNode;
  searchable?: boolean;
  fixed?: "left" | "right";
  stickyAfter?: number;
  width?: string; // supports px, %, fraction (1/3)
  widthClassName?: string; // ✅ Tailwind responsive classes
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
  cellClassName?: string;
  rowClassName?: string | ((row: T, rowIndex: number) => string);
  noDataClassName?: string;
  sortAscIcon?: React.ReactNode;
  sortDescIcon?: React.ReactNode;
  sortDefaultIcon?: React.ReactNode;
  enableRowSelection?: boolean;
  isAllSelected?: boolean;
  onSelectAll?: (isChecked: boolean) => void;
}

// convert px/rem/em/fraction/percent into CSS width
const parseColumnWidth = (w?: string): string => {
  if (!w) return "auto";

  const trimmed = String(w).trim();

  // Percentages → keep as-is
  if (/^\d+%$/.test(trimmed)) return trimmed;

  // Fractional widths → convert to percentage
  if (/^\d+\/\d+$/.test(trimmed)) {
    const [num, den] = trimmed.split("/").map(Number);
    return `${(num / den) * 100}%`;
  }

  // px/rem/em → allow raw CSS value
  if (/^\d+(\.\d+)?(px|rem|em)$/.test(trimmed)) return trimmed;

  return "auto";
};

const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  defaultSortField,
  defaultSortOrder = "asc",
  rowId,
  ariaLabel = "Data Table",
  className = "",
  tableContainerClassName = "border border-gray-300 rounded-md max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
  tableClassName = "table-auto min-w-full border-separate border-spacing-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
  theadClassName = "sticky top-0 z-30 bg-[#E8EAEE]",
  tbodyClassName = "bg-[#F2F7FD] text-start",
  headerRowClassName = "bg-[#E8EAEE]",
  headerButtonClassName,
  cellClassName,
  rowClassName = "",
  noDataClassName = "px-4 py-4 text-gray-500 text-center",
  sortAscIcon = <FaSortUp />,
  sortDescIcon = <FaSortDown />,
  sortDefaultIcon = <FaSort className="text-gray-400" />,
  enableRowSelection = false,
  isAllSelected = false,
  onSelectAll = () => {},
}: DataTableProps<T>) => {
  const buildStableKey = (col: Column<T>, index: number) =>
    typeof col.accessor === "function" ? `__fn_${index}` : String(col.accessor);

  const [sortField, setSortField] = useState<string | undefined>(
    defaultSortField ? String(defaultSortField) : undefined
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

  const visibleColumns = useMemo(
    () => columns.filter((c) => !c.hidden),
    [columns]
  );

  const headerKeys = useMemo(
    () => visibleColumns.map((c, i) => buildStableKey(c, i)),
    [visibleColumns]
  );

  const columnMap = useMemo(
    () => new Map(visibleColumns.map((c, i) => [headerKeys[i], c] as const)),
    [visibleColumns, headerKeys]
  );

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
            {visibleColumns.map((col, idx) => (
              <col
                key={`col-${idx}`}
                className={col.widthClassName} // ✅ Tailwind responsive widths
                style={
                  !col.widthClassName
                    ? { width: parseColumnWidth(col.width) }
                    : undefined
                }
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
                      className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap 
                        ${col.widthClassName ?? ""} 
                        ${col.headerClassName || "text-gray-600"}`}
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
                    className={`px-4 py-4 font-semibold tracking-wider whitespace-nowrap bg-[#E8EAEE] 
                      ${col.widthClassName ?? ""} 
                      ${col.headerClassName || "text-gray-600"}`}
                    aria-sort={ariaSort}
                  >
                    <button
                      type="button"
                      className={`flex items-center gap-1 w-full text-start 
                        ${headerButtonClassName ?? ""} 
                        ${col.headerButtonClassName ?? ""}`}
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

                      return (
                        <td
                          key={colIndex}
                          className={`${columnCellClass} ${cellClassName ?? ""} 
                            ${col.widthClassName ?? ""} 
                            px-4 py-3 border-b border-gray-300 align-center whitespace-nowrap`}
                          style={
                            !col.widthClassName
                              ? { width: parseColumnWidth(col.width) }
                              : undefined
                          }
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
