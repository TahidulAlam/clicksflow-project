// "use client";

// import React, { useMemo, useCallback, useState } from "react";
// import { FieldError } from "react-hook-form";

// interface Macro {
//   key: string;
//   label: string;
// }

// const MACROS: Macro[] = [
//   { key: "{sub1}", label: "Sub ID 1 in the partner tracking URL" },
//   { key: "{sub2}", label: "Sub ID 2 in the partner tracking URL" },
//   { key: "{sub3}", label: "Sub ID 3 in the partner tracking URL" },
//   { key: "{sub4}", label: "Sub ID 4 in the partner tracking URL" },
//   { key: "{sub5}", label: "Sub ID 5 in the partner tracking URL" },
//   { key: "{advertiser_id}", label: "ID of the advertiser" },
//   { key: "{advertiser_name}", label: "Name of the advertiser" },
//   { key: "{affiliate_id}", label: "ID of the partner" },
//   { key: "{affiliate_encoded_id}", label: "Encoded ID of the partner" },
// ];

// interface MacroBuilderProps {
//   label?: string;
//   labelSideSpan?: string;
//   placeholder?: string;
//   required?: boolean;
//   className?: string;
//   url: string;
//   setUrl: (val: string) => void;
//   error?: FieldError;
//   disabled?: boolean;
//   showDropdownButton?: boolean;
//   forceDropdownOpen?: boolean;
// }

// const MacroBuilder: React.FC<MacroBuilderProps> = ({
//   label,
//   labelSideSpan,
//   placeholder = "Search For...",
//   url,
//   setUrl,
//   error,
//   required = false,
//   className = "",
//   disabled,
//   showDropdownButton = true,
//   forceDropdownOpen = false,
// }) => {
//   const [internalDropdownOpen, setInternalDropdownOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const dropdownOpen = forceDropdownOpen || internalDropdownOpen;

//   const handleAddMacro = useCallback(
//     (macro: string) => {
//       setUrl(url + macro);
//       setSearchTerm("");
//     },
//     [url, setUrl]
//   );

//   const filteredMacros = useMemo(() => {
//     return MACROS.filter(
//       (macro) =>
//         macro.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         macro.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm]);

//   const errorId = error ? "macro-builder-error" : undefined;

//   return (
//     <div className={"space-y-2" + (className ? ` ${className}` : "")}>
//       <div
//         className={`flex items-center ${
//           showDropdownButton ? "justify-between" : ""
//         }`}
//       >
//         <label
//           htmlFor="macro-builder-textarea"
//           className="font-bold text-xs text-gray-700"
//         >
//           {label}
//           {labelSideSpan && (
//             <span className="text-xs font-base px-2"> {labelSideSpan}</span>
//           )}
//           {required && <span className="text-red-700 ml-1">*</span>}
//         </label>
//         {showDropdownButton && (
//           <button
//             type="button"
//             onClick={() => setInternalDropdownOpen((prev) => !prev)}
//             disabled={disabled}
//             className="text-xs text-blue-950 bg-white border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed "
//             aria-expanded={dropdownOpen}
//             aria-controls="macro-dropdown"
//           >
//             {dropdownOpen ? (
//               <>
//                 <span className="text-xs">{}Add Macro</span>
//               </>
//             ) : (
//               <>
//                 <span className="text-xs">{}Add Macro</span>
//               </>
//             )}
//           </button>
//         )}
//       </div>

//       <textarea
//         id="macro-builder-textarea"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         disabled={disabled}
//         className={`w-full border rounded-lg p-2 resize-y  ${
//           error ? "border-red-500" : "border-gray-300"
//         } focus:outline-none focus:ring-0 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-md`}
//         aria-describedby={errorId}
//         aria-required="true"
//         rows={4}
//       />

//       {error && (
//         <p id={errorId} className="text-red-500 text-sm mt-1">
//           {error.message}
//         </p>
//       )}

//       {dropdownOpen && (
//         <div
//           id="macro-dropdown"
//           className="mt-2 rounded shadow bg-white max-h-60 overflow-y-auto border border-gray-300"
//           role="listbox"
//         >
//           <input
//             type="text"
//             placeholder={placeholder}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             disabled={disabled}
//             className="w-full px-2 py-1 bg-gray-50 border-b border-gray-300 text-sm focus:outline-none sticky top-0  z-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
//             aria-label="Search macros"
//           />

//           <ul role="list">
//             {filteredMacros.length > 0 ? (
//               filteredMacros.map((macro) => (
//                 <li
//                   key={macro.key}
//                   onClick={() => !disabled && handleAddMacro(macro.key)}
//                   onKeyDown={(e) =>
//                     (e.key === "Enter" || e.key === " ") &&
//                     !disabled &&
//                     handleAddMacro(macro.key)
//                   }
//                   className={`cursor-pointer px-3 py-2 text-sm hover:bg-blue-100 ${
//                     disabled ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                   role="option"
//                   aria-selected={false}
//                   tabIndex={disabled ? -1 : 0}
//                 >
//                   <strong>{macro.key}</strong> – {macro.label}
//                 </li>
//               ))
//             ) : (
//               <li className="px-3 py-2 text-sm text-gray-500">
//                 No macros found
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(MacroBuilder);

