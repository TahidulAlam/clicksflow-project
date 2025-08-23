// import React from "react";
// import {
//   FieldErrors,
//   UseFormRegister,
//   FieldValues,
//   Path,
// } from "react-hook-form";
// import { IconType } from "react-icons";

// interface NumberInputProps<T extends FieldValues> {
//   id?: string;
//   name: Path<T>;
//   label: string;
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   disabled?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   type?: string;
//   icon?: IconType;
//   value?: number;
//   valueAsNumber?: boolean; // Added to support number parsing
// }

// const NumberInput = <T extends FieldValues>({
//   id,
//   name,
//   label,
//   register,
//   errors,
//   disabled = false,
//   required = false,
//   placeholder = "",
//   type = "text",
//   icon: Icon,
//   value,
//   valueAsNumber = false,
// }: NumberInputProps<T>) => {
//   const error = errors[name];

//   return (
//     <div className="flex flex-col gap-2">
//       <label htmlFor={id} className="text-sm font-semibold text-gray-800">
//         {label} {required && <span className="text-red-700">*</span>}
//       </label>

//       <div className="relative">
//         {Icon && (
//           <span className="absolute p-3 border-gray-300 rounded-l-lg bg-gray-100 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
//             <Icon size={18} />
//           </span>
//         )}
//         <input
//           id={id} // Use 'id' here for the 'input' element
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           {...register(
//             name,
//             valueAsNumber ? { valueAsNumber: true } : undefined
//           )}
//           disabled={disabled}
//           className={`w-full p-2 ${Icon ? "pl-12" : ""} border rounded-lg ${
//             error ? "border-red-500" : "border-gray-300"
//           } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
//         />
//       </div>

//       {error && (
//         <p className="text-red-500 text-sm mt-1">{error.message?.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default NumberInput;

import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";
import { IconType } from "react-icons";

interface NumberInputProps<T extends FieldValues> {
  id?: string;
  name?: Path<T>;
  label: string;
  className?: string;
  inputLabel?: string | React.ReactNode; // Left input label
  inputLabelR?: string | React.ReactNode; // Right input label
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;
  icon?: IconType; // Left icon
  iconR?: IconType; // Right icon
  value?: number;
  valueAsNumber?: boolean;
}

const NumberInput = <T extends FieldValues>({
  id,
  name,
  label,
  className,
  register,
  errors,
  disabled = false,
  required = false,
  placeholder = "",
  type = "text",
  icon: Icon,
  iconR: IconR,
  inputLabel,
  inputLabelR,
  value,
  valueAsNumber = false,
}: NumberInputProps<T>) => {
  const error = name ? errors[name] : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-gray-800">
        {label} {required && <span className="text-red-700">*</span>}
      </label>

      <div className="relative">
        {inputLabel && (
          <span className="absolute left-0 inset-y-0 flex items-center pl-3 px-2 text-gray-800 rounded-l-md bg-gray-300 pointer-events-none">
            {inputLabel}
          </span>
        )}
        {inputLabelR && (
          <span className="absolute right-0 inset-y-0 flex items-center pr-3 px-2 text-gray-800 rounded-r-md bg-gray-300 pointer-events-none">
            {inputLabelR}
          </span>
        )}
        {Icon && (
          <span className="absolute left-0 inset-y-0 flex items-center pl-3 px-2 text-gray-800 rounded-l-md bg-gray-300 pointer-events-none">
            <Icon size={18} />
          </span>
        )}
        {IconR && (
          <span className="absolute right-0 inset-y-0 flex items-center pr-3 px-2 text-gray-800 rounded-r-md bg-gray-300 pointer-events-none">
            <IconR size={18} />
          </span>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          {...(name &&
            register(
              name,
              valueAsNumber ? { valueAsNumber: true } : undefined
            ))}
          disabled={disabled}
          className={`${className} w-full py-[6px] border rounded-md transition
            ${Icon ? "pl-10" : "pl-3"} ${IconR ? "pr-10" : "pr-3"}
            ${error ? "border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-0 focus:shadow-md
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          `}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default NumberInput;

// import React from "react";
// import {
//   FieldErrors,
//   UseFormRegister,
//   FieldValues,
//   Path,
// } from "react-hook-form";
// import { IconType } from "react-icons";

// interface NumberInputProps<T extends FieldValues> {
//   id?: string;
//   name?: Path<T>;
//   label: string;
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   disabled?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   type?: string;
//   icon?: IconType;
//   iconR?: IconType;
//   value?: number;
//   valueAsNumber?: boolean;
// }

// const NumberInput = <T extends FieldValues>({
//   id,
//   name,
//   label,
//   register,
//   errors,
//   disabled = false,
//   required = false,
//   placeholder = "",
//   type = "text",
//   icon: Icon,
//   icon: iconR,
//   value,
//   valueAsNumber = false,
// }: NumberInputProps<T>) => {
//   const error = name ? errors[name] : undefined;

//   return (
//     <div className="flex flex-col gap-2">
//       <label htmlFor={id} className="text-xs font-semibold text-gray-800">
//         {label} {required && <span className="text-red-700">*</span>}
//       </label>

//       <div className="relative">
//         {Icon && (
//           <span className="absolute px-3 py-[8.5px] border border-gray-300 border-t-0 border-b-0 rounded-l-md bg-gray-100 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none">
//             <Icon size={18} />
//           </span>
//         )}
//         <input
//           id={id}
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           {...(name &&
//             register(
//               name,
//               valueAsNumber ? { valueAsNumber: true } : undefined
//             ))}
//           disabled={disabled}
//           className={`w-full px-3 py-[6px] ${
//             Icon ? "pl-12" : ""
//           } border rounded-md ${error ? "border-red-500" : " border-gray-300"}
//           focus:outline-none focus:ring-0 focus:shadow-md"} ${
//             disabled ? "bg-gray-100 cursor-not-allowed" : ""
//           }`}
//         />
//         {iconR && (
//           <span className="absolute px-3 py-[8.5px] border border-gray-300 border-t-0 border-b-0 rounded-l-md bg-gray-100 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none">
//             <Icon size={18} />
//           </span>
//         )}
//       </div>

//       {error && (
//         <p className="text-red-500 text-sm mt-1">{error.message?.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default NumberInput;
