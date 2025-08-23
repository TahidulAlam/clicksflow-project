// // import React from "react";

// // const PredefinedRangesPanel = () => {
// //   return <div>PredefinedRangesPanel</div>;
// // };

// // export default PredefinedRangesPanel;

// "use client";

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useMemo,
//   useCallback,
//   memo,
// } from "react";
// import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, Locale, getMonth, getYear } from "date-fns";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import "./CustomDateRangePicker.css";

// interface CalendarContainerProps {
//   children: React.ReactNode;
//   className?: string;
// }

// type PickerMode = "single" | "range";
// type DatePreset = { label: string; value: Date | [Date, Date] };

// type DateValue<T extends PickerMode> = T extends "single"
//   ? Date
//   : [Date | null, Date | null];

// interface DatePickerWrapperProps<T extends PickerMode> {
//   label?: string;
//   placeholder?: string;
//   mode?: T;
//   value: DateValue<T>;
//   onChange: (date: DateValue<T>) => void;
//   onApply?: (date: DateValue<T>) => void;
//   onCancel?: () => void;
//   monthsShown?: 1 | 2;
//   showIcon?: boolean;
//   showApplyCancel?: boolean;
//   minDate?: Date;
//   maxDate?: Date;
//   excludeDates?: Date[];
//   includeDates?: Date[];
//   filterDate?: (date: Date) => boolean;
//   inline?: boolean;
//   showTimeSelect?: boolean;
//   timeIntervals?: number;
//   dateFormat?: string;
//   presets?: DatePreset[];
//   showPresetsPanel?: boolean; // New prop to control side panel visibility
//   showWeekNumbers?: boolean;
//   highlightDates?: Date[];
//   locale?: Locale;
//   showYearDropdown?: boolean;
//   scrollableYearDropdown?: boolean;
//   showMonthDropdown?: boolean;
// }

// const DatePickerWrapper = <T extends PickerMode>({
//   label = "Select Date",
//   placeholder = "Choose a date",
//   mode = "single" as T,
//   value,
//   onChange,
//   onApply,
//   onCancel,
//   monthsShown = 1,
//   showApplyCancel = false,
//   minDate,
//   maxDate,
//   excludeDates,
//   includeDates,
//   filterDate,
//   inline = false,
//   showIcon = false,
//   showTimeSelect = false,
//   timeIntervals = 30,
//   dateFormat,
//   presets = [],
//   showPresetsPanel = true, // Default to true for side panel visibility
//   showWeekNumbers = false,
//   highlightDates,
//   locale,
//   showYearDropdown = false,
//   scrollableYearDropdown = false,
//   showMonthDropdown = false,
// }: DatePickerWrapperProps<T>) => {
//   const isRangeMode = mode === "range";
//   const [isOpen, setIsOpen] = useState(inline);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const [tempValue, setTempValue] = useState<DateValue<T>>(value);

//   const predefinedRanges = useMemo(
//     () => [
//       { label: "Today", range: [new Date(), new Date()] },
//       {
//         label: "Yesterday",
//         range: [
//           new Date(Date.now() - 86400000),
//           new Date(Date.now() - 86400000),
//         ],
//       },
//       {
//         label: "Last 7 Days",
//         range: [new Date(Date.now() - 7 * 86400000), new Date()],
//       },
//       {
//         label: "Last 30 Days",
//         range: [new Date(Date.now() - 30 * 86400000), new Date()],
//       },
//       {
//         label: "This Month",
//         range: [
//           new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//           new Date(),
//         ],
//       },
//       {
//         label: "Last Month",
//         range: [
//           new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
//           new Date(new Date().getFullYear(), new Date().getMonth(), 0),
//         ],
//       },
//       { label: "Custom Range", range: [null, null] },
//     ],
//     []
//   );

//   const mergedDateFormat = useMemo(() => {
//     if (dateFormat) return dateFormat;
//     return showTimeSelect ? "MMM d, yyyy h:mm aa" : "MMM d, yyyy";
//   }, [dateFormat, showTimeSelect]);

//   const handleClickOutside = useCallback((event: MouseEvent) => {
//     if (
//       wrapperRef.current &&
//       !wrapperRef.current.contains(event.target as Node)
//     ) {
//       setIsOpen(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!inline) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () =>
//         document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [handleClickOutside, inline]);