"use client";

import React, { useMemo, useCallback, useState, useId } from "react";
import { useFormContext, FieldError } from "react-hook-form";

interface Macro {
  key: string;
  label: string;
}

const MACROS: Macro[] = [
  { key: "{sub1}", label: "Sub ID 1 in the partner tracking URL" },
  { key: "{sub2}", label: "Sub ID 2 in the partner tracking URL" },
  { key: "{sub3}", label: "Sub ID 3 in the partner tracking URL" },
  { key: "{sub4}", label: "Sub ID 4 in the partner tracking URL" },
  { key: "{sub5}", label: "Sub ID 5 in the partner tracking URL" },
  { key: "{advertiser_id}", label: "ID of the advertiser" },
  { key: "{advertiser_name}", label: "Name of the advertiser" },
  { key: "{affiliate_id}", label: "ID of the partner" },
  { key: "{affiliate_encoded_id}", label: "Encoded ID of the partner" },
];

interface MacroBuilderProps {
  name?: string; // for react-hook-form integration
  label?: string;
  labelSideSpan?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  url?: string; // controlled value
  setUrl?: (val: string) => void; // controlled setter
  error?: FieldError;
  disabled?: boolean;
  showDropdownButton?: boolean;
  forceDropdownOpen?: boolean;
}

const MacroBuilder: React.FC<MacroBuilderProps> = ({
  name,
  label,
  labelSideSpan,
  placeholder = "Search For...",
  url: controlledValue,
  setUrl: controlledSetUrl,
  error,
  required = false,
  className = "",
  disabled,
  showDropdownButton = true,
  forceDropdownOpen = false,
}) => {
  const form = useFormContext();
  const isUncontrolled = !!form?.getValues && !!name;

  const internalId = useId();
  const textareaId = name || `macro-builder-${internalId}`;

  // Decide which value to use: controlled or from RHF
  const fieldValue = isUncontrolled ? form.watch(name!) : controlledValue ?? "";

  const setFieldValue = useCallback(
    (val: string) => {
      if (isUncontrolled) form.setValue(name!, val);
      else controlledSetUrl?.(val);
    },
    [isUncontrolled, name, form, controlledSetUrl]
  );

  const [internalDropdownOpen, setInternalDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownOpen = forceDropdownOpen || internalDropdownOpen;

  const handleAddMacro = useCallback(
    (macro: string) => {
      setFieldValue(fieldValue + macro);
      setSearchTerm("");
    },
    [fieldValue, setFieldValue]
  );

  const filteredMacros = useMemo(() => {
    return MACROS.filter(
      (macro) =>
        macro.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        macro.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const errorId = error ? `${textareaId}-error` : undefined;

  return (
    <div className={"space-y-2 my-4" + (className ? ` ${className}` : "")}>
      <div
        className={`flex items-center ${
          showDropdownButton ? "justify-between" : ""
        }`}
      >
        {label && (
          <label
            htmlFor={textareaId}
            className="font-bold text-xs text-gray-700"
          >
            {label}
            {labelSideSpan && (
              <span className="text-xs font-base px-2"> {labelSideSpan}</span>
            )}
            {required && <span className="text-red-700 ml-1">*</span>}
          </label>
        )}
        {showDropdownButton && (
          <button
            type="button"
            onClick={() => setInternalDropdownOpen((prev) => !prev)}
            disabled={disabled}
            className="text-xs text-blue-950 bg-white border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed "
            aria-expanded={dropdownOpen}
            aria-controls="macro-dropdown"
          >
            Add Macro
          </button>
        )}
      </div>

      <textarea
        id={textareaId}
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
        disabled={disabled}
        className={`w-full border rounded-lg p-2 resize-y  ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-0 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-md`}
        aria-describedby={errorId}
        aria-required={required}
        rows={4}
      />

      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}

      {dropdownOpen && (
        <div
          id="macro-dropdown"
          className="mt-2 rounded shadow bg-white max-h-60 overflow-y-auto border border-gray-300"
          role="listbox"
        >
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={disabled}
            className="w-full px-2 py-1 bg-gray-50 border-b border-gray-300 text-sm focus:outline-none sticky top-0  z-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="Search macros"
          />

          <ul role="list">
            {filteredMacros.length > 0 ? (
              filteredMacros.map((macro) => (
                <li
                  key={macro.key}
                  onClick={() => !disabled && handleAddMacro(macro.key)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    !disabled &&
                    handleAddMacro(macro.key)
                  }
                  className={`cursor-pointer px-3 py-2 text-sm hover:bg-blue-100 ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  role="option"
                  aria-selected={false}
                  tabIndex={disabled ? -1 : 0}
                >
                  <strong>{macro.key}</strong> – {macro.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No macros found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(MacroBuilder);
