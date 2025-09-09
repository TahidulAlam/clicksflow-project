// "use client";
// import React from "react";
// import SingleSelect from "../dataTable/SingleSelect";
// import ToggleSwitch from "../buttons/ToggleSwitch";

// interface OfferGroupStatusProps {
//   toggle: boolean;
//   setToggle: (value: boolean) => void;
//   showSelect: boolean;
//   selectedValue?: string;
//   placeholder?: string;
//   onChange?: (val: string) => void;
// }

// const OfferGroupStatus: React.FC<OfferGroupStatusProps> = ({
//   toggle,
//   setToggle,
//   showSelect,
//   selectedValue,
//   placeholder,
//   onChange,
// }) => {
//   const [value, setValue] = React.useState(selectedValue || "");

//   return (
//     <div className="flex w-full">
//       <div className="z-10 self-start py-4 pr-4 ">
//         <ToggleSwitch
//           label="Offer Group Status"
//           checked={toggle}
//           onChange={setToggle}
//         />
//       </div>
//       {/* {showSelect && (
//         <div className="w-px relative h-36 -rotate-90 bg-gray-300 -mt-5 py-4" />
//       )} */}
//       {showSelect && (
//         <div
//           className="
//             relative lg:w-20 lg:-rotate-90 rotate-0 lg:h-px bg-gray-300 lg:my-auto lg:mt-[53px]
//             w-px h-5 my-0 mx-0
//           "
//         />
//       )}
//       {showSelect && (
//         <div className="self-start w-full z-10 p-4 pb-8 border border-gray-300 rounded-lg bg-gray-50">
//           <SingleSelect
//             id="offerGroup"
//             label="Offer Group"
//             required
//             options={[
//               { value: "option1", label: "Option One" },
//               { value: "option2", label: "Option Two" },
//               { value: "option3", label: "Option Three" },
//             ]}
//             value={value}
//             onChange={(val) => {
//               setValue(val);
//               onChange?.(val);
//             }}
//             placeholder={placeholder || "Select an option"}
//             error={undefined}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfferGroupStatus;

"use client";

import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import React from "react";

interface OfferGroupStatusProps {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  showSelect: boolean;
  selectedValue?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  error?: { message?: string };
}

const OfferGroupStatus: React.FC<OfferGroupStatusProps> = ({
  toggle,
  setToggle,
  showSelect,
  selectedValue = "",
  placeholder = "Select an option",
  onChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center w-full">
      {/* Toggle Section */}
      <div className="flex items-center z-10">
        <ToggleSwitch
          label="Offer Group Status"
          checked={toggle}
          onChange={setToggle}
        />
      </div>

      {/* Divider */}

      {showSelect && (
        <div className="w-px relative h-36 -rotate-90 bg-gray-300 mt-5 ml-5 py-10 lg:block hidden" />
      )}
      {showSelect && (
        <div
          className="
           relative lg:w-20 lg:h-px bg-gray-300 lg:my-auto lg:mt-[53px]
            w-px h-5 my-0 mx-0 ml-5 lg:ml-0 block lg:hidden
          "
        />
      )}
      {/* Select Section */}
      {showSelect && (
        <div className="w-full z-10 p-4 border border-gray-300 rounded-lg bg-[#F2F7FD]">
          <SingleSelect
            id="offerGroup"
            label="Offer Group"
            required
            options={[
              { value: "option1", label: "Option One" },
              { value: "option2", label: "Option Two" },
              { value: "option3", label: "Option Three" },
            ]}
            value={selectedValue}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      )}
    </div>
  );
};

export default OfferGroupStatus;

// "use client";
// import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
// import SingleSelect from "@/components/shared/dataTable/SingleSelect";
// import React from "react";

// interface OfferGroupStatusProps {
//   toggle: boolean;
//   setToggle: (value: boolean) => void;
//   showSelect: boolean;
//   selectedValue?: string;
//   placeholder?: string;
//   onChange?: (val: string) => void;
// }

// const OfferGroupStatus: React.FC<OfferGroupStatusProps> = ({
//   toggle,
//   setToggle,
//   showSelect,
//   selectedValue,
//   placeholder,
//   onChange,
// }) => {
//   const [value, setValue] = React.useState(selectedValue || "");

//   return (
//     <div className="flex flex-col lg:flex-row w-full">
//       {/* Toggle Section */}
//       <div className="z-10 pt-4 lg:pr-0 pr-4">
//         <ToggleSwitch
//           label="Offer Group Status"
//           checked={toggle}
//           onChange={setToggle}
//         />
//       </div>

//       {/* Divider */}
//       {/* {showSelect && (
//         <div
//           className="
//            relative lg:w-20 lg:h-px bg-gray-300 lg:my-auto lg:mt-[53px]
//             w-px h-5 my-0 mx-0 ml-5 lg:ml-0 -mr-10
//           "
//         />
//       )} */}
//       {showSelect && (
//         <div
//           className="
//       w-full h-px bg-gray-300 my-4
//       lg:w-px lg:h-16 lg:my-auto
//     "
//         />
//       )}
//       {/* Select Section */}
//       {showSelect && (
//         <div className="w-full z-10 p-4 pb-8 border border-gray-300 rounded-lg bg-gray-50">
//           <SingleSelect
//             id="offerGroup"
//             label="Offer Group"
//             required
//             options={[
//               { value: "option1", label: "Option One" },
//               { value: "option2", label: "Option Two" },
//               { value: "option3", label: "Option Three" },
//             ]}
//             value={value}
//             onChange={(val) => {
//               setValue(val);
//               onChange?.(val);
//             }}
//             placeholder={placeholder || "Select an option"}
//             error={undefined}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfferGroupStatus;
