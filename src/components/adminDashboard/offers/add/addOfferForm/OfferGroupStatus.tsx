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
