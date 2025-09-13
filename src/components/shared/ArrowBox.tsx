"use client";

import React, { ReactNode, memo } from "react";

interface ArrowBoxProps {
  children: ReactNode;
  className?: string;
}

const ArrowBox: React.FC<ArrowBoxProps> = memo(
  ({
    children,
    className = "rounded-lg border border-gray-300 py-4 px-4 w-full",
  }) => {
    return <div className={className}>{children}</div>;
  }
);

ArrowBox.displayName = "ArrowBox";

export default ArrowBox;
