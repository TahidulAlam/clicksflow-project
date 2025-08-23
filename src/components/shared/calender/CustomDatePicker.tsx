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
// import clsx from "clsx";
// import "./CustomDateRangePicker.css";
// import { BsCalendar2PlusFill } from "react-icons/bs";

// // Constants
// const PREDEFINED_RANGES: {
//   label: string;
//   range: [Date | null, Date | null];
// }[] = [
//   { label: "Today", range: [new Date(), new Date()] },
//   {
//     label: "Yesterday",
//     range: [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
//   },
//   {
//     label: "Last 7 Days",
//     range: [new Date(Date.now() - 7 * 86400000), new Date()],
//   },
//   {
//     label: "Last 30 Days",
//     range: [new Date(Date.now() - 30 * 86400000), new Date()],
//   },
//   {
//     label: "This Month",
//     range: [
//       new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//       new Date(),
//     ],
//   },
//   {
//     label: "Last Month",
//     range: [
//       new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
//       new Date(new Date().getFullYear(), new Date().getMonth(), 0),
//     ],
//   },
//   { label: "Custom Range", range: [null, null] },
// ];

// const YEARS = Array.from(
//   { length: 100 },
//   (_, i) => getYear(new Date()) - 50 + i
// );

// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// // Types
// type PickerMode = "single" | "range";

// type DatePreset = {
//   label: string;
//   value: Date | [Date | null, Date | null];
// };

// type DateValue<T extends PickerMode> = T extends "single"
//   ? Date | null
//   : [Date | null, Date | null];

// interface CustomDatePickerProps<T extends PickerMode> {
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
//   showPresetsPanel?: boolean;
//   showWeekNumbers?: boolean;
//   highlightDates?: Date[];
//   locale?: Locale;
//   showYearDropdown?: boolean;
//   scrollableYearDropdown?: boolean;
//   showMonthDropdown?: boolean;
// }

// // Sub-components
// interface CalendarContainerProps {
//   children: React.ReactNode;
//   className?: string;
//   monthsShown?: 1 | 2;
// }

// const CalendarContainer = memo(
//   ({ children, className, monthsShown }: CalendarContainerProps) => (
//     <div className={clsx(monthsShown === 2 && "flex gap-4 p-2", className)}>
//       {children}
//     </div>
//   )
// );
// CalendarContainer.displayName = "CalendarContainer";

// interface PresetsPanelProps {
//   presets: typeof PREDEFINED_RANGES;
//   onSelect: (range: [Date | null, Date | null]) => void;
//   onClear: () => void;
// }

// const PresetsPanel = memo(
//   ({ presets, onSelect, onClear }: PresetsPanelProps) => (
//     <div className="w-32 p-2 border-r border-gray-200 bg-gray-50">
//       {presets.map((range, index) => (
//         <button
//           key={index}
//           type="button"
//           onClick={() => onSelect(range.range)}
//           className="block w-full text-left p-2 text-sm hover:bg-blue-500 transition duration-150 hover:text-white rounded"
//         >
//           {range.label}
//         </button>
//       ))}
//       <button
//         type="button"
//         onClick={onClear}
//         className="block w-full text-left p-2 text-sm text-red-500 hover:bg-gray-200 transition duration-150 rounded"
//       >
//         Clear
//       </button>
//     </div>
//   )
// );
// PresetsPanel.displayName = "PresetsPanel";

// interface DatePickerControlsProps {
//   onApply: () => void;
//   onCancel: () => void;
// }

// const DatePickerControls = memo(
//   ({ onApply, onCancel }: DatePickerControlsProps) => (
//     <div className="flex justify-between p-2 border-t border-gray-200">
//       <button
//         type="button"
//         onClick={onCancel}
//         className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
//       >
//         Cancel
//       </button>
//       <button
//         type="button"
//         onClick={onApply}
//         className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
//       >
//         Apply
//       </button>
//     </div>
//   )
// );
// DatePickerControls.displayName = "DatePickerControls";

