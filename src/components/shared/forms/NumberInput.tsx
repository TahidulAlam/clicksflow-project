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
  inputLabel?: string | React.ReactNode;
  inputLabelR?: string | React.ReactNode;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;
  icon?: IconType;
  iconR?: IconType;
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
          <span className="absolute left-0 inset-y-0 flex items-center pl-3 px-2 text-gray-800 rounded-l-md bg-gray-300 pointer-events-none lg:h-[30px] h-[30px]">
            {inputLabel}
          </span>
        )}
        {inputLabelR && (
          <span className="absolute right-0 inset-y-0 flex items-center pr-3 px-2 text-gray-800 rounded-r-md bg-gray-300 pointer-events-none lg:h-[30px] h-[30px]">
            {inputLabelR}
          </span>
        )}
        {Icon && (
          <span className="absolute left-0 inset-y-0 flex items-center pl-3 px-2 text-gray-800 rounded-l-md bg-gray-300 pointer-events-none lg:h-[30px] h-[30px]">
            <Icon size={18} />
          </span>
        )}
        {IconR && (
          <span className="absolute right-0 inset-y-0 flex items-center pr-3 px-2 text-gray-800 rounded-r-md bg-gray-300 pointer-events-none lg:h-[30px] h-[30px]">
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
          className={`${className} w-full lg:h-[30px] h-[30px] border rounded-md transition
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
