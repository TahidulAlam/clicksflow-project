// components/shared/dataTable/DataListSkeleton.tsx
import React from "react";
import Skeleton from "./Skeleton";

interface DataListSkeletonProps {
  rows?: number;
  columns?: number;
  showToolbar?: boolean;
  showPagination?: boolean;
}

const DataListSkeleton: React.FC<DataListSkeletonProps> = ({
  rows = 5,
  columns = 5,
  showToolbar = true,
  showPagination = true,
}) => {
  return (
    <div className="space-y-4">
      {/* Title */}
      <Skeleton className="h-6 w-48" />

      {/* Toolbar */}
      {showToolbar && (
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-40" />
        </div>
      )}

      {/* Table Header */}
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton key={colIdx} className="h-6 w-full" />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataListSkeleton;
