"use client";

import React, { useCallback } from "react";

import { Modal } from "@/components/shared/modal/Modal";

interface ECommerceDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;

  isSubmittingForm?: boolean;
  title?: string;
}

const ECommerceDescriptionModal: React.FC<ECommerceDescriptionModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title ?? "Description"}
      size="md"
      position="top"
    >
      <h1>
        Generate a WordPress plugin for WooCommerce conversion tracking.
        Configure your advertiser and tracking URL to download a ready-to-use
        plugin.
      </h1>
    </Modal>
  );
};

export default ECommerceDescriptionModal;
