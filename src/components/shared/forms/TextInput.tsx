// import React from "react";
// import {
//   FieldErrors,
//   UseFormRegister,
//   FieldValues,
//   Path,
// } from "react-hook-form";

// interface TextInputProps<T extends FieldValues> {
//   name: Path<T>;
//   label: string;
//   register?: UseFormRegister<T>;
//   errors?: FieldErrors<T>;
//   disabled?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   className?: string;
//   inputClassName?: string;
//   type?: string;

//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

//   inputRightIcon?: React.ReactNode;
// }

// const TextInput = <T extends FieldValues>({
//   name,
//   label,
//   register,
//   errors = {},
//   disabled = false,
//   required = false,
//   placeholder = "",
//   className = "",
//   inputClassName = "",
//   type = "text",
//   value,
//   onChange,
//   inputRightIcon,
// }: TextInputProps<T>) => {
//   const error = errors?.[name];

//   return (
//     <div
//       className={
//         "flex flex-col gap-2 w-full" + (className ? ` ${className}` : "")
//       }
//     >
//       <label htmlFor={name} className="text-xs font-bold text-gray-800">
//         {label} {required && <span className="text-red-700">*</span>}
//       </label>

//       <div className="relative w-full">
//         <input
//           id={name}
//           type={type}
//           placeholder={placeholder}
//           {...(register ? register(name) : {})}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//           className={`w-full px-3 h-[38px] border rounded-md transition-shadow duration-200 pr-10 ${inputClassName}
//             ${error ? "border-red-500" : "border-gray-300"}
//             focus:outline-none focus:ring-0 focus:shadow-md`}
//         />

//         {inputRightIcon && (
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             {inputRightIcon}
//           </div>
//         )}
//       </div>

//       {error && (
//         <p className="text-red-500 text-sm">{error.message?.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default TextInput;

"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  useFormContext,
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import ColorPickerButton from "./ColorPickerButton"; // Adjust the import path as needed

interface TextInputProps<T extends FieldValues> {
  name?: Path<T>; // Optional for standalone usage
  label: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  type?: string;
  // Controlled input support
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  // Icons
  inputRightIcon?: React.ReactNode;
  inputLeftIcon?: React.ReactNode;
  // Color picker support
  showColorPicker?: boolean;
  onColorChange?: (color: string) => void;
  // Error handling
  error?: string;
  // react-hook-form props (for direct register/errors passing)
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  // Accessibility
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
    () => name || label.toLowerCase().replace(/\s+/g, "-"),
    [name, label]
  );

  // Memoize icon flags
  const hasLeftIcon = useMemo(
    () => !!inputLeftIcon || showColorPicker,
    [inputLeftIcon, showColorPicker]
  );
  const hasRightIcon = useMemo(() => !!inputRightIcon, [inputRightIcon]);

  // Unified change handler
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
        {/* Left icon or color picker */}
        {hasLeftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center">
            {showColorPicker ? (
              <ColorPickerButton
                value={currentValue}
                onChange={handleChange}
                showColorPreview
              />
            ) : (
              <div className="text-gray-900 bg-gray-200 px-3 rounded-l-md h-[38px] flex items-center">
                {inputLeftIcon}
              </div>
            )}
          </div>
        )}

        {/* Input based on mode */}
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
            className={`w-full h-[38px] border rounded-md transition-shadow duration-200
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
            className={`w-full h-[38px] border rounded-md transition-shadow duration-200
              focus:outline-none focus:ring-0 focus:shadow-md
              ${hasLeftIcon ? "pl-12" : "pl-3"}
              ${hasRightIcon ? "pr-10" : "pr-3"}
              ${error ? "border-red-500" : "border-gray-300"}
              ${inputClassName}`}
          />
        )}

        {/* Right icon */}
        {hasRightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center text-gray-900 bg-gray-200 h-[38px] px-2 rounded-r-md">
            {inputRightIcon}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;

// import React from "react";
// import {
//   FieldErrors,
//   UseFormRegister,
//   FieldValues,
//   Path,
// } from "react-hook-form";
// import ColorPickerButton from "./ColorPickerButton"; // Make sure path is correct

// interface TextInputProps<T extends FieldValues> {
//   name: Path<T>;
//   label: string;
//   register?: UseFormRegister<T>;
//   errors?: FieldErrors<T>;
//   disabled?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   className?: string;
//   inputClassName?: string;
//   type?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   inputRightIcon?: React.ReactNode;
//   inputLeftIcon?: React.ReactNode;

//   /** Show left-side color picker with color value sync */
//   showColorPicker?: boolean;
//   onColorChange?: (color: string) => void;
// }
// const TextInput = <T extends FieldValues>({
//   name,
//   label,
//   register,
//   errors = {},
//   disabled = false,
//   required = false,
//   placeholder = "",
//   className = "",
//   inputClassName = "",
//   type = "text",
//   value,
//   onChange,
//   inputRightIcon,
//   inputLeftIcon,
//   showColorPicker = false,
//   onColorChange,
// }: TextInputProps<T>) => {
//   const error = errors?.[name];

//   const hasLeftIcon = !!inputLeftIcon || showColorPicker;
//   const hasRightIcon = !!inputRightIcon;

//   return (
//     <div className={`flex flex-col gap-2 w-full ${className}`}>
//       <label htmlFor={name} className="text-xs font-bold text-gray-800">
//         {label} {required && <span className="text-red-600">*</span>}
//       </label>

//       <div className="relative w-full">
//         {hasLeftIcon && (
//           <div className="absolute inset-y-0 left-0 flex items-center">
//             {showColorPicker ? (
// <ColorPickerButton
//   value={value}
//   onChange={(color) => {
//     onColorChange?.(color);
//   }}
//   showColorPreview
// />
//             ) : (
//               <div className="text-gray-900 bg-gray-200 px-3 rounded-l-md h-[38px] text-center flex items-center">
//                 {inputLeftIcon}
//               </div>
//             )}
//           </div>
//         )}

//         <input
//           id={name}
//           type={type}
//           placeholder={placeholder}
//           {...(register ? register(name) : {})}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//           aria-invalid={!!error}
//           className={`w-full h-[38px] border rounded-md transition-shadow duration-200
//             focus:outline-none focus:ring-0 focus:shadow-md
//             ${hasLeftIcon ? "pl-12" : "pl-3"}
//             ${hasRightIcon ? "pr-10" : "pr-3"}
//             ${error ? "border-red-500" : "border-gray-300"}
//             ${inputClassName}`}
//         />

//         {hasRightIcon && (
//           <div className="absolute inset-y-0 right-0 flex items-center text-gray-900 bg-gray-200 h-[38px] px-2 rounded-r-md">
//             {inputRightIcon}
//           </div>
//         )}
//       </div>

//       {error && (
//         <p className="text-sm text-red-500">{error.message?.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default TextInput;
