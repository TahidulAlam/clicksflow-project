"use client";
import React, { useEffect } from "react";
import { UseFormSetValue, FieldErrors, Path, PathValue } from "react-hook-form";

interface StatusOption {
  value: string;
  label: string;
  dotColor?: string;
}

interface StatusSelectorProps<T extends Record<string, unknown>> {
  label?: string;
  fieldName?: Path<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  selectedStatus?: string | React.ReactNode;
  isSubmitting?: boolean;
  isLoading?: boolean;
  required?: boolean;
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
  errors,
  selectedStatus,
  isSubmitting = false,
  required = false,
  isLoading = false,
  options = defaultOptions,
}: StatusSelectorProps<T>) => {
  const disabled = isSubmitting || isLoading;
  const statusOptions = options.length > 0 ? options : defaultOptions;

  useEffect(() => {
    if (!selectedStatus && statusOptions[0]) {
      if (fieldName) {
        setValue(fieldName, statusOptions[0].value as PathValue<T, Path<T>>);
      }
    }
  }, [selectedStatus, setValue, fieldName, statusOptions]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-800 capitalize">
        {label || fieldName}
        {required && <span className="text-red-700">*</span>}
      </label>
      <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              fieldName &&
              setValue(fieldName, option.value as PathValue<T, Path<T>>)
            }
            className={`flex-1 text-xs flex items-center justify-center gap-2 px-3 py-[8px] rounded-md transition
              ${
                selectedStatus === option.value
                  ? "bg-white border border-gray-300"
                  : "bg-transparent"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            disabled={disabled}
          >
            {option.dotColor && (
              <span className={`w-2.5 h-2.5 rounded-full ${option.dotColor}`} />
            )}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      {fieldName && errors[fieldName] && (
        <p className="text-red-500 text-sm">
          {errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default StatusSelector;

// "use client";
// import React, { useMemo, useCallback, JSX } from "react";
// import {
//   Controller,
//   Control,
//   FieldErrors,
//   Path,
//   FieldValues,
// } from "react-hook-form";

// // Interface for status options
// interface StatusOption {
//   value: string;
//   label: string;
//   dotColor?: string;
//   className?: string; // Custom styling per option
// }

// // Common props for both controlled and uncontrolled usage
// interface BaseStatusSelectorProps {
//   label?: string;
//   options?: StatusOption[];
//   disabled?: boolean;
//   required?: boolean;
//   className?: string; // Custom container class
//   optionClassName?: string; // Base class for options
//   error?: string; // Custom error message
// }

// // Form-integrated props (with react-hook-form)
// interface FormStatusSelectorProps<T extends FieldValues>
//   extends BaseStatusSelectorProps {
//   fieldName: Path<T>;
//   control: Control<T>;
//   errors?: FieldErrors<T>;
// }

// // Standalone props (without react-hook-form)
// interface StandaloneStatusSelectorProps extends BaseStatusSelectorProps {
//   value?: string;
//   onChange?: (value: string) => void;
// }

// // Union type for props
// type StatusSelectorProps<T extends FieldValues> =
//   | FormStatusSelectorProps<T>
//   | StandaloneStatusSelectorProps;

// // Default options
// const defaultOptions: StatusOption[] = [
//   { value: "active", label: "Active", dotColor: "bg-green-500" },
//   { value: "pending", label: "Pending", dotColor: "bg-yellow-400" },
//   { value: "paused", label: "Paused", dotColor: "bg-orange-600" },
//   { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
// ];

// const StatusSelector = <T extends FieldValues>({
//   label,
//   options = defaultOptions,
//   disabled = false,
//   required = false,
//   className = "",
//   optionClassName = "",
//   error,
//   ...props
// }: StatusSelectorProps<T>) => {
//   // Memoize options to prevent re-computation
//   const statusOptions = useMemo(
//     () => (options.length > 0 ? options : defaultOptions),
//     [options]
//   );

//   // Generate display label
//   const displayLabel = useMemo(() => {
//     if (label) return label;
//     if ("fieldName" in props && props.fieldName) {
//       return props.fieldName
//         .toString()
//         .replace(/([A-Z])/g, " $1")
//         .toLowerCase();
//     }
//     return "Status";
//   }, [label, props]);

//   // Determine if using Controller (form-integrated)
//   const isFormIntegrated = "control" in props && "fieldName" in props;

//   // Handle status change
//   const handleStatusChange = useCallback(
//     (value: string, onChange?: (value: string) => void) => {
//       if (!disabled) {
//         onChange?.(value);
//       }
//     },
//     [disabled]
//   );

//   // Base rendering logic
//   const renderButtons = (
//     value: string | undefined,
//     onChange?: (value: string) => void
//   ) => (
//     <div
//       role="radiogroup"
//       aria-labelledby={displayLabel}
//       className={`flex gap-2 bg-gray-100 p-2 rounded-lg ${className}`}
//     >
//       {statusOptions.map((option) => (
//         <button
//           key={option.value}
//           type="button"
//           role="radio"
//           aria-checked={value === option.value}
//           onClick={() => handleStatusChange(option.value, onChange)}
//           disabled={disabled}
//           className={`flex-1 text-xs flex items-center justify-center gap-2 px-3 py-2 rounded-md transition ${
//             value === option.value
//               ? "bg-white border border-gray-300"
//               : "bg-transparent"
//           } ${
//             disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
//           } ${option.className || ""} ${optionClassName}`}
//         >
//           {option.dotColor && (
//             <span
//               className={`w-2.5 h-2.5 rounded-full ${option.dotColor}`}
//               aria-hidden="true"
//             />
//           )}
//           <span>{option.label}</span>
//         </button>
//       ))}
//     </div>
//   );

//   return (
//     <div className="flex flex-col gap-2">
//       {displayLabel && (
//         <label
//           htmlFor={isFormIntegrated ? props.fieldName : "status-selector"}
//           className="text-xs font-semibold text-gray-800 capitalize"
//         >
//           {displayLabel}
//           {required && <span className="text-red-700">*</span>}
//         </label>
//       )}
//       {isFormIntegrated ? (
//         <Controller
//           name={props.fieldName}
//           control={props.control}
//           rules={{ required: required ? "Status is required" : false }}
//           render={({ field: { onChange, value } }) =>
//             renderButtons(value, onChange)
//           }
//         />
//       ) : (
//         renderButtons(
//           (props as StandaloneStatusSelectorProps).value,
//           (props as StandaloneStatusSelectorProps).onChange
//         )
//       )}
//       {(isFormIntegrated
//         ? props.errors?.[props.fieldName]?.message
//         : error) && (
//         <p className="text-red-500 text-xs">
//           {String(
//             isFormIntegrated ? props.errors?.[props.fieldName]?.message : error
//           )}
//         </p>
//       )}
//     </div>
//   );
// };

// // Memoize the component
// export default React.memo(StatusSelector) as <T extends FieldValues>(
//   props: StatusSelectorProps<T>
// ) => JSX.Element;
