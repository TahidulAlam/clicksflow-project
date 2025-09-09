"use client";

import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import DatePickerWrapper from "@/components/shared/calender/DatePickerWrapper";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface ExpiresDateProps {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  showSelect: boolean;
  selectedValue?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

const ExpiresDate: React.FC<ExpiresDateProps> = ({
  toggle,
  setToggle,
  showSelect,
  selectedValue,
  placeholder = "Click to select a date",
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    selectedValue ? new Date(selectedValue) : new Date()
  );

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
    if (onChange) {
      onChange(date.toISOString());
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start w-full">
      {/* Toggle Section */}
      <div className="z-10 pt-4 lg:pr-0 pr-4">
        <ToggleSwitch label="Expires" checked={toggle} onChange={setToggle} />
      </div>

      {/* Divider */}
      {showSelect && (
        <div
          className="
           relative lg:w-20 lg:h-px bg-gray-300 lg:my-auto lg:mt-[53px]
            w-px h-5 my-0 mx-0 ml-5 lg:ml-0
          "
        />
      )}

      {/* Date Picker Section */}
      {showSelect && (
        <div className="w-full lg:mt-2 mt-0 z-10 p-4 border border-gray-300 rounded-lg bg-[#F2F7FD]">
          <DatePickerWrapper
            mode="single"
            label="Select a Date"
            placeholder={placeholder}
            value={selectedDate}
            onChange={(date) => handleDateChange(date as Date)}
            showApplyCancel={true}
            minDate={new Date(2025, 0, 1)}
            maxDate={new Date(2035, 11, 31)}
          />
        </div>
      )}
    </div>
  );
};

export default ExpiresDate;
