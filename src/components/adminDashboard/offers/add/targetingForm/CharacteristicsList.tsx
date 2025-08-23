import React from "react";

interface FilterCategoryListProps<T extends string> {
  title: string;
  items: T[];
  active: T | null;
  onSelect: (item: T) => void;
}

export default function FilterCategoryList<T extends string>({
  title,
  items,
  active,
  onSelect,
}: FilterCategoryListProps<T>) {
  return (
    <aside>
      <h2 className="text-xs font-bold text-gray-700 mb-2">{title}</h2>
      <div className="flex flex-col gap-2">
        {items.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(label)}
            className={`text-left border border-gray-300 text-xs font-medium px-3 py-1.5 rounded transition ${
              label === active
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}