// const CustomDatePicker = <T extends PickerMode>({
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
//   showPresetsPanel = true,
//   showWeekNumbers = false,
//   highlightDates,
//   locale,
//   showYearDropdown = false,
//   scrollableYearDropdown = false,
//   showMonthDropdown = false,
// }: CustomDatePickerProps<T>) => {
//   const isRangeMode = mode === "range";
//   const [isOpen, setIsOpen] = useState(inline);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const [tempValue, setTempValue] = useState<DateValue<T>>(value);

//   // Memoized values
//   const mergedDateFormat = useMemo(
//     () =>
//       dateFormat || (showTimeSelect ? "MMM d, yyyy h:mm aa" : "MMM d, yyyy"),
//     [dateFormat, showTimeSelect]
//   );

//   const allPresets = useMemo(() => {
//     const customPresets = presets.map((preset) => ({
//       label: preset.label,
//       range: Array.isArray(preset.value)
//         ? preset.value
//         : ([preset.value, preset.value] as [Date | null, Date | null]),
//     }));
//     return [...PREDEFINED_RANGES, ...customPresets];
//   }, [presets]);

//   const highlightDatesSet = useMemo(
//     () =>
//       highlightDates
//         ? new Set(highlightDates.map((d) => d.toDateString()))
//         : null,
//     [highlightDates]
//   );

//   // Event handlers
//   const handleClickOutside = useCallback((event: MouseEvent) => {
//     if (
//       wrapperRef.current &&
//       !wrapperRef.current.contains(event.target as Node)
//     ) {
//       setIsOpen(false);
//     }
//   }, []);

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
//     setTempValue((isRangeMode ? [null, null] : null) as DateValue<T>);
//   }, [isRangeMode]);

//   const handlePresetSelect = useCallback(
//     (range: [Date | null, Date | null]) => {
//       setTempValue((isRangeMode ? range : range[0]) as DateValue<T>);
//     },
//     [isRangeMode]
//   );

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

//   const dayClassName = useCallback(
//     (date: Date) =>
//       highlightDatesSet?.has(date.toDateString()) ? "bg-yellow-100" : "",
//     [highlightDatesSet]
//   );

//   const renderCustomHeader = useCallback(
//     ({
//       date,
//       decreaseMonth,
//       increaseMonth,
//       prevMonthButtonDisabled,
//       nextMonthButtonDisabled,
//       changeYear,
//       changeMonth,
//     }: ReactDatePickerCustomHeaderProps) => (
//       <div className="flex items-center justify-between px-4 py-2">
//         <button
//           type="button"
//           onClick={decreaseMonth}
//           disabled={prevMonthButtonDisabled}
//           className={clsx(
//             "p-2 rounded text-gray-600 hover:bg-gray-200 transition-colors",
//             prevMonthButtonDisabled && "opacity-50 cursor-not-allowed"
//           )}
//           aria-label="Previous Month"
//         >
//           <IoIosArrowBack className="w-5 h-5" />
//         </button>

//         <div className="flex items-center space-x-2">
//           {showMonthDropdown ? (
//             <select
//               value={getMonth(date)}
//               onChange={({ target: { value } }) => changeMonth(Number(value))}
//               className="px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0"
//             >
//               {MONTHS.map((month, index) => (
//                 <option key={month} value={index}>
//                   {month}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <span className="text-sm font-semibold text-gray-700">
//               {format(date, "MMMM", { locale })}
//             </span>
//           )}

//           {showYearDropdown ? (
//             <select
//               value={getYear(date)}
//               onChange={({ target: { value } }) => changeYear(Number(value))}
//               className={clsx(
//                 "px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
//                 scrollableYearDropdown && "h-8"
//               )}
//             >
//               {YEARS.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <span className="text-sm font-semibold text-gray-700">
//               {format(date, "yyyy", { locale })}
//             </span>
//           )}
//         </div>

