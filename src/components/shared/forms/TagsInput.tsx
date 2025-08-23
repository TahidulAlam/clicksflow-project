/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   ChangeEvent,
//   KeyboardEvent,
// } from "react";

// export interface OptionType {
//   label: string;
//   value: string;
// }

// interface TagsInputProps {
//   id?: string;
//   label?: string;
//   className?: string;
//   labelSpan?: boolean;
//   required?: boolean;
//   tags: string[];
//   setTags: (tags: string[]) => void;
//   inputValue: string;
//   setInputValue: (value: string) => void;
//   suggestions?: OptionType[];
// }

// const TagsInput: React.FC<TagsInputProps> = ({
//   id,
//   label = "Label",
//   labelSpan = false,
//   required = false,
//   tags,
//   setTags,
//   inputValue,
//   className = "",
//   setInputValue,
//   suggestions = [],
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const toggleTag = (value: string) => {
//     if (tags.includes(value)) {
//       setTags(tags.filter((tag) => tag !== value));
//     } else {
//       setTags([...tags, value]);
//     }
//     setInputValue("");
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       if (inputValue.trim()) {
//         toggleTag(inputValue.trim());
//       }
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//     setIsDropdownOpen(true);
//   };

//   const removeTag = (index: number) => {
//     setTags(tags.filter((_, i) => i !== index));
//   };

//   const filteredSuggestions = suggestions.filter((option) =>
//     option.label.toLowerCase().includes(inputValue.toLowerCase())
//   );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div ref={containerRef} className={`relative ${className}`}>
//       {label && (
//         <label
//           htmlFor={id}
//           className="block mb-2 text-xs font-semibold text-gray-800"
//         >
//           {label}{" "}
//           {labelSpan && (
//             <span className="text-xs font-normal text-gray-500">
//               Separate multiple label by ,(comma) or{" "}
//               <span className="text-red-500">enter</span> key
//             </span>
//           )}
//           {required && <span className="text-red-700">*</span>}
//         </label>
//       )}{" "}
//       <div className="flex flex-wrap items-center gap-2 px-2 py-[6px] bg-white border border-gray-300 rounded-md focus:shadow-md focus:outline-none focus:ring-0">
//         {tags.map((tag, index) => (
//           <div
//             key={index}
//             className="flex items-center text-xs bg-indigo-500 text-white pr-2 rounded"
//           >
//             <button
//               type="button"
//               onClick={() => removeTag(index)}
//               className="px-1 py-[4px] flex justify-center text-center border-r border-gray-300 text-white hover:text-gray-200"
//             >
//               ×
//             </button>
//             <span className="text-sm px-1">{tag}</span>
//           </div>
//         ))}
//         <input
//           id={id}
//           type="text"
//           value={inputValue}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           onFocus={() => setIsDropdownOpen(true)}
//           className="flex-1 min-w-[150px] bg-transparent focus:outline-none"
//         />
//       </div>
//       {isDropdownOpen && filteredSuggestions.length > 0 && (
//         <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow max-h-48 overflow-y-auto">
//           {filteredSuggestions.map((option, index) => {
//             const isSelected = tags.includes(option.value);
//             return (
//               <li
//                 key={index}
//                 className={`px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-indigo-100 text-sm ${
//                   isSelected ? "bg-indigo-50" : ""
//                 }`}
//                 onClick={() => toggleTag(option.value)}
//               >
//                 <span>{option.label ? option.label : "No suggestion"}</span>
//                 {/* {isSelected && (
//                   <span className="text-indigo-500 text-xs">✓ Selected</span>
//                 )} */}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TagsInput;

"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  useFormContext,
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

export interface OptionType {
  label: string;
  value: string;
}

interface TagsInputProps<T extends FieldValues> {
  name?: Path<T>;
  id?: string;
  label?: string;
  labelSpan?: boolean;
  required?: boolean;
  className?: string;
  suggestions?: OptionType[];

  // Unified tag management props
  tags?: string[];
  setTags?: (tags: string[]) => void;

  // Input text management
  inputValue?: string;
  setInputValue?: (value: string) => void;

  // Fallback for standard controlled pattern
  value?: string[];
  onChange?: (tags: string[]) => void;

  // RHF integration
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  error?: string;

  // Accessibility and UI
  ariaLabel?: string;
  disabled?: boolean;
}

const TagsInput = <T extends FieldValues>({
  name,
  id,
  label = "Label",
  labelSpan = false,
  required = false,
  className = "",
  suggestions = [],

  // Tag management
  tags: propTags,
  setTags: propSetTags,
  value: controlledValue,
  onChange: controlledOnChange,

  // Input text management
  inputValue: controlledInputValue,
  setInputValue: propSetInputValue,

  // RHF
  register: externalRegister,
  errors: externalErrors,
  error: externalError,

  // Accessibility
  ariaLabel,
  disabled = false,
}: TagsInputProps<T>) => {
  const formContext = useFormContext<T>();
  const isRHFControlled = !!name && (!!formContext || !!externalRegister);

  // Tag state management (controlled vs uncontrolled)
  const [internalTags, setInternalTags] = useState<string[]>([]);
  const [internalInputValue, setInternalInputValue] = useState("");

  // Determine actual values
  const tags =
    propTags !== undefined
      ? propTags
      : controlledValue !== undefined
      ? controlledValue
      : isRHFControlled && name
      ? formContext?.watch(name) || []
      : internalTags;

  const actualInputValue =
    controlledInputValue !== undefined
      ? controlledInputValue
      : internalInputValue;

  // Error handling
  const rhfError =
    isRHFControlled && name
      ? externalErrors
        ? externalErrors[name]?.message?.toString()
        : formContext?.formState.errors[name]?.message?.toString()
      : null;
  const error = externalError ?? rhfError;

  const inputId = useMemo(
    () => id || name || label.toLowerCase().replace(/\s+/g, "-"),
    [id, name, label]
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update tags consistently
  const updateTags = useCallback(
    (newTags: string[]) => {
      if (propSetTags) {
        propSetTags(newTags);
      } else if (controlledOnChange) {
        controlledOnChange(newTags);
      } else if (isRHFControlled && name && formContext) {
        formContext.setValue(name, newTags as any, { shouldValidate: true });
      } else {
        setInternalTags(newTags);
      }
    },
    [propSetTags, controlledOnChange, isRHFControlled, name, formContext]
  );

  // Update input text consistently
  const updateInputValue = useCallback(
    (value: string) => {
      if (propSetInputValue) {
        propSetInputValue(value);
      } else {
        setInternalInputValue(value);
      }
    },
    [propSetInputValue]
  );

  // Toggle tag selection
  const toggleTag = useCallback(
    (value: string) => {
      const updatedTags = tags.includes(value)
        ? tags.filter((tag) => tag !== value)
        : [...tags, value];

      updateTags(updatedTags);
      updateInputValue("");
    },
    [tags, updateTags, updateInputValue]
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        if (actualInputValue.trim()) {
          toggleTag(actualInputValue.trim());
        }
      }
    },
    [actualInputValue, toggleTag]
  );

  // Handle input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateInputValue(e.target.value);
      setIsDropdownOpen(true);
    },
    [updateInputValue]
  );

  // Remove tag
  const removeTag = useCallback(
    (index: number) => {
      const updatedTags = [...tags];
      updatedTags.splice(index, 1);
      updateTags(updatedTags);
    },
    [tags, updateTags]
  );

  // Filter suggestions
  const filteredSuggestions = useMemo(
    () =>
      suggestions.filter((option) =>
        option.label.toLowerCase().includes(actualInputValue.toLowerCase())
      ),
    [suggestions, actualInputValue]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-xs font-semibold text-gray-800"
        >
          {label}
          {labelSpan && (
            <span className="text-xs font-normal text-gray-500">
              {" Separate multiple values with ,(comma) or "}
              <span className="text-red-500">Enter</span> key
            </span>
          )}
          {required && <span className="text-red-700">*</span>}
        </label>
      )}

      <div
        className={`flex flex-wrap items-center gap-2 px-2 py-[6px] border rounded-md focus:shadow-md focus:outline-none focus:ring-0 ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-white border-gray-300"
        } ${error ? "border-red-500" : ""}`}
        aria-describedby={error ? `${inputId}-error` : undefined}
      >
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center text-xs bg-indigo-500 text-white pr-2 rounded"
            role="listitem"
          >
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="px-1 py-[4px] flex justify-center text-center border-r border-gray-300 text-white hover:text-gray-200"
              aria-label={`Remove ${tag}`}
              disabled={disabled}
            >
              ×
            </button>
            <span className="text-sm px-1">{tag}</span>
          </div>
        ))}
        <input
          id={inputId}
          type="text"
          value={actualInputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(true)}
          className={`flex-1 min-w-[150px] bg-transparent focus:outline-none ${
            disabled ? "cursor-not-allowed" : ""
          }`}
          aria-label={ariaLabel || label}
          aria-invalid={!!error}
          disabled={disabled}
        />
      </div>

      {isDropdownOpen && filteredSuggestions.length > 0 && !disabled && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow max-h-48 overflow-y-auto"
          role="listbox"
        >
          {filteredSuggestions.map((option, index) => {
            const isSelected = tags.includes(option.value);
            return (
              <li
                key={index}
                className={`px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-indigo-100 text-sm ${
                  isSelected ? "bg-indigo-50" : ""
                }`}
                onClick={() => toggleTag(option.value)}
                role="option"
                aria-selected={isSelected}
              >
                <span>{option.label}</span>
              </li>
            );
          })}
        </ul>
      )}

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TagsInput;

