"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  useFormContext,
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import ColorPickerButton from "./ColorPickerButton";

interface TextInputProps<T extends FieldValues> {
  name?: Path<T>;
  label: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  inputRightIcon?: React.ReactNode;
  inputLeftIcon?: React.ReactNode;
  showColorPicker?: boolean;
  onColorChange?: (color: string) => void;
  error?: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  ariaLabel?: string;
}

const TextInput = <T extends FieldValues>({
  name,
  label,
  disabled = false,
  required = false,
  placeholder = "",
  className = "",
  inputClassName = "",
  type = "text",
  value: externalValue,
  defaultValue = "",
  onChange: externalOnChange,
  inputRightIcon,
  inputLeftIcon,
  showColorPicker = false,
  onColorChange,
  error: externalError,
  register: externalRegister,
  errors: externalErrors,
  ariaLabel,
}: TextInputProps<T>) => {
  const formContext = useFormContext<T>();
  const isRHFControlled = !!name && (!!formContext || !!externalRegister);

  const [internalValue, setInternalValue] = useState(defaultValue);

  const isExternallyControlled =
    externalValue !== undefined && externalOnChange !== undefined;

  const currentValue = isExternallyControlled
    ? externalValue
    : isRHFControlled
    ? undefined
    : internalValue;

  const rhfError = isRHFControlled
    ? externalErrors
      ? externalErrors[name]?.message?.toString()
      : formContext?.formState.errors[name]?.message?.toString()
    : null;
  const error = externalError ?? rhfError;

  const inputId = useMemo(
    () => name || label.toLowerCase().replace(/\s+/g, "-"),
    [name, label]
  );

  const hasLeftIcon = useMemo(
    () => !!inputLeftIcon || showColorPicker,
    [inputLeftIcon, showColorPicker]
  );
  const hasRightIcon = useMemo(() => !!inputRightIcon, [inputRightIcon]);

  const handleChange = useCallback(
    (value: string) => {
      if (isExternallyControlled) {
        externalOnChange?.(value);
      } else if (!isRHFControlled) {
        setInternalValue(value);
        externalOnChange?.(value);
      }
      if (showColorPicker) {
        onColorChange?.(value);
      }
    },
    [
      isExternallyControlled,
      isRHFControlled,
      externalOnChange,
      showColorPicker,
      onColorChange,
    ]
  );

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label htmlFor={inputId} className="text-xs font-semibold text-gray-800">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div className="relative w-full">
        {hasLeftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center">
            {showColorPicker ? (
              <ColorPickerButton
                value={currentValue}
                onChange={handleChange}
                showColorPreview
              />
            ) : (
              <div className="text-gray-900 bg-gray-200 px-3 rounded-l-md lg:h-[30px] h-[30px] flex items-center">
                {inputLeftIcon}
              </div>
            )}
          </div>
        )}

        {isRHFControlled && (externalRegister || formContext) ? (
          <input
            id={inputId}
            type={type}
            placeholder={placeholder}
            {...(externalRegister
              ? externalRegister(name as Path<T>, { required })
              : formContext.register(name as Path<T>, { required }))}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-label={ariaLabel || label}
            className={`w-full lg:h-[30px] h-[30px] border rounded-md transition-shadow duration-200
              focus:outline-none focus:ring-0 focus:shadow-md
              ${hasLeftIcon ? "pl-12" : "pl-3"}
              ${hasRightIcon ? "pr-10" : "pr-3"}
              ${error ? "border-red-500" : "border-gray-300"}
              ${inputClassName}`}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            placeholder={placeholder}
            value={currentValue ?? ""}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-label={ariaLabel || label}
            className={`w-full lg:h-[30px] h-[30px] border rounded-md transition-shadow duration-200
              focus:outline-none focus:ring-0 focus:shadow-md
              ${hasLeftIcon ? "pl-12" : "pl-3"}
              ${hasRightIcon ? "pr-10" : "pr-3"}
              ${error ? "border-red-500" : "border-gray-300"}
              ${inputClassName}`}
          />
        )}

        {hasRightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center text-gray-900 bg-gray-200 lg:h-[30px] h-[30px] px-2 rounded-r-md">
            {inputRightIcon}
          </div>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
