"use client";

import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import ToggleSwitch from "../buttons/ToggleSwitch"; // Make sure this import is correct!
import DatePickerWrapper from "../calender/DatePickerWrapper";

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
  // onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // const calendarRef = useRef<HTMLDivElement>(null);

  // const handleDateChange = (date: Date | null) => {
  //   setStartDate(date);
  //   if (date && onChange) {
  //     onChange(date.toISOString());
  //   }
  //   setShowCalendar(false);
  // };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     calendarRef.current &&
  //     !calendarRef.current.contains(event.target as Node)
  //   ) {
  //     setShowCalendar(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <div className="flex w-full">
      {/* Toggle Section */}
      <div className="z-10 self-start py-4 pr-4">
        <ToggleSwitch label="Expires" checked={toggle} onChange={setToggle} />
      </div>
      {showSelect && (
        <div className="w-px relative h-36 -rotate-90 bg-gray-300 -mt-3 ml-2" />
      )}
      {/* Date Picker Section */}
      {showSelect && (
        <>
          <div className="self-start w-full ml-10 z-10 p-4 mr-10 pb-8 border border-gray-300 rounded-lg bg-gray-50">
            <DatePickerWrapper
              mode="single"
              label="Select a Date"
              placeholder="Click to select a date"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date as Date)}
              showApplyCancel={true}
              minDate={new Date(2025, 0, 1)}
              maxDate={new Date(2035, 11, 31)}
            />
          </div>
        </>
        // <div className="relative flex flex-col gap-2" ref={calendarRef}>
        //   <label className="text-xs font-semibold text-gray-800">
        //     Valid Until <span className="text-red-600">*</span>
        //   </label>
        //   <input
        //     readOnly
        //     value={startDate ? format(startDate, "PPP") : ""}
        //     placeholder="Pick a date"
        //     onClick={() => setShowCalendar(!showCalendar)}
        //     className="w-full border px-4 py-2 rounded-md text-sm cursor-pointer"
        //   />
        //   {showCalendar && (
        //     <div className="absolute mt-16 flex z-10 rounded-md shadow-md">
        //       <DatePicker
        //         selected={startDate}
        //         onChange={handleDateChange}
        //         inline
        //         showIcon
        //       />
        //     </div>
        //   )}
        // </div>
      )}
    </div>
  );
};

export default ExpiresDate;
