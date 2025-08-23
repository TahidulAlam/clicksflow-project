import React, { useState } from "react";
import FraudDetectionDescriptionModal from "./FraudDetectionDescriptionModal";
import FraudDetectionSetupModal from "./FraudDetectionSetupModal";
import Image from "next/image";

const FraudDetectionIntegration = () => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isDescriptionSetup, setIsDescriptionSetup] = useState(false);
  return (
    <div className="bg-blue-50 text-blue-950 p-4 rounded-lg border border-gray-300 mt-5 w-96 h-[150px] flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h1>IP QUALITY SCORE</h1>
        <Image
          src="/ipqualitycheck.png"
          alt="Small Logo"
          width={40}
          height={40}
          className={`w-10 h-10 object-cover transition-all duration-300 `}
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-white text-black border border-gray-300  rounded-lg text-xs"
          onClick={() => setIsDescriptionModalOpen(true)}
        >
          Description
        </button>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-white text-black border border-gray-300  rounded-lg text-xs"
          onClick={() => setIsDescriptionSetup(true)}
        >
          Setup
        </button>
      </div>
      <FraudDetectionDescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => {
          setIsDescriptionModalOpen(false);
        }}
        title="IP Quality Score"
      />
      <FraudDetectionSetupModal
        isOpen={isDescriptionSetup}
        onClose={() => {
          setIsDescriptionSetup(false);
        }}
        onSubmitSuccess={() => {}}
        isLoading={false}
      />
    </div>
  );
};

export default FraudDetectionIntegration;
