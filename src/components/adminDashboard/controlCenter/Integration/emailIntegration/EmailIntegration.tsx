"use client";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import EmailIntegrationModal, {
  EmailIntegrationData,
} from "./EmailIntegrationModal";
import { MdOutlineSend } from "react-icons/md";

// Zod schema for form validation
const schema = z.object({
  emailSendMethod: z.string().min(1, "Email send method is required"),
});

type FormType = z.infer<typeof schema>;

const emailSendOptions = [
  { value: "phpMail", label: "PHP Mail" },
  { value: "smtp", label: "SMTP" },
  { value: "sendGridApi", label: "SendGrid Api" },
  { value: "mailJetApi", label: "Mailjet Api" },
];

interface EmailIntegrationProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const EmailIntegration: React.FC<EmailIntegrationProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<EmailIntegrationData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isEventSubmitting, setIsEventSubmitting] = useState(false);

  // Handle modal submit (add/edit event)
  const handleAddOrEditEvent = async (eventData: EmailIntegrationData) => {
    try {
      setIsEventSubmitting(true);
      if (editingIndex !== null) {
        setEvents((prev) =>
          prev.map((e, i) => (i === editingIndex ? eventData : e))
        );
        toast.success("Event updated successfully!");
      } else {
        setEvents((prev) => [...prev, eventData]);
        toast.success("Event added successfully!");
      }
    } catch (error) {
      console.error("Validation failed:", error);
      toast.error("Invalid event data.");
    } finally {
      setIsEventSubmitting(false);
      setIsModalOpen(false);
      setEditingIndex(null);
    }
  };

  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container mainClassName="border-none">
      <FormArea
        schema={schema}
        defaultValues={{ emailSendMethod: emailSendOptions[0].value }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            reset,
            control,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <Controller
                name="emailSendMethod"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    id="emailSendMethod"
                    label="Email Send Method"
                    required
                    showSearch={false}
                    options={emailSendOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.emailSendMethod}
                    isDisabled={isSubmitting}
                  />
                )}
              />
              <div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-50 text-blue-950 rounded-lg transition flex item-center text-sm gap-1 border border-gray-300"
                >
                  <MdOutlineSend /> Send Test Mail
                </button>
              </div>

              {/* Email Integration Modal */}
              <EmailIntegrationModal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setEditingIndex(null);
                }}
                title="Send Test Mail"
                onSubmit={handleAddOrEditEvent}
                defaultValues={
                  editingIndex !== null ? events[editingIndex] : undefined
                }
                isSubmittingForm={isEventSubmitting}
              />

              {/* Form Actions */}
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={reset}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default EmailIntegration;
