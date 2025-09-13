"use client";

import React, { memo } from "react";

interface ArrowLineProps {
  direction?: "right" | "left" | "up" | "down";
  length?: number;
  strokeWidth?: number;
  showArrowHead?: boolean;
  className?: string;
  color?: string;
}

const ArrowLine: React.FC<ArrowLineProps> = memo(
  ({
    direction = "down",
    length = 20,
    strokeWidth = 1.1,
    showArrowHead = false,
    className = "ml-5",
    color = "rgb(189, 189, 189)",
  }) => {
    switch (direction) {
      case "down":
        return (
          <svg width={strokeWidth * 4} height={length} className={className}>
            <line
              x1={strokeWidth * 1.5}
              y1="0"
              x2={strokeWidth * 1.5}
              y2={length - (showArrowHead ? 10 : 0)}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            {showArrowHead && (
              <polyline
                points={`${strokeWidth},${length - 10} ${
                  strokeWidth * 2
                },${length} ${strokeWidth * 3},${length - 10}`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
              />
            )}
          </svg>
        );

      case "up":
        return (
          <svg width={strokeWidth * 4} height={length} className={className}>
            <line
              x1={strokeWidth * 2}
              y1={showArrowHead ? 10 : 0}
              x2={strokeWidth * 2}
              y2={length}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            {showArrowHead && (
              <polyline
                points={`${strokeWidth},10 ${strokeWidth * 2},0 ${
                  strokeWidth * 3
                },10`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
              />
            )}
          </svg>
        );

      case "right":
        return (
          <svg width={length} height={strokeWidth * 4} className={className}>
            <line
              x1="0"
              y1={strokeWidth * 1.5}
              x2={length - (showArrowHead ? 10 : 0)}
              y2={strokeWidth * 1.5}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            {showArrowHead && (
              <polyline
                points={`${length - 10},${strokeWidth} ${length},${
                  strokeWidth * 2
                } ${length - 10},${strokeWidth * 1.5}`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
              />
            )}
          </svg>
        );

      case "left":
      default:
        return (
          <svg width={length} height={strokeWidth * 4} className={className}>
            <line
              x1={showArrowHead ? 10 : 0}
              y1={strokeWidth * 1.5}
              x2={length}
              y2={strokeWidth * 1.5}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            {showArrowHead && (
              <polyline
                points={`10,${strokeWidth} 0,${strokeWidth * 2} 10,${
                  strokeWidth * 3
                }`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
              />
            )}
          </svg>
        );
    }
  }
);

ArrowLine.displayName = "ArrowLine";

export default ArrowLine;
