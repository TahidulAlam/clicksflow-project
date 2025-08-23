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
const FraudDetectionSetupSchema = z.object({
  status: z.boolean().optional(),
  apiKey: z.string().min(2, "API Key is required").max(50),
  redirectURL: z.string().min(2, "API Key is required").max(50),
  strictness: z.number().min(0).max(10),
  fraudScore: z.number().min(0).max(100),
  fraudCheck: z.string().min(1, "Fraud Check is required"),
  isActive: z.boolean().optional(),
  notifyAdmin: z.boolean().optional(),

  // Block settings
  blockProxy: z.boolean().optional(),
  blockVPN: z.boolean().optional(),
  blockTor: z.boolean().optional(),
  blockActiveTor: z.boolean().optional(),
  blockRecentAbuser: z.boolean().optional(),
  blockCrawler: z.boolean().optional(),
  blockActiveVPN: z.boolean().optional(),
  blockBot: z.boolean().optional(),
});

type FormType = z.infer<typeof FraudDetectionSetupSchema>;

interface FraudDetectionSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const FraudDetectionSetupModal: React.FC<FraudDetectionSetupModalProps> = ({
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
      title="Fraud Detection Setup"
    >
      <FormArea
        schema={FraudDetectionSetupSchema}
        defaultValues={{
          status: false,
          apiKey: "pW1f7tMGDUPrQLBjV1LWDVqEHZfwrkE6",
          redirectURL:
            "https://www.ipqualityscore.com/disable-your-proxy-vpn-connection",
          strictness: 1,
          fraudScore: 30,
          fraudCheck: "basic",
          isActive: false,
          notifyAdmin: true,
          blockProxy: false,
          blockVPN: false,
          blockTor: false,
          blockActiveTor: false,
          blockRecentAbuser: false,
          blockCrawler: false,
          blockActiveVPN: false,
          blockBot: false,
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

              {isStatusEnabled && (
                <>
                  <div className="flex gap-4 w-full">
                    <TextInput
                      name="apiKey"
                      label="API Key"
                      inputClassName="text-sm"
                      register={register}
                      errors={errors}
                      required
                      disabled={isSubmitting}
                    />
                    <TextInput
                      name="strictness"
                      label="Strictness"
                      type="number"
                      register={register}
                      errors={errors}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex gap-4 w-full">
                    <ToggleSwitch
                      size="lg"
                      label="Allow Public Access Points"
                      checked={watch("isActive") ?? false}
                      onChange={(val) => setValue("isActive", val)}
                      disabled={isSubmitting}
                    />
                    <ToggleSwitch
                      size="lg"
                      label="Lighter Penalties"
                      checked={watch("notifyAdmin") ?? false}
                      onChange={(val) => setValue("notifyAdmin", val)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <SectionDivider label="Verification Criteria" />

                  <div className="flex w-1/2">
                    <TextInput
                      name="fraudScore"
                      label="Fraud Score"
                      type="number"
                      register={register}
                      errors={errors}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {fraudBlockSettings.map(({ key, label }) => (
                      <ToggleSwitch
                        key={key}
                        label={label}
                        checked={watch(key) ?? false}
                        onChange={(val) => setValue(key, val)}
                        disabled={isSubmitting}
                      />
                    ))}
                  </div>
                  <TextInput
                    name="redirectURL"
                    label="Redirect URL"
                    inputClassName="text-sm"
                    register={register}
                    errors={errors}
                    required
                    disabled={isSubmitting}
                  />
                </>
              )}
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

export default FraudDetectionSetupModal;
