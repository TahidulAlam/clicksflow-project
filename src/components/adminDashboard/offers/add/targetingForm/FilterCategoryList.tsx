import React from "react";

interface FilterCategoryListProps<T extends string> {
  title?: string;
  items: T[];
  active: T | null;
  onSelect: (item: T) => void;
  direction?: "vertical" | "horizontal";
  className?: string;
  renderItem?: (item: T) => React.ReactNode;
}

export default function FilterCategoryList<T extends string>({
  title,
  items,
  active,
  onSelect,
  direction = "vertical",
  className = "",
  renderItem,
}: FilterCategoryListProps<T>) {
  return (
    <>
      <aside className={className}>
        {title && (
          <h2 className="text-xs font-bold text-gray-700 mb-2">{title}</h2>
        )}
        <div
          className={`flex gap-2 ${
            direction === "vertical" ? "flex-col" : "flex-row flex-wrap"
          }`}
        >
          {items.map((item) => {
            const isActive = item === active;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onSelect(item)}
                className={`text-left border text-xs font-medium px-3 py-1.5 rounded transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {renderItem ? renderItem(item) : item}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
