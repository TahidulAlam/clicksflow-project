"use client";

import React, { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import FormArea from "@/components/shared/forms/FormArea";
import Container from "@/components/shared/container/Container";
import TextInput from "@/components/shared/forms/TextInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FormActions from "@/components/shared/forms/FormActions";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import GenerateFormModal, {
  GenerateFormData,
  formSchema as eventFormSchema,
} from "./GenerateFormModal";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.boolean().optional(),
});

type FormType = z.infer<typeof schema>;

interface ApplicationAddProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const ApplicationAdd: React.FC<ApplicationAddProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<GenerateFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrEditEvent = (event: GenerateFormData) => {
    try {
      const validatedEvent = eventFormSchema.parse(event);
      if (editingIndex !== null) {
        setEvents((prev) =>
          prev.map((e, idx) => (idx === editingIndex ? validatedEvent : e))
        );
        toast.success("Event updated successfully!");
      } else {
        setEvents((prev) => [...prev, validatedEvent]);
        toast.success("Event added successfully!");
      }
    } catch (error) {
      console.error("Event validation failed:", error);
      toast.error("Invalid event data.");
    } finally {
      setIsEventModalOpen(false);
      setEditingIndex(null);
    }
  };

  const handleEditEvent = (index: number) => {
    if (index >= 0 && index < events.length) {
      setEditingIndex(index);
      setIsEventModalOpen(true);
    }
  };

  const handleDeleteEvent = (index: number) => {
    if (index >= 0 && index < events.length) {
      setEvents((prev) => prev.filter((_, i) => i !== index));
      toast.success("Event deleted.");
    }
  };

  const handleSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      console.log("Main Form Data:", data);
      console.log("Associated Events:", events);
      toast.success("Form submitted successfully!");
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Submission failed. Try again.");
    }
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{ name: "", status: false }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            watch,
            setValue,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <FlexRow cols={{ base: 1, lg: 1 }}>
                <TextInput
                  name="name"
                  label="Name"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />

                <ToggleSwitch
                  label="Status"
                  checked={watch("status") ?? false}
                  onChange={(val) => setValue("status", val)}
                  disabled={isSubmitting}
                />

                <div>
                  <PrimaryBtn
                    variant="primary"
                    className="p-2"
                    onClick={() => setIsEventModalOpen(true)}
                    disabled={isSubmitting}
                  >
                    + Add Event
                  </PrimaryBtn>
                </div>

                {events.length > 0 && (
                  <div className="space-y-2 grid grid-cols-6 h-40 gap-2">
                    {events.map((event, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col justify-between items-center border p-2 rounded"
                      >
                        <div>{event.formLabel}</div>
                        <div className="flex gap-4 text-sm">
                          <button
                            type="button"
                            className="text-blue-600 hover:underline"
                            onClick={() => handleEditEvent(idx)}
                            disabled={isSubmitting}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:underline"
                            onClick={() => handleDeleteEvent(idx)}
                            disabled={isSubmitting}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <FormActions
                  isSubmitting={isSubmitting}
                  isLoading={isLoading}
                  onCancel={() => {
                    reset();
                    setEvents([]);
                    setEditingIndex(null);
                  }}
                />
              </FlexRow>
            </>
          );
        }}
      </FormArea>

      <GenerateFormModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setEditingIndex(null);
        }}
        title="Generate Form"
        onSubmit={handleAddOrEditEvent}
        defaultValues={editingIndex !== null ? events[editingIndex] : undefined}
        isSubmittingForm={isLoading}
      />
    </Container>
  );
};

export default ApplicationAdd;
