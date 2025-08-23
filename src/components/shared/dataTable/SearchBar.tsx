// "use client";
// import React from "react";
// import { BsSearch } from "react-icons/bs";

// interface SearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }

// const SearchBar: React.FC<SearchBarProps> = ({
//   value,
//   onChange,
//   placeholder = "Search ID/Name",
// }) => {
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onChange(e.target.value);
//   };

//   return (
//     <div className="flex py-2">
//       <input
//         type="text"
//         value={value}
//         onChange={handleInputChange}
//         placeholder={placeholder}
//         className="w-full max-w-md px-4 py-1 bg-[#F2F7FD] border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0 "
//       />
//       <button className="py-1 rounded-r-lg bg-[#EBEFF5] border-r-2 border-t-2 border-b-2 border-gray-300 px-4">
//         <BsSearch />
//       </button>
//     </div>
//   );
// };

// export default SearchBar;

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  ariaLabel = "Search",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Fixed: direct onChange
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default SearchBar;

// "use client";
// import React from "react";
// import { BsSearch } from "react-icons/bs";

// interface SearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   ariaLabel: string;
// }

// const SearchBar: React.FC<SearchBarProps> = ({
//   value,
//   onChange,
//   placeholder = "Search ID/Name",
//   ariaLabel,
// }) => {
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onChange(e.target.value);
//   };

//   return (
//     <div className="flex py-2">
//       <input
//         type="text"
//         value={value}
//         onChange={handleInputChange}
//         placeholder={placeholder}
//         aria-label={ariaLabel}
//         className="w-full max-w-md px-4 py-1 bg-[#F2F7FD] border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0"
//       />
//       <button
//         aria-label="Clear search"
//         // onClick={() => handleInputChange}
//         onClick={() => onChange("")}
//         className="py-1 rounded-r-lg bg-[#EBEFF5] border-r-2 border-t-2 border-b-2 border-gray-300 px-4 hover:bg-gray-200"
//       >
//         <BsSearch />
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