// "use client";
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   ChangeEvent,
//   KeyboardEvent,
//   useCallback,
// } from "react";
// import { useFormContext, FieldValues, Path } from "react-hook-form";

// export interface OptionType {
//   label: string;
//   value: string;
// }

// interface TagsInputProps<T extends FieldValues> {
//   name: Path<T>;
//   id?: string;
//   label?: string;
//   labelSpan?: boolean;
//   required?: boolean;
//   className?: string;
//   suggestions?: OptionType[];
// }

// function TagsInput<T extends FieldValues>({
//   name,
//   id,
//   label = "Label",
//   labelSpan = false,
//   required = false,
//   className = "",
//   suggestions = [],
// }: TagsInputProps<T>) {
//   const {
//     setValue,
//     getValues,
//     watch,
//     formState: { errors },
//   } = useFormContext<T>();

//   const [inputValue, setInputValue] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const tags: string[] = watch(name) || [];

//   const toggleTag = useCallback(
//     (value: string) => {
//       const currentTags: string[] = getValues(name) || [];
//       const updatedTags = currentTags.includes(value)
//         ? currentTags.filter((tag) => tag !== value)
//         : [...currentTags, value];

//       setValue(name, updatedTags as any, { shouldValidate: true });
//       setInputValue("");
//     },
//     [getValues, setValue, name]
//   );

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       if (inputValue.trim()) {
//         toggleTag(inputValue.trim());
//       }
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//     setIsDropdownOpen(true);
//   };

//   const removeTag = (index: number) => {
//     const updatedTags = tags.filter((_, i) => i !== index);
//     setValue(name, updatedTags as any, { shouldValidate: true });
//   };

//   const filteredSuggestions = suggestions.filter((option) =>
//     option.label.toLowerCase().includes(inputValue.toLowerCase())
//   );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div ref={containerRef} className={`relative ${className}`}>
//       {label && (
//         <label
//           htmlFor={id}
//           className="block mb-2 text-xs font-semibold text-gray-800"
//         >
//           {label}{" "}
//           {labelSpan && (
//             <span className="text-xs font-normal text-gray-500">
//               Separate multiple values with ,(comma) or{" "}
//               <span className="text-red-500">Enter</span> key
//             </span>
//           )}
//           {required && <span className="text-red-700">*</span>}
//         </label>
//       )}

//       <div className="flex flex-wrap items-center gap-2 px-2 py-[6px] bg-white border border-gray-300 rounded-md focus:shadow-md focus:outline-none focus:ring-0">
//         {tags.map((tag, index) => (
//           <div
//             key={index}
//             className="flex items-center text-xs bg-indigo-500 text-white pr-2 rounded"
//           >
//             <button
//               type="button"
//               onClick={() => removeTag(index)}
//               className="px-1 py-[4px] flex justify-center text-center border-r border-gray-300 text-white hover:text-gray-200"
//             >
//               ×
//             </button>
//             <span className="text-sm px-1">{tag}</span>
//           </div>
//         ))}
//         <input
//           id={id}
//           type="text"
//           value={inputValue}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           onFocus={() => setIsDropdownOpen(true)}
//           className="flex-1 min-w-[150px] bg-transparent focus:outline-none"
//         />
//       </div>

//       {isDropdownOpen && filteredSuggestions.length > 0 && (
//         <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow max-h-48 overflow-y-auto">
//           {filteredSuggestions.map((option, index) => {
//             const isSelected = tags.includes(option.value);
//             return (
//               <li
//                 key={index}
//                 className={`px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-indigo-100 text-sm ${
//                   isSelected ? "bg-indigo-50" : ""
//                 }`}
//                 onClick={() => toggleTag(option.value)}
//               >
//                 <span>{option.label}</span>
//               </li>
//             );
//           })}
//         </ul>
//       )}

//       {errors[name] && (
//         <p className="mt-1 text-sm text-red-500">
//           {String(errors[name]?.message)}
//         </p>
//       )}
//     </div>
//   );
// }

// export default TagsInput;
