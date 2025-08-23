"use client";

import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput";

import FormActions from "@/components/shared/forms/FormActions";

// Schema
export const EmailIntegrationSchema = z.object({
  email: z
    .string()
    .min(2, "Email must be at least 2 characters")
    .max(50)
    .email("Enter a valid email address"),
});

export type EmailIntegrationData = z.infer<typeof EmailIntegrationSchema>;

interface EmailIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmailIntegrationData) => Promise<void> | void;
  defaultValues?: EmailIntegrationData;
  isSubmittingForm?: boolean;
  title?: string;
}

const EmailIntegrationModal: React.FC<EmailIntegrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isSubmittingForm = false,
  title,
}) => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<EmailIntegrationData>({
    resolver: zodResolver(EmailIntegrationSchema),
    defaultValues: defaultValues ?? {
      email: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues ?? { email: "" });
    }
  }, [isOpen, defaultValues, reset]);

  const handleFormSubmit: SubmitHandler<EmailIntegrationData> = useCallback(
    async (data) => {
      await onSubmit(data);
      reset();
      onClose();
    },
    [onSubmit, onClose, reset]
  );

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      position="top"
      title={title ?? "Test Mail Setup"}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <TextInput
          label="Sent to"
          name="email"
          required
          register={register}
          errors={errors}
          disabled={isSubmittingForm}
        />

        <FormActions
          isSubmitting={isSubmittingForm}
          isLoading={isSubmittingForm}
          onCancel={handleClose}
        />
      </form>
    </Modal>
  );
};

export default EmailIntegrationModal;
