import React from "react";
import { z } from "zod";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import { Modal } from "@/components/shared/modal/Modal";

// Form validation schema
const ReferralSettingsSchema = z.object({
  hideTotalClick: z.boolean().optional(),
});

type FormType = z.infer<typeof ReferralSettingsSchema>;

interface AdvertiserPortalSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const AdvertiserPortalSettingModal: React.FC<
  AdvertiserPortalSettingModalProps
> = ({ isOpen, onClose, onSubmitSuccess, isLoading = false }) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Advertiser Portal Setting:", data);
    onSubmitSuccess?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="top"
      size="lg"
      title="Advertiser Portal Setting"
    >
      <FormArea
        schema={ReferralSettingsSchema}
        defaultValues={{
          hideTotalClick: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            setValue,
            watch,
            reset,
            formState: { isSubmitting },
          } = methods;

          const isHideTotalClickEnabled = watch("hideTotalClick") ?? false;

          return (
            <>
              <ToggleSwitch
                size="lg"
                label="Hide Total Click"
                checked={isHideTotalClickEnabled}
                onChange={(val) => setValue("hideTotalClick", val)}
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

export default AdvertiserPortalSettingModal;
