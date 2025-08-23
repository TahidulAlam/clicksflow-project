// "use client";

// import React from "react";

// interface ToggleSwitchProps {
//   label?: string;
//   className?: string;
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   disabled?: boolean;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
//   label,
//   checked,
//   className,
//   onChange,
//   disabled = false,
// }) => {
//   return (
//     <div
//       className={`${className ? className : "gap-6"} flex flex-col items-start`}
//     >
//       <label className="text-xs font-bold text-gray-800 truncate">
//         {label}
//       </label>
//       <button
//         type="button"
//         disabled={disabled}
//         onClick={() => onChange(!checked)}
//         className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors
//           ${checked ? "bg-[#1A2B49]" : "bg-gray-300"}
//           ${disabled && "opacity-50 cursor-not-allowed"}
//         `}
//       >
//         <span
//           className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform
//             ${checked ? "translate-x-8" : "translate-x-1"}
//           `}
//         />
//       </button>
//     </div>
//   );
// };

// export default ToggleSwitch;

"use client";

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface ToggleSwitchProps {
  name?: string; // Make optional for uncontrolled mode
  label?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  label,
  labelClassName,
  className,
  disabled = false,
  size = "lg",
  ariaLabel,
  checked: externalChecked,
  defaultChecked = false,
  onChange,
}) => {
  const formContext = useFormContext();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlledByName = !!name && !!formContext?.control;
  const isControlledExternally = typeof externalChecked !== "undefined";

  const actualChecked = isControlledExternally
    ? externalChecked
    : isControlledByName
    ? undefined
    : internalChecked;

  const sizeStyles = {
    sm: {
      toggleWidth: "w-10",
      toggleHeight: "h-5",
      knobSize: "h-3 w-3",
      knobTranslation: "translate-x-6",
    },
    md: {
      toggleWidth: "w-12",
      toggleHeight: "h-6",
      knobSize: "h-4 w-4",
      knobTranslation: "translate-x-7",
    },
    lg: {
      toggleWidth: "w-14",
      toggleHeight: "h-7",
      knobSize: "h-5 w-5",
      knobTranslation: "translate-x-8",
    },
  };

  const { toggleWidth, toggleHeight, knobSize, knobTranslation } =
    sizeStyles[size];

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !actualChecked;

    if (isControlledExternally && onChange) {
      onChange(newValue);
    } else if (!isControlledByName) {
      setInternalChecked(newValue);
      if (onChange) onChange(newValue);
    }
  };

  const renderSwitch = (checked = false, handleChange?: () => void) => (
    <button
      type="button"
      id={name}
      aria-label={ariaLabel || label || name || "toggle"}
      disabled={disabled}
      onClick={handleChange || handleToggle}
      className={`
        relative inline-flex ${toggleWidth} ${toggleHeight} items-center rounded-full
        transition-colors duration-200
        ${checked ? "bg-[#1A2B49]" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          inline-block ${knobSize} rounded-full bg-white
          transform transition-transform duration-200
          ${checked ? knobTranslation : "translate-x-1"}
        `}
      />
    </button>
  );

  return (
    <div className={`flex flex-col items-start ${className || "gap-2"}`}>
      {label && (
        <label
          htmlFor={name}
          className={`${labelClassName} text-xs font-bold text-gray-800 truncate`}
        >
          {label}
        </label>
      )}

      {isControlledByName ? (
        <Controller
          name={name!}
          control={formContext.control}
          defaultValue={defaultChecked}
          render={({ field }) =>
            renderSwitch(field.value, () => field.onChange(!field.value))
          }
        />
      ) : (
        renderSwitch(actualChecked)
      )}
    </div>
  );
};

export default ToggleSwitch;

// "use client";

// import React from "react";

// interface ToggleSwitchProps {
//   label?: string;
//   className?: string;
//   labelClassName?: string;
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   disabled?: boolean;
//   size?: "sm" | "md" | "lg";
//   ariaLabel?: string;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
//   label,
//   checked,
//   labelClassName,
//   className,
//   onChange,
//   disabled = false,
//   size = "lg",
// }) => {
//   // Define size configurations
//   const sizeStyles = {
//     sm: {
//       toggleWidth: "w-10",
//       toggleHeight: "h-5",
//       knobSize: "h-3 w-3",
//       knobTranslation: checked ? "translate-x-6" : "translate-x-1",
//     },
//     md: {
//       toggleWidth: "w-12",
//       toggleHeight: "h-6",
//       knobSize: "h-4 w-4",
//       knobTranslation: checked ? "translate-x-7" : "translate-x-1",
//     },
//     lg: {
//       toggleWidth: "w-14",
//       toggleHeight: "h-7",
//       knobSize: "h-5 w-5",
//       knobTranslation: checked ? "translate-x-8" : "translate-x-1",
//     },
//   };

//   const { toggleWidth, toggleHeight, knobSize, knobTranslation } =
//     sizeStyles[size];

//   return (
//     <div
//       className={`flex flex-col items-start ${className ? className : "gap-4"}`}
//     >
//       {label && (
//         <label
//           className={`${labelClassName} text-xs font-bold text-gray-800 truncate`}
//         >
//           {label}
//         </label>
//       )}
//       <button
//         type="button"
//         disabled={disabled}
//         onClick={() => onChange(!checked)}
//         className={`
//           relative inline-flex ${toggleWidth} ${toggleHeight} items-center rounded-full
//           transition-colors duration-200
//           ${checked ? "bg-[#1A2B49]" : "bg-gray-300"}
//           ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
//         `}
//       >
//         <span
//           className={`
//             inline-block ${knobSize} rounded-full bg-white
//             transform transition-transform duration-200
//             ${knobTranslation}
//           `}
//         />
//       </button>
//     </div>
//   );
// };

// export default ToggleSwitch;
