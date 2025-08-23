// import React from "react";
// import {
//   FieldErrors,
//   UseFormRegister,
//   FieldValues,
//   Path,
// } from "react-hook-form";

// interface TextAreaInputProps<T extends FieldValues> {
//   id?: string;
//   name: Path<T>;
//   label: string;
//   className?: string;
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   disabled?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   rows?: number;
//   defaultValue?: string;
// }

// const TextAreaInput = <T extends FieldValues>({
//   id,
//   name,
//   label,
//   className,
//   register,
//   errors,
//   disabled = false,
//   required = false,
//   placeholder = "",
//   rows = 4,
//   defaultValue = "",
// }: TextAreaInputProps<T>) => {
//   const error = errors[name];

//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         htmlFor={id || name}
//         className="text-xs font-semibold text-gray-800"
//       >
//         {label} {required && <span className="text-red-700">*</span>}
//       </label>
//       <textarea
//         id={id || name}
//         placeholder={placeholder}
//         {...register(name)}
//         defaultValue={defaultValue}
//         rows={rows}
//         className={`p-2 border rounded-md ${className || ""} ${
//           error
//             ? "border-red-500"
//             : "border-gray-300 focus:outline-none focus:ring-0 focus:shadow-md"
//         }`}
//         disabled={disabled}
//       />
//       {error && (
//         <p className="text-red-500 text-sm">{error.message?.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default TextAreaInput;

"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  useFormContext,
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

interface TextAreaInputProps<T extends FieldValues> {
  id?: string;
  name?: Path<T>; // Optional for standalone usage
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  // Controlled input support
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  // react-hook-form props (for direct register/errors passing)
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  // Error handling
  error?: string;
  // Accessibility
  ariaLabel?: string;
}

const TextAreaInput = <T extends FieldValues>({
  id,
  name,
  label,
  className = "",
  disabled = false,
  required = false,
  placeholder = "",
  rows = 4,
  value: externalValue,
  defaultValue = "",
  onChange: externalOnChange,
  register: externalRegister,
  errors: externalErrors,
  error: externalError,
  ariaLabel,
}: TextAreaInputProps<T>) => {
  // Optional form context for react-hook-form
  const formContext = useFormContext<T>();
  const isRHFControlled = !!name && (!!formContext || !!externalRegister);

  // Internal state for fully uncontrolled mode
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Determine if externally controlled
  const isExternallyControlled =
    externalValue !== undefined && externalOnChange !== undefined;

  // Get current value based on mode
  const currentValue = isExternallyControlled
    ? externalValue
    : isRHFControlled
    ? undefined
    : internalValue;

  // Get error state
  const rhfError = isRHFControlled
    ? externalErrors
      ? externalErrors[name]?.message?.toString()
      : formContext?.formState.errors[name]?.message?.toString()
    : null;
  const error = externalError ?? rhfError;

  // Memoize inputId to avoid recalculation
  const inputId = useMemo(
    () => id || name || label.toLowerCase().replace(/\s+/g, "-"),
    [id, name, label]
  );

  // Unified change handler
  const handleChange = useCallback(
    (value: string) => {
      if (isExternallyControlled) {
        externalOnChange?.(value);
      } else if (!isRHFControlled) {
        setInternalValue(value);
        externalOnChange?.(value);
      }
    },
    [isExternallyControlled, isRHFControlled, externalOnChange]
  );

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label htmlFor={inputId} className="text-xs font-medium text-gray-800">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      {isRHFControlled && (externalRegister || formContext) ? (
        <textarea
          id={inputId}
          {...(externalRegister
            ? externalRegister(name as Path<T>, { required })
            : formContext.register(name as Path<T>, { required }))}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-label={ariaLabel || label}
          className={`w-full focus:outline-none focus:ring-0 px-3 py-2 text-sm border rounded-md resize-none transition
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}`}
        />
      ) : (
        <textarea
          id={inputId}
          placeholder={placeholder}
          rows={rows}
          value={currentValue ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-label={ariaLabel || label}
          className={`w-full focus:outline-none focus:ring-0 px-3 py-2 text-sm border rounded-md resize-none transition
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}`}
        />
      )}

      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextAreaInput;
