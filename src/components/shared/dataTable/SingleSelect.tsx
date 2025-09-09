/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useState, useMemo, useRef, useEffect, useId } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";
import { debounce } from "lodash";

export interface OptionType {
  label: string;
  value: string;
}

interface SingleSelectProps {
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  required?: boolean;
  options: OptionType[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: FieldError;
  isDisabled?: boolean;
  suffix?: React.ReactNode;
  showSearch?: boolean;
  selectFirstByDefault?: boolean;
  customModalTrigger?: React.ReactNode;
  customModalTriggerClassName?: string;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  id,
  name,
  label,
  className = "",
  required = false,
  options,
  value: controlledValue,
  onChange: controlledOnChange,
  placeholder = "Select...",
  error,
  isDisabled = false,
  suffix,
  showSearch = true,
  selectFirstByDefault = false,
  customModalTrigger,
  customModalTriggerClassName,
}) => {
  const internalId = useId();
  const inputId = id || internalId;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hasAutoSelected = useRef(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useFormContext();
  const isUncontrolled = !!form?.getValues && !!name;

  const fieldValue = isUncontrolled ? form.watch(name!) : controlledValue;
  const setFieldValue = (val: string) => {
    if (isUncontrolled) form.setValue(name!, val);
    else controlledOnChange?.(val);
  };

  useEffect(() => {
    if (
      selectFirstByDefault &&
      !hasAutoSelected.current &&
      (!fieldValue || fieldValue === "") &&
      options.length > 0
    ) {
      setFieldValue(options[0].value);
      hasAutoSelected.current = true;
    }
  }, [selectFirstByDefault, options, fieldValue]);

  const debouncedSetSearchTerm = useMemo(
    () => debounce((val: string) => setSearchTerm(val), 300),
    []
  );

  useEffect(() => {
    return () => debouncedSetSearchTerm.cancel();
  }, [debouncedSetSearchTerm]);

  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, showSearch]);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === fieldValue) || null,
    [options, fieldValue]
  );

  const handleSelect = (val: string) => {
    setFieldValue(val);
    setShowDropdown(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showDropdown && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showDropdown, showSearch]);

  const errorId = error ? `${inputId}-error` : undefined;
  const dropdownId = `${inputId}-dropdown`;

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-2 relative ${className}`}
      role="combobox"
      aria-expanded={showDropdown}
      aria-controls={dropdownId}
    >
      <div className="flex justify-between items-center">
        {label && (
          <div className="flex justify-between items-center">
            <label
              htmlFor={inputId}
              className="text-xs font-bold text-gray-800"
              id={`${inputId}-label`}
            >
              {label}
              {required && <span className="text-red-700 ml-1">*</span>}
            </label>
            {suffix && <div>{suffix}</div>}
          </div>
        )}
        {customModalTrigger && (
          <div className={customModalTriggerClassName}>
            {customModalTrigger}
          </div>
        )}
      </div>
      <button
        type="button"
        id={inputId}
        onClick={() => setShowDropdown((prev) => !prev)}
        disabled={isDisabled}
        className={`
          w-full flex justify-between items-center text-left text-sm
          border rounded-md px-3 py-[8px] h-[30px] 
          ${error ? "border-red-500" : "border-gray-300"}
          ${isDisabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}
        `}
        aria-haspopup="listbox"
        aria-labelledby={`${inputId}-label`}
        aria-describedby={errorId}
        style={{ outline: "none", boxShadow: "none" }}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {showDropdown && (
        <div
          id={dropdownId}
          className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20"
          role="listbox"
        >
          {showSearch && (
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              onChange={(e) => debouncedSetSearchTerm(e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-[8px] h-[30px] border-b border-gray-200 text-sm sticky top-0 bg-white"
              aria-label="Search options"
              style={{ outline: "none", boxShadow: "none" }}
            />
          )}

          <ul className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => (
                <li
                  key={opt.value}
                  id={`${inputId}-option-${index}`}
                  className={`px-3 py-[8px] h-[30px] border-b border-gray-200 text-sm cursor-pointer hover:bg-gray-100 ${
                    fieldValue === opt.value ? "bg-blue-50 text-blue-700" : ""
                  }`}
                  onClick={() => handleSelect(opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSelect(opt.value);
                      e.preventDefault();
                    }
                  }}
                  role="option"
                  aria-selected={fieldValue === opt.value}
                  tabIndex={0}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-[8px] text-sm text-gray-500">
                No results
              </li>
            )}
          </ul>
        </div>
      )}

      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default React.memo(SingleSelect);
