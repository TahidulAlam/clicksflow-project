"use client";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";

import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import ReferralSettingsModal from "./ReferralSettingsModal";

const referralGlobalSetting = [
  {
    label: "Enable Partner Referral",
    value: "ON",
  },
  { label: "Method", value: "flat Amount" },
  { label: "Commission Amount", value: "$3" },
  {
    label: "Recurring Bonus",
    value: "Enabled",
  },
  { label: "Commission Type", value: "Payout" },
  { label: "Minimum Threshold", value: "$10" },
  { label: "Commission Period", value: "30 Days" },
];

const ReferralSettings = () => {
  const [isGlobalSettingEditModal, setIsGlobalSettingEditModal] =
    useState(false);
  return (
    <div>
      <BoxAccordion className="w-1/2">
        <BoxHeader
          collapsible={true}
          className="bg-blue-100 flex justify-between items-center"
        >
          <h2 className="text-sm font-bold py-1">Global Setting</h2>

          <button
            type="button"
            className="text-blue-950 cursor-pointer flex items-center gap-2 text-sm"
            onClick={() => setIsGlobalSettingEditModal(true)}
          >
            <FaPen />
            <span>Edit</span>
          </button>
        </BoxHeader>
        <BoxContent>
          <div className=" bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
            {referralGlobalSetting?.map((setting, index) => (
              <div key={index} className="flex-col px-4 py-2 ">
                <div>
                  <span className="text-xs font-bold text-black">
                    {setting.label}
                  </span>
                </div>
                <div>
                  <span
                    className={`text-xs px-2 py-1 ${
                      setting.value === "ON" ? " text-green-700" : " text-black"
                    }`}
                  >
                    {setting.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </BoxContent>
      </BoxAccordion>
      <ReferralSettingsModal
        isOpen={isGlobalSettingEditModal}
        onClose={() => setIsGlobalSettingEditModal(false)}
        onSubmitSuccess={() => {}}
        isLoading={false}
      />
    </div>
  );
};

export default ReferralSettings;
