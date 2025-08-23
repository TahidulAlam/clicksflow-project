import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput"; // Assumed component
import FormActions from "@/components/shared/forms/FormActions"; // Assumed component

// Define the Zod schema for form validation
export const formSchema = z.object({
  formLabel: z
    .string()
    .min(1, "Form Label is required")
    .max(100, "Form Label cannot exceed 100 characters"),
  value: z
    .string()
    .min(1, "Form Label is required")
    .max(100, "Form Label cannot exceed 100 characters"),
});

export type TrackingLinkParametersData = z.infer<typeof formSchema>;

interface TrackingLinkParametersProps {
  isOpen: boolean;
  isSubmittingForm?: boolean;
  onClose: () => void;
  onSubmit: (data: TrackingLinkParametersData) => Promise<void> | void;
  defaultValues?: Partial<TrackingLinkParametersData>;
  title?: string;
}

const TrackingLinkParametersModal: React.FC<TrackingLinkParametersProps> =
  React.memo(
    ({
      isOpen,
      isSubmittingForm = false,
      onClose,
      onSubmit,
      defaultValues,
      title = "Tracking Link Parameters",
    }) => {
      const {
        register,
        handleSubmit,
        //   control,
        reset,
        formState: { errors },
      } = useForm<TrackingLinkParametersData>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues ?? { formLabel: "", value: "" },
      });

      // Reset form when modal opens or defaultValues change
      useEffect(() => {
        if (isOpen) {
          reset(defaultValues ?? { formLabel: "", value: "" });
        }
      }, [isOpen, defaultValues, reset]);

      // Handle form submission
      const handleFormSubmit: SubmitHandler<TrackingLinkParametersData> =
        useCallback(
          async (data) => {
            await onSubmit(data);
            reset();
            onClose();
          },
          [onSubmit, reset, onClose]
        );

      // Handle modal close
      const handleCloseModal = useCallback(() => {
        reset();
        onClose();
      }, [reset, onClose]);

      return (
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title={title}
          size="md"
        >
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <p className="text-sm text-gray-600">
              Fields with an asterisk (*) are mandatory
            </p>

            {/* Form Label Input */}
            <TextInput
              name="formLabel"
              label="Form Label"
              register={register}
              errors={errors}
              required
              disabled={isSubmittingForm}
            />
            <TextInput
              name="value"
              label="Value"
              register={register}
              errors={errors}
              required
              disabled={isSubmittingForm}
            />

            {/* Form Actions */}
            <FormActions
              isSubmitting={isSubmittingForm}
              isLoading={isSubmittingForm}
              onCancel={handleCloseModal}
            />
          </form>
        </Modal>
      );
    }
  );

// Add displayName to resolve ESLint react/display-name warning
TrackingLinkParametersModal.displayName = "TrackingLinkParametersModal";

export default TrackingLinkParametersModal;
