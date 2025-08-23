"use client";
import React from "react";

interface FlexRowProps {
  children: React.ReactNode;
  cols?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap?: string | number;
  className?: string;
}

const FlexRow: React.FC<FlexRowProps> = ({
  children,
  cols = { base: 1, sm: 2, lg: 3 },
  gap = "gap-4",
  className = "",
}) => {
  const colClasses = [
    cols.base ? `grid-cols-${cols.base}` : "grid-cols-1",
    cols.sm ? `sm:grid-cols-${cols.sm}` : "",
    cols.md ? `md:grid-cols-${cols.md}` : "",
    cols.lg ? `lg:grid-cols-${cols.lg}` : "",
    cols.xl ? `xl:grid-cols-${cols.xl}` : "",
    cols["2xl"] ? `2xl:grid-cols-${cols["2xl"]}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`grid w-full ${colClasses} ${gap} ${className}`}>
      {children}
    </div>
  );
};

export default FlexRow;