//         <button
//           type="button"
//           onClick={increaseMonth}
//           disabled={nextMonthButtonDisabled}
//           className={clsx(
//             "p-2 rounded text-gray-600 hover:bg-gray-200 transition-colors",
//             nextMonthButtonDisabled && "opacity-50 cursor-not-allowed"
//           )}
//           aria-label="Next Month"
//         >
//           <IoIosArrowForward className="w-5 h-5" />
//         </button>
//       </div>
//     ),
//     [locale, showYearDropdown, showMonthDropdown, scrollableYearDropdown]
//   );

//   useEffect(() => {
//     if (!inline) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () =>
//         document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [handleClickOutside, inline]);

//   return (
//     <div ref={wrapperRef} className="relative w-full">
//       {!inline && (
//         <>
//           {showIcon
//             ? " "
//             : label && (
//                 <label className="block mb-1 text-xs font-bold text-gray-700">
//                   {label}
//                 </label>
//               )}
//           {showIcon ? (
//             <>
//               <div
//                 className="w-auto items-center space-x-2 p-2  rounded-md bg-white cursor-pointer"
//                 onClick={() => setIsOpen((prev) => !prev)}
//                 role="button"
//                 aria-label="Open date picker"
//               >
//                 <div className="bg-blue-950 p-2 rounded-lg">
//                   <BsCalendar2PlusFill className="text-white text-xl" />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <input
//                 readOnly
//                 aria-label={label}
//                 aria-haspopup="dialog"
//                 aria-expanded={isOpen}
//                 onClick={() => setIsOpen((prev) => !prev)}
//                 value={formatDisplayValue}
//                 placeholder={placeholder}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-0"
//               />
//             </>
//           )}
//         </>
//       )}

//       <div
//         className={clsx(
//           "z-50 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform duration-300 ease-in-out",
//           inline ? "static" : "absolute mt-2",
//           isOpen || inline
//             ? "opacity-100 translate-y-0 scale-100"
//             : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
//         )}
//       >
//         <div className="flex">
//           {showPresetsPanel && (
//             <PresetsPanel
//               presets={allPresets}
//               onSelect={handlePresetSelect}
//               onClear={handleClear}
//             />
//           )}

//           <div className="flex-1">
//             {isRangeMode ? (
//               <DatePicker
//                 selectsRange
//                 showIcon={showIcon}
//                 startDate={(tempValue as [Date | null, Date | null])[0]}
//                 endDate={(tempValue as [Date | null, Date | null])[1]}
//                 onChange={(dates) => setTempValue(dates as DateValue<T>)}
//                 inline
//                 monthsShown={monthsShown}
//                 calendarContainer={({ children, className }) => (
//                   <CalendarContainer
//                     monthsShown={monthsShown}
//                     className={className}
//                   >
//                     {children}
//                   </CalendarContainer>
//                 )}
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
//                 dayClassName={dayClassName}
//               />
//             ) : (
//               <DatePicker
//                 selected={tempValue as Date | null}
//                 onChange={(date) => setTempValue(date as DateValue<T>)}
//                 inline
//                 showIcon={showIcon}
//                 monthsShown={monthsShown}
//                 calendarContainer={({ children, className }) => (
//                   <CalendarContainer
//                     monthsShown={monthsShown}
//                     className={className}
//                   >
//                     {children}
//                   </CalendarContainer>
//                 )}
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
//                 dayClassName={dayClassName}
//               />
//             )}
//           </div>
//         </div>

//         {showApplyCancel && (
//           <DatePickerControls onApply={handleApply} onCancel={handleCancel} />
//         )}
//       </div>
//     </div>
//   );
// };

// CustomDatePicker.displayName = "CustomDatePicker";

// export default memo(CustomDatePicker);

/* eslint-disable jsx-a11y/role-supports-aria-props */

