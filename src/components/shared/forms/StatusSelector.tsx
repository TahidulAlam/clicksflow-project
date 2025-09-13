"use client";
import React, { useEffect, useState } from "react";
import {
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  Path,
  PathValue,
} from "react-hook-form";

interface StatusOption {
  value: string;
  label: string;
  dotColor?: string;
}

interface StatusSelectorProps<T extends Record<string, unknown>> {
  label?: string;
  fieldName?: Path<T>;
  setValue?: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
  errors?: FieldErrors<T>;
  value?: string;
  className?: string;
  onChange?: (val: string) => void;
  isSubmitting?: boolean;
  isLoading?: boolean;
  required?: boolean;
  showDot?: boolean;
  options?: StatusOption[];
}

const defaultOptions: StatusOption[] = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "pending", label: "Pending", dotColor: "bg-yellow-400" },
  { value: "paused", label: "Paused", dotColor: "bg-orange-600" },
  { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
];

const StatusSelector = <T extends Record<string, unknown>>({
  label,
  fieldName,
  setValue,
  watch,
  errors,
  value,
  onChange,
  className = "",
  isSubmitting = false,
  required = false,
  isLoading = false,
  showDot = false,
  options = defaultOptions,
}: StatusSelectorProps<T>) => {
  const disabled = isSubmitting || isLoading;
  const statusOptions = options.length > 0 ? options : defaultOptions;

  const [internalValue, setInternalValue] = useState<string>();

  const rhfValue =
    fieldName && watch
      ? (watch(fieldName) as unknown as string | undefined)
      : undefined;

  const currentValue =
    value !== undefined
      ? value
      : rhfValue !== undefined
      ? rhfValue
      : internalValue;

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    } else if (rhfValue !== undefined) {
      setInternalValue(rhfValue);
    }
  }, [value, rhfValue]);

  useEffect(() => {
    if (!currentValue && statusOptions[0]) {
      const initial = statusOptions[0].value;
      if (onChange) {
        onChange(initial);
      } else if (fieldName && setValue) {
        setValue(fieldName, initial as PathValue<T, Path<T>>);
      } else {
        setInternalValue(initial);
      }
    }
  }, [currentValue, onChange, setValue, fieldName, statusOptions]);

  const handleSelect = (val: string) => {
    if (onChange) {
      onChange(val);
    } else if (fieldName && setValue) {
      setValue(fieldName, val as PathValue<T, Path<T>>);
    }
    setInternalValue(val);
  };

  return (
    <div className={`flex flex-col lg:gap-2 gap-1 my-4 ${className || ""}`}>
      <label className="text-xs font-semibold text-gray-800 capitalize whitespace-nowrap">
        {label || fieldName}
        {required && <span className="text-red-700">*</span>}
      </label>

      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg border-gray-300 border">
        {statusOptions?.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className={`flex-1 text-xs flex items-center justify-center gap-2 lg:px-[4px] px-2 py-1 whitespace-nowrap rounded-md transition
              ${
                currentValue === option.value
                  ? "bg-white border border-gray-300"
                  : "bg-transparent"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            disabled={disabled}
          >
            {showDot && option?.dotColor && (
              <span className={`w-2.5 h-2.5 rounded-full ${option.dotColor}`} />
            )}
            <span className="text-gray-500 text-xs">{option.label}</span>
          </button>
        ))}
      </div>

      {fieldName && errors?.[fieldName] && (
        <p className="text-red-500 text-sm">
          {errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default StatusSelector;
