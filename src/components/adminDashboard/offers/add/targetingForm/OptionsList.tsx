"use client";
import { useMemo } from "react";

interface OptionsListProps<T> {
  category: string;
  options: T[];
  search: string;
  setSearch: (value: string) => void;
  currentIncluded: T[];
  currentExcluded: T[];
  onAdd: (value: T, type: "include" | "exclude") => void;
  onShowList: (type: "include" | "exclude") => void;
  getLabel?: (item: T) => string;
}

export default function OptionsList<T>({
  category,
  options,
  search,
  setSearch,
  currentIncluded,
  currentExcluded,
  onAdd,
  onShowList,
  getLabel = (item) => String(item),
}: OptionsListProps<T>) {
  const filtered = useMemo(
    () =>
      options.filter((opt) =>
        getLabel(opt).toLowerCase().includes(search.toLowerCase())
      ),
    [options, search, getLabel]
  );

  return (
    <div className="px-2">
      <input
        type="text"
        placeholder={`Search ${category.toLowerCase()}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded shadow-sm text-xs font-bold"
      />
      <div className="max-h-[300px] overflow-y-auto flex flex-col gap-1">
        {filtered.map((opt) => {
          const label = getLabel(opt);
          const included = currentIncluded.includes(opt);
          const excluded = currentExcluded.includes(opt);
          return (
            <div
              key={label}
              className="flex justify-between text-base items-center px-1 py-1 bg-gray-50 border border-gray-300 rounded"
            >
              <span className="text-md text-gray-700">{label}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onAdd(opt, "include");
                    onShowList("include");
                  }}
                  disabled={included}
                  className={`text-lg px-1 ${
                    included
                      ? "text-gray-400 bg-gray-300"
                      : "text-gray-500 bg-gray-100"
                  }`}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onAdd(opt, "exclude");
                    onShowList("exclude");
                  }}
                  disabled={excluded}
                  className={`text-lg px-1 ${
                    excluded
                      ? "text-gray-400 bg-slate-300"
                      : "text-gray-500 bg-slate-100"
                  }`}
                >
                  –
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
