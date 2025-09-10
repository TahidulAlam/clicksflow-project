"use client";

import React from "react";
import { Modal } from "@/components/shared/modal/Modal";
import Image from "next/image";

interface ThumbnailModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  title?: string;
}

const ThumbnailModal: React.FC<ThumbnailModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || "No Title"}
      size="lg"
      position="top"
    >
      <div className="flex flex-col items-center gap-4">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title || "Thumbnail"}
            width={450}
            height={450}
            className="rounded-xl object-cover"
          />
        ) : (
          <div className="w-[250px] h-[250px] flex items-center justify-center rounded-xl bg-gray-100 text-gray-400">
            No Image
          </div>
        )}

        {/* <h2 className="text-lg font-semibold text-gray-800">
          {title || "Untitled"}
        </h2> */}
      </div>
    </Modal>
  );
};

export default ThumbnailModal;
