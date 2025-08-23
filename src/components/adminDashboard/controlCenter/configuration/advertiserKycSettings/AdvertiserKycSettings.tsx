"use client";

import React, { useState, useCallback } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdvertiserKycSettingsModal, {
  AdvertiserKycSettingsModalData,
  formSchema as eventFormSchema,
} from "./AdvertiserKycSettingsModal";
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import Container from "@/components/shared/container/Container";
import toast from "react-hot-toast";

// Schema for the main form
const schema = z.object({
  events: z.array(eventFormSchema),
});

type FormType = z.infer<typeof schema>;

interface AdvertiserKycSettingsProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const AdvertiserKycSettings: React.FC<AdvertiserKycSettingsProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { events: [] },
  });

  const {
    control,
    reset,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "events",
  });

  // Handle adding or editing a field
  const handleAddOrEditEvent = useCallback(
    (event: AdvertiserKycSettingsModalData) => {
      try {
        const validated = eventFormSchema.parse(event);
        if (editingIndex !== null) {
          update(editingIndex, validated);
          toast.success("Field updated successfully!");
        } else {
          append(validated);
          toast.success("Field added successfully!");
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errorMessage = err.errors.map((e) => e.message).join(", ");
          toast.error(`Invalid field data: ${errorMessage}`);
        } else {
          toast.error("An unexpected error occurred.");
        }
        console.error(err);
      } finally {
        setEditingIndex(null);
        setIsModalOpen(false);
      }
    },
    [editingIndex, append, update]
  );

  // Handle form submission
  const onSubmit = async (data: FormType) => {
    try {
      console.log("Submitted KYC Settings:", data);
      toast.success("KYC settings submitted successfully!");
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      toast.error("Failed to submit KYC settings.");
      console.error(error);
    }
  };

  // Handle form cancellation with confirmation
  const handleCancel = () => {
    if (
      Object.keys(dirtyFields).length > 0 &&
      !window.confirm(
        "Are you sure you want to reset the form? All changes will be lost."
      )
    ) {
      return;
    }
    reset();
  };

  return (
    <Container maxWidth="full">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-base font-semibold">KYC Form for Advertiser</h1>
        <PrimaryBtn
          variant="primary"
          onClick={() => {
            setEditingIndex(null);
            setIsModalOpen(true);
          }}
          disabled={isLoading || isSubmitting}
          aria-label="Add new KYC field"
        >
          + Add New
        </PrimaryBtn>
      </div>
      <FormArea
        schema={schema}
        onSubmit={onSubmit}
        methods={methods}
        formHeaderShow={true}
      >
        {() => (
          <>
            <div className="space-y-4">
              {fields.length > 0
                ? fields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="flex flex-col border border-gray-300 rounded-md p-4 bg-white shadow-sm space-y-4"
                    >
                      <div>
                        <label className="text-xs font-bold text-gray-800">
                          Label
                        </label>
                        <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 h-[38px] flex items-center">
                          <span className="text-sm font-medium text-gray-800">
                            {field.formLabel}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-800">
                          Type
                        </label>
                        <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 h-[38px] flex items-center">
                          <span className="text-sm font-medium text-gray-800">
                            {field.formType}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingIndex(idx);
                            setIsModalOpen(true);
                          }}
                          className="p-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-md"
                          title="Edit field"
                          aria-label="Edit KYC field"
                          disabled={isLoading || isSubmitting}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(idx)}
                          className="p-3 text-white bg-red-600 hover:bg-red-700 transition-colors rounded-md"
                          title="Delete field"
                          aria-label="Delete KYC field"
                          disabled={isLoading || isSubmitting}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
            <FormActions
              isSubmitting={isSubmitting}
              isLoading={isLoading}
              onCancel={handleCancel}
            />
            <AdvertiserKycSettingsModal
              isOpen={isModalOpen}
              onClose={() => {
                setEditingIndex(null);
                setIsModalOpen(false);
              }}
              onSubmitSuccess={handleAddOrEditEvent}
              defaultData={
                editingIndex !== null ? fields[editingIndex] : undefined
              }
              isLoading={isLoading}
            />
          </>
        )}
      </FormArea>
    </Container>
  );
};

export default AdvertiserKycSettings;