"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, Locale, getMonth, getYear } from "date-fns";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";
import "./CustomDateRangePicker.css";
import { BsCalendar2PlusFill } from "react-icons/bs";

// Constants
const PREDEFINED_RANGES: {
  label: string;
  range: [Date | null, Date | null];
}[] = [
  { label: "Today", range: [new Date(), new Date()] },
  {
    label: "Yesterday",
    range: [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
  },
  {
    label: "Last 7 Days",
    range: [new Date(Date.now() - 7 * 86400000), new Date()],
  },
  {
    label: "Last 30 Days",
    range: [new Date(Date.now() - 30 * 86400000), new Date()],
  },
  {
    label: "This Month",
    range: [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(),
    ],
  },
  {
    label: "Last Month",
    range: [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    ],
  },
  { label: "Custom Range", range: [null, null] },
];

const YEARS = Array.from(
  { length: 100 },
  (_, i) => getYear(new Date()) - 50 + i
);

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Types
type PickerMode = "single" | "range";

type DatePreset = {
  label: string;
  value: Date | [Date | null, Date | null];
};

type DateValue<T extends PickerMode> = T extends "single"
  ? Date | null
  : [Date | null, Date | null];

interface CustomDatePickerProps<T extends PickerMode> {
  label?: string;
  placeholder?: string;
  mode?: T;
  value: DateValue<T>;
  onChange: (date: DateValue<T>) => void;
  onApply?: (date: DateValue<T>) => void;
  onCancel?: () => void;
  monthsShown?: 1 | 2;
  showIcon?: boolean;
  showApplyCancel?: boolean;
  minDate?: Date;
  maxDate?: Date;
  excludeDates?: Date[];
  includeDates?: Date[];
  filterDate?: (date: Date) => boolean;
  inline?: boolean;
  showTimeSelect?: boolean;
  timeIntervals?: number;
  dateFormat?: string;
  presets?: DatePreset[];
  showPresetsPanel?: boolean;
  showWeekNumbers?: boolean;
  highlightDates?: Date[];
  locale?: Locale;
  showYearDropdown?: boolean;
  scrollableYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  className?: string; // Added for root div
  inputClassName?: string; // Added for input field
  popupClassName?: string; // Added for popup container
  calendarContainerClassName?: string; // Added for CalendarContainer
  presetsPanelClassName?: string; // Added for PresetsPanel
  presetButtonClassName?: string; // Added for preset buttons
  presetClearButtonClassName?: string; // Added for preset clear button
  controlsContainerClassName?: string; // Added for DatePickerControls container
  cancelButtonClassName?: string; // Added for cancel button
  applyButtonClassName?: string; // Added for apply button
  headerContainerClassName?: string; // Added for custom header
  prevMonthButtonClassName?: string; // Added for previous month button
  nextMonthButtonClassName?: string; // Added for next month button
  monthSelectClassName?: string; // Added for month dropdown
  yearSelectClassName?: string; // Added for year dropdown
  monthLabelClassName?: string; // Added for month label
  yearLabelClassName?: string; // Added for year label
  dayClassName?: (date: Date) => string; // Modified to allow override
}

// Sub-components
interface CalendarContainerProps {
  children: React.ReactNode;
  className?: string;
  monthsShown?: 1 | 2;
}

const CalendarContainer = memo(
  ({ children, className, monthsShown }: CalendarContainerProps) => (
    <div className={clsx(monthsShown === 2 && "flex gap-4 p-2", className)}>
      {children}
    </div>
  )
);
CalendarContainer.displayName = "CalendarContainer";

interface PresetsPanelProps {
  presets: typeof PREDEFINED_RANGES;
  onSelect: (range: [Date | null, Date | null]) => void;
  onClear: () => void;
  className?: string; // Added
  buttonClassName?: string; // Added
  clearButtonClassName?: string; // Added
}

const PresetsPanel = memo(
  ({
    presets,
    onSelect,
    onClear,
    className,
    buttonClassName,
    clearButtonClassName,
  }: PresetsPanelProps) => (
    <div
      className={clsx(
        "w-32 p-2 border-r border-gray-200 bg-gray-50",
        className
      )}
    >
      {presets.map((range, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(range.range)}
          className={clsx(
            "block w-full text-left p-2 text-sm hover:bg-blue-500 transition duration-150 hover:text-white rounded",
            buttonClassName
          )}
        >
          {range.label}
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className={clsx(
          "block w-full text-left p-2 text-sm text-red-500 hover:bg-gray-200 transition duration-150 rounded",
          clearButtonClassName
        )}
      >
        Clear
      </button>
    </div>
  )
);
PresetsPanel.displayName = "PresetsPanel";

interface DatePickerControlsProps {
  onApply: () => void;
  onCancel: () => void;
  className?: string; // Added
  cancelButtonClassName?: string; // Added
  applyButtonClassName?: string; // Added
}

const DatePickerControls = memo(
  ({
    onApply,
    onCancel,
    className,
    cancelButtonClassName,
    applyButtonClassName,
  }: DatePickerControlsProps) => (
    <div
      className={clsx(
        "flex justify-between p-2 border-t border-gray-200",
        className
      )}
    >
      <button
        type="button"
        onClick={onCancel}
        className={clsx(
          "px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors",
          cancelButtonClassName
        )}
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onApply}
        className={clsx(
          "px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors",
          applyButtonClassName
        )}
      >
        Apply
      </button>
    </div>
  )
);
DatePickerControls.displayName = "DatePickerControls";

const CustomDatePicker = <T extends PickerMode>({
  label = "Select Date",
  placeholder = "Choose a date",
  mode = "single" as T,
  value,
  onChange,
  onApply,
  onCancel,
  monthsShown = 1,
  showApplyCancel = false,
  minDate,
  maxDate,
  excludeDates,
  includeDates,
  filterDate,
  inline = false,
  showIcon = false,
  showTimeSelect = false,
  timeIntervals = 30,
  dateFormat,
  presets = [],
  showPresetsPanel = true,
  showWeekNumbers = false,
  highlightDates,
  locale,
  showYearDropdown = false,
  scrollableYearDropdown = false,
  showMonthDropdown = false,
  className, // Added
  inputClassName, // Added
  popupClassName, // Added
  calendarContainerClassName, // Added
  presetsPanelClassName, // Added
  presetButtonClassName, // Added
  presetClearButtonClassName, // Added
  controlsContainerClassName, // Added
  cancelButtonClassName, // Added
  applyButtonClassName, // Added
  headerContainerClassName, // Added
  prevMonthButtonClassName, // Added
  nextMonthButtonClassName, // Added
  monthSelectClassName, // Added
  yearSelectClassName, // Added
  monthLabelClassName, // Added
  yearLabelClassName, // Added
  dayClassName: customDayClassName, // Renamed to avoid conflict
}: CustomDatePickerProps<T>) => {
  const isRangeMode = mode === "range";
  const [isOpen, setIsOpen] = useState(inline);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tempValue, setTempValue] = useState<DateValue<T>>(value);

  // Memoized values
  const mergedDateFormat = useMemo(
    () =>
      dateFormat || (showTimeSelect ? "MMM d, yyyy h:mm aa" : "MMM d, yyyy"),
    [dateFormat, showTimeSelect]
  );

  const allPresets = useMemo(() => {
    const customPresets = presets.map((preset) => ({
      label: preset.label,
      range: Array.isArray(preset.value)
        ? preset.value
        : ([preset.value, preset.value] as [Date | null, Date | null]),
    }));
    return [...PREDEFINED_RANGES, ...customPresets];
  }, [presets]);

  const highlightDatesSet = useMemo(
    () =>
      highlightDates
        ? new Set(highlightDates.map((d) => d.toDateString()))
        : null,
    [highlightDates]
  );

  // Event handlers
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleApply = useCallback(() => {
    onChange(tempValue);
    onApply?.(tempValue);
    setIsOpen(false);
  }, [tempValue, onChange, onApply]);

  const handleCancel = useCallback(() => {
    setTempValue(value);
    onCancel?.();
    setIsOpen(false);
  }, [value, onCancel]);

  const handleClear = useCallback(() => {
    setTempValue((isRangeMode ? [null, null] : null) as DateValue<T>);
  }, [isRangeMode]);

  const handlePresetSelect = useCallback(
    (range: [Date | null, Date | null]) => {
      setTempValue((isRangeMode ? range : range[0]) as DateValue<T>);
    },
    [isRangeMode]
  );

  const formatDisplayValue = useMemo(() => {
    if (isRangeMode) {
      const [start, end] = value as [Date | null, Date | null];
      return start && end
        ? `${format(start, mergedDateFormat)} - ${format(
            end,
            mergedDateFormat
          )}`
        : "";
    }
    return value ? format(value as Date, mergedDateFormat) : "";
  }, [value, isRangeMode, mergedDateFormat]);

  const dayClassName = useCallback(
    (date: Date) =>
      clsx(
        highlightDatesSet?.has(date.toDateString()) && "bg-yellow-100",
        customDayClassName?.(date)
      ),
    [highlightDatesSet, customDayClassName]
  );

  const renderCustomHeader = useCallback(
    ({
      date,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
      changeYear,
      changeMonth,
    }: ReactDatePickerCustomHeaderProps) => (
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-2",
          headerContainerClassName
        )}
      >
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className={clsx(
            "p-2 rounded text-gray-600 hover:bg-gray-200 transition-colors",
            prevMonthButtonDisabled && "opacity-50 cursor-not-allowed",
            prevMonthButtonClassName
          )}
          aria-label="Previous Month"
        >
          <IoIosArrowBack className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          {showMonthDropdown ? (
            <select
              value={getMonth(date)}
              onChange={({ target: { value } }) => changeMonth(Number(value))}
              className={clsx(
                "px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0",
                monthSelectClassName
              )}
            >
              {MONTHS.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          ) : (
            <span
              className={clsx(
                "text-sm font-semibold text-gray-700",
                monthLabelClassName
              )}
            >
              {format(date, "MMMM", { locale })}
            </span>
          )}

          {showYearDropdown ? (
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(Number(value))}
              className={clsx(
                "px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                scrollableYearDropdown && "h-8",
                yearSelectClassName
              )}
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          ) : (
            <span
              className={clsx(
                "text-sm font-semibold text-gray-700",
                yearLabelClassName
              )}
            >
              {format(date, "yyyy", { locale })}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className={clsx(
            "p-2 rounded text-gray-600 hover:bg-gray-200 transition-colors",
            nextMonthButtonDisabled && "opacity-50 cursor-not-allowed",
            nextMonthButtonClassName
          )}
          aria-label="Next Month"
        >
          <IoIosArrowForward className="w-5 h-5" />
        </button>
      </div>
    ),
    [
      locale,
      showYearDropdown,
      showMonthDropdown,
      scrollableYearDropdown,
      headerContainerClassName,
      prevMonthButtonClassName,
      nextMonthButtonClassName,
      monthSelectClassName,
      yearSelectClassName,
      monthLabelClassName,
      yearLabelClassName,
    ]
  );

  useEffect(() => {
    if (!inline) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [handleClickOutside, inline]);

  return (
    <div
      ref={wrapperRef}
      className={clsx("relative w-full", className)} // Added className prop
    >
      {!inline && (
        <>
          {showIcon
            ? " "
            : label && (
                <label className="block mb-1 text-xs font-bold text-gray-700">
                  {label}
                </label>
              )}
          {showIcon ? (
            <>
              <div
                className={clsx(
                  "w-auto items-center space-x-2 p-2 rounded-md bg-white cursor-pointer",
                  inputClassName // Reusing inputClassName for consistency
                )}
                onClick={() => setIsOpen((prev) => !prev)}
                role="button"
                aria-label="Open date picker"
              >
                <div className="bg-blue-950 p-2 rounded-lg">
                  <BsCalendar2PlusFill className="text-white text-xl" />
                </div>
              </div>
            </>
          ) : (
            <>
              <input
                readOnly
                aria-label={label}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                value={formatDisplayValue}
                placeholder={placeholder}
                className={clsx(
                  "w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-0",
                  inputClassName
                )}
              />
            </>
          )}
        </>
      )}

      <div
        className={clsx(
          "z-50 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform duration-300 ease-in-out",
          inline ? "static" : "absolute mt-2",
          isOpen || inline
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none",
          popupClassName
        )}
      >
        <div className="flex">
          {showPresetsPanel && (
            <PresetsPanel
              presets={allPresets}
              onSelect={handlePresetSelect}
              onClear={handleClear}
              className={presetsPanelClassName}
              buttonClassName={presetButtonClassName}
              clearButtonClassName={presetClearButtonClassName}
            />
          )}

          <div className="flex-1">
            {isRangeMode ? (
              <DatePicker
                selectsRange
                showIcon={showIcon}
                startDate={(tempValue as [Date | null, Date | null])[0]}
                endDate={(tempValue as [Date | null, Date | null])[1]}
                onChange={(dates) => setTempValue(dates as DateValue<T>)}
                inline
                monthsShown={monthsShown}
                calendarContainer={({ children, className }) => (
                  <CalendarContainer
                    monthsShown={monthsShown}
                    className={clsx(className, calendarContainerClassName)}
                  >
                    {children}
                  </CalendarContainer>
                )}
                minDate={minDate}
                maxDate={maxDate}
                excludeDates={excludeDates}
                includeDates={includeDates}
                filterDate={filterDate}
                showTimeSelect={showTimeSelect}
                timeIntervals={timeIntervals}
                dateFormat={mergedDateFormat}
                showWeekNumbers={showWeekNumbers}
                highlightDates={highlightDates}
                locale={locale}
                showYearDropdown={showYearDropdown}
                scrollableYearDropdown={scrollableYearDropdown}
                renderCustomHeader={renderCustomHeader}
                dayClassName={dayClassName}
              />
            ) : (
              <DatePicker
                selected={tempValue as Date | null}
                onChange={(date) => setTempValue(date as DateValue<T>)}
                inline
                showIcon={showIcon}
                monthsShown={monthsShown}
                calendarContainer={({ children, className }) => (
                  <CalendarContainer
                    monthsShown={monthsShown}
                    className={clsx(className, calendarContainerClassName)}
                  >
                    {children}
                  </CalendarContainer>
                )}
                minDate={minDate}
                maxDate={maxDate}
                excludeDates={excludeDates}
                includeDates={includeDates}
                filterDate={filterDate}
                showTimeSelect={showTimeSelect}
                timeIntervals={timeIntervals}
                dateFormat={mergedDateFormat}
                showWeekNumbers={showWeekNumbers}
                highlightDates={highlightDates}
                locale={locale}
                showYearDropdown={showYearDropdown}
                scrollableYearDropdown={scrollableYearDropdown}
                renderCustomHeader={renderCustomHeader}
                dayClassName={dayClassName}
              />
            )}
          </div>
        </div>

        {showApplyCancel && (
          <DatePickerControls
            onApply={handleApply}
            onCancel={handleCancel}
            className={controlsContainerClassName}
            cancelButtonClassName={cancelButtonClassName}
            applyButtonClassName={applyButtonClassName}
          />
        )}
      </div>
    </div>
  );
};

CustomDatePicker.displayName = "CustomDatePicker";

export default memo(CustomDatePicker);