//   const handleApply = useCallback(() => {
//     onChange(tempValue);
//     onApply?.(tempValue);
//     setIsOpen(false);
//   }, [tempValue, onChange, onApply]);

//   const handleCancel = useCallback(() => {
//     setTempValue(value);
//     onCancel?.();
//     setIsOpen(false);
//   }, [value, onCancel]);

//   const handleClear = useCallback(() => {
//     if (isRangeMode) {
//       setTempValue([null, null] as DateValue<T>);
//     } else {
//       setTempValue(null as DateValue<T>);
//     }
//   }, [isRangeMode]);

//   const formatDisplayValue = useMemo(() => {
//     if (isRangeMode) {
//       const [start, end] = value as [Date | null, Date | null];
//       return start && end
//         ? `${format(start, mergedDateFormat)} - ${format(
//             end,
//             mergedDateFormat
//           )}`
//         : "";
//     }
//     return value ? format(value as Date, mergedDateFormat) : "";
//   }, [value, isRangeMode, mergedDateFormat]);

//   const CalendarContainer = memo(({ children }: CalendarContainerProps) => (
//     <div className={monthsShown === 2 ? "flex gap-4 p-2" : ""}>{children}</div>
//   ));
//   CalendarContainer.displayName = "CalendarContainer";

//   const renderCustomHeader = useCallback(
//     ({
//       date,
//       decreaseMonth,
//       increaseMonth,
//       prevMonthButtonDisabled,
//       nextMonthButtonDisabled,
//       changeYear,
//       changeMonth,
//     }: ReactDatePickerCustomHeaderProps) => {
//       const months = [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//       ];
//       const years = Array.from(
//         { length: 100 },
//         (_, i) => getYear(new Date()) - 50 + i
//       );

//       return (
//         <div className="flex items-center justify-between px-4 py-2">
//           <button
//             type="button"
//             onClick={decreaseMonth}
//             disabled={prevMonthButtonDisabled}
//             className={`p-2 rounded text-gray-600 hover:bg-gray-200 transition-colors ${
//               prevMonthButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             aria-label="Previous Month"
//           >
//             <IoIosArrowBack className="w-5 h-5" />
//           </button>

//           <div className="flex items-center space-x-2">
//             {showMonthDropdown ? (
//               <select
//                 value={getMonth(date)}
//                 onChange={({ target: { value } }) => changeMonth(Number(value))}
//                 className="px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0"
//               >
//                 {months.map((month, index) => (
//                   <option key={month} value={index}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <span className="text-sm font-semibold text-gray-700">
//                 {format(date, "MMMM", { locale })}
//               </span>
//             )}

//             {showYearDropdown ? (
//               <select
//                 value={getYear(date)}
//                 onChange={({ target: { value } }) => changeYear(Number(value))}
//                 className={`px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   scrollableYearDropdown ? "h-8" : ""
//                 }`}
//               >
//                 {years.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <span className="text-sm font-semibold text-gray-700">
//                 {format(date, "yyyy", { locale })}
//               </span>
//             )}
//           </div>

//           <button
//             type="button"
//             onClick={increaseMonth}
//             disabled={nextMonthButtonDisabled}
//             className={`p-2 rounded text-gray-600 hover:bg-gray-200 transition-colors ${
//               nextMonthButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             aria-label="Next Month"
//           >
//             <IoIosArrowForward className="w-5 h-5" />
//           </button>
//         </div>
//       );
//     },
//     [locale, showYearDropdown, showMonthDropdown, scrollableYearDropdown]
//   );

//   const handlePresetSelect = useCallback(
//     (range: [Date | null, Date | null]) => {
//       if (isRangeMode) {
//         setTempValue(range as DateValue<T>);
//       } else {
//         setTempValue(range[0] as DateValue<T>);
//       }
//     },
//     [isRangeMode]
//   );

//   const allPresets = useMemo(() => {
//     const customPresets = presets.map((preset) => ({
//       label: preset.label,
//       range: Array.isArray(preset.value) ? preset.value : [preset.value, preset.value],
//     }));
//     return [...predefinedRanges, ...customPresets];
//   }, [predefinedRanges, presets]);

