"use client";

import React, { useCallback } from "react";

import { Modal } from "@/components/shared/modal/Modal";

interface FraudDetectionDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;

  isSubmittingForm?: boolean;
  title?: string;
}

const FraudDetectionDescriptionModal: React.FC<
  FraudDetectionDescriptionModalProps
> = ({ isOpen, onClose, title }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title ?? "Add Adjustment"}
      size="md"
      position="top"
    >
      <h1>
        Make your fraud detection better by using IPQualityScore. It helps you
        find and stop suspicious things, keeping your online place safe from
        fraud and account takeovers. This way, people can use your platform
        easily and safely.
      </h1>
    </Modal>
  );
};

export default FraudDetectionDescriptionModal;
