/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";

// const ConfigGenSecurityModal = () => {
//   return <div>ConfigGenSecurityModal</div>;
// };

// export default ConfigGenSecurityModal;

"use client";
import React from "react";
import { z } from "zod";

import FormArea from "@/components/shared/forms/FormArea";
import TextInput from "@/components/shared/forms/TextInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FormActions from "@/components/shared/forms/FormActions";
import { Modal } from "@/components/shared/modal/Modal";
import SectionDivider from "@/components/shared/SectionDivider";

// Configurable fraud block settings
export const fraudBlockSettings = [
  { key: "blockProxy", label: "Block Proxy" },
  { key: "blockVPN", label: "Block VPN" },
  { key: "blockTor", label: "Block TOR Browsers" },
  { key: "blockActiveTor", label: "Block Active TOR Browsers" },
  { key: "blockRecentAbuser", label: "Block Recent Abuser" },
  { key: "blockCrawler", label: "Block Crawler" },
  { key: "blockActiveVPN", label: "Block Active VPN" },
  { key: "blockBot", label: "Block BOT" },
] as const;

// Zod schema for form validation
const ConfigGenSecuritySchema = z.object({
  status: z.boolean().optional(),
});

type FormType = z.infer<typeof ConfigGenSecuritySchema>;

interface ConfigGenSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const ConfigGenSecurityModal: React.FC<ConfigGenSecurityModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Fraud Setup Data:", data);
    onSubmitSuccess?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="top"
      size="lg"
      title="Google Authenticator Setting"
    >
      <FormArea
        schema={ConfigGenSecuritySchema}
        defaultValues={{
          status: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            setValue,
            watch,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          const isStatusEnabled = watch("status") ?? false;

          return (
            <>
              <ToggleSwitch
                size="lg"
                label="Enable Status"
                checked={isStatusEnabled}
                onChange={(val) => setValue("status", val)}
                disabled={isSubmitting}
              />

              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => {
                  reset();
                  onClose();
                }}
              />
            </>
          );
        }}
      </FormArea>
    </Modal>
  );
};

export default ConfigGenSecurityModal;