//   return (
//     <div ref={wrapperRef} className="relative w-full">
//       {!inline && (
//         <>
//           {label && (
//             <label className="block mb-1 text-xs font-bold text-gray-700">
//               {label}
//             </label>
//           )}
//           <input
//             readOnly
//             aria-label={label}
//             onClick={() => setIsOpen((prev) => !prev)}
//             value={formatDisplayValue}
//             placeholder={placeholder}
//             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-0"
//           />
//         </>
//       )}

//       <div
//         className={`z-50 bg-white border border-gray-300 rounded-lg shadow-lg
//           ${inline ? "static" : "absolute mt-2"}
//            transition-transform duration-300 ease-in-out
//           ${
//             isOpen || inline
//               ? "opacity-100 translate-y-0 scale-100"
//               : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
//           }`}
//       >
//         <div className="flex">
//           {showPresetsPanel && (
//             <div className="w-32 p-2 border-r border-gray-200 bg-gray-50">
//               {allPresets.map((range, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   onClick={() => handlePresetSelect(range.range)}
//                   className="block w-full text-left p-2 text-sm hover:bg-blue-500 transition duration-150 hover:text-white rounded"
//                 >
//                   {range.label}
//                 </button>
//               ))}
//               <button
//                 type="button"
//                 onClick={handleClear}
//                 className="block w-full text-left p-2 text-sm text-red-500 hover:bg-gray-200 transition duration-150 rounded"
//               >
//                 Clear
//               </button>
//             </div>
//           )}

//           <div className="flex-1">
//             {isRangeMode ? (
//               <DatePicker
//                 selectsRange
//                 showIcon={showIcon}
//                 startDate={(tempValue as [Date | null, Date | null])?.[0]}
//                 endDate={(tempValue as [Date | null, Date | null])?.[1]}
//                 onChange={(dates) => setTempValue(dates as DateValue<T>)}
//                 inline
//                 monthsShown={monthsShown}
//                 calendarContainer={CalendarContainer}
//                 minDate={minDate}
//                 maxDate={maxDate}
//                 excludeDates={excludeDates}
//                 includeDates={includeDates}
//                 filterDate={filterDate}
//                 showTimeSelect={showTimeSelect}
//                 timeIntervals={timeIntervals}
//                 dateFormat={mergedDateFormat}
//                 showWeekNumbers={showWeekNumbers}
//                 highlightDates={highlightDates}
//                 locale={locale}
//                 showYearDropdown={showYearDropdown}
//                 scrollableYearDropdown={scrollableYearDropdown}
//                 renderCustomHeader={renderCustomHeader}
//                 dayClassName={(date) =>
//                   highlightDates?.some(
//                     (d) => d.toDateString() === date.toDateString()
//                   )
//                     ? "bg-yellow-100"
//                     : ""
//                 }
//               />
//             ) : (
//               <DatePicker
//                 selected={tempValue as Date}
//                 onChange={(date) => setTempValue(date as DateValue<T>)}
//                 inline
//                 showIcon={showIcon}
//                 monthsShown={monthsShown}
//                 minDate={minDate}
//                 maxDate={maxDate}
//                 excludeDates={excludeDates}
//                 includeDates={includeDates}
//                 filterDate={filterDate}
//                 showTimeSelect={showTimeSelect}
//                 timeIntervals={timeIntervals}
//                 dateFormat={mergedDateFormat}
//                 showWeekNumbers={showWeekNumbers}
//                 highlightDates={highlightDates}
//                 locale={locale}
//                 showYearDropdown={showYearDropdown}
//                 scrollableYearDropdown={scrollableYearDropdown}
//                 renderCustomHeader={renderCustomHeader}
//                 dayClassName={(date) =>
//                   highlightDates?.some(
//                     (d) => d.toDateString() === date.toDateString()
//                   )
//                     ? "bg-yellow-100"
//                     : ""
//                 }
//               />
//             )}
//           </div>
//         </div>

//         {showApplyCancel && (
//           <div className="flex justify-between p-2 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleApply}
//               className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
//             >
//               Apply
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// DatePickerWrapper.displayName = "DatePickerWrapper";

// export default memo(DatePickerWrapper);
