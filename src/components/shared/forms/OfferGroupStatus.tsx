"use client";
import React from "react";
import SingleSelect from "../dataTable/SingleSelect";
import ToggleSwitch from "../buttons/ToggleSwitch";

interface OfferGroupStatusProps {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  showSelect: boolean;
  selectedValue?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

const OfferGroupStatus: React.FC<OfferGroupStatusProps> = ({
  toggle,
  setToggle,
  showSelect,
  selectedValue,
  placeholder,
  onChange,
}) => {
  const [value, setValue] = React.useState(selectedValue || "");

  return (
    <div className="flex w-full">
      <div className="z-10 self-start py-4 pr-4">
        <ToggleSwitch
          label="Offer Group Status"
          checked={toggle}
          onChange={setToggle}
        />
      </div>
      {showSelect && (
        <div className="w-px relative h-36 -rotate-90 bg-gray-300 -mt-3 py-4" />
      )}
      {showSelect && (
        <div className="self-start w-full z-10 p-4 pb-8 border border-gray-300 rounded-lg bg-gray-50">
          <SingleSelect
            id="offerGroup"
            label="Offer Group"
            required
            options={[
              { value: "option1", label: "Option One" },
              { value: "option2", label: "Option Two" },
              { value: "option3", label: "Option Three" },
            ]}
            value={value}
            onChange={(val) => {
              setValue(val);
              onChange?.(val);
            }}
            placeholder={placeholder || "Select an option"}
            error={undefined}
          />
        </div>
      )}
    </div>
  );
};

export default OfferGroupStatus;
