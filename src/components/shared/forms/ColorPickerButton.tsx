"use client";

import React, { useRef } from "react";

interface ColorPickerButtonProps {
  value?: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
  buttonClassName?: string;
  showColorPreview?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  tooltip?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  value = "#000000",
  onChange,
  label = "",
  className = "",
  buttonClassName = "",
  showColorPreview = true,
  icon,
  disabled = false,
  tooltip,
  onOpen,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
    onOpen?.();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    onChange(newColor);
    onClose?.();
  };

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      title={tooltip}
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`flex items-center h-[38px] border border-gray-300 rounded-l-md text-sm  
          transition focus:outline-none focus:ring-0
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white"}
          ${buttonClassName}`}
      >
        {icon && <span>{icon}</span>}
        {label && <span>{label}</span>}
        {showColorPreview && (
          <span
            className="w-10 h-[35px] rounded-l-md"
            style={{ backgroundColor: value }}
          />
        )}
      </button>

      {/* Inline hidden color input */}
      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={handleColorChange}
        disabled={disabled}
        className="w-0 h-0 opacity-0 absolute pointer-events-none mt-12"
      />
    </div>
  );
};

export default ColorPickerButton;
