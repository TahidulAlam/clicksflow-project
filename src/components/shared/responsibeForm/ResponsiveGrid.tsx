"use client";

import React from "react";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: Partial<Record<Breakpoint, number>>;
  gap?: string;
  rows?: string;
}

const breakpoints: Breakpoint[] = ["base", "sm", "md", "lg", "xl", "2xl"];

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { base: 1, sm: 2, lg: 3 },
  gap = "gap-4",
  rows = "",
  className = "",
  ...rest
}) => {
  const generateGridClasses = () => {
    const classes = ["grid"];
    breakpoints.forEach((bp) => {
      const columns = cols[bp];
      if (!columns) return;

      const prefix = bp === "base" ? "" : `${bp}:`;
      classes.push(`${prefix}grid-cols-${columns}`);
    });
    if (gap) classes.push(gap);
    if (rows) classes.push(rows);

    return classes.join(" ");
  };

  return (
    <div className={`${generateGridClasses()} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
