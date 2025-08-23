/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import ConfigGenSecurityModal from "./ConfigGenSecurityModal";

const ConfigGenSecurity = () => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (newChecked) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setChecked(false);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <label className="text-xs font-bold text-gray-800 truncate">
        Google Authenticator
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`
          relative inline-flex w-14 h-7 items-center rounded-full transition-colors duration-200
          ${checked ? "bg-[#1A2B49]" : "bg-gray-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200
            ${checked ? "translate-x-8" : "translate-x-1"}
          `}
        />
      </button>

      {/* Modal */}
      <ConfigGenSecurityModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ConfigGenSecurity;
