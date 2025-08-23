"use client";

import React, { useEffect, useState } from "react";
import {
  SubmitHandler,
  useForm,
  Controller,
  // useFormState,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import toast from "react-hot-toast";
import TagsInput from "@/components/shared/forms/TagsInput";

// Zod Schema
export const formSchema = z
  .object({
    formLabel: z.string().min(2, "Name must be at least 2 characters").max(50),
    formType: z
      .string()
      .min(2, "Form Type is required")
      .max(50)
      .refine(
        (val) => val !== "pleaseSelect",
        "Please select a valid form type"
      ),
    isRequired: z
      .string()
      .min(2, "Is Required field is required")
      .max(50)
      .refine((val) => val !== "pleaseSelect", "Please select a valid option"),
    tags: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (
        data.formType === "checkbox" &&
        (!data.tags || data.tags.length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Tags are required when form type is checkbox",
      path: ["tags"],
    }
  );

export type PartnerKycSettingsModalData = z.infer<typeof formSchema>;

interface SelectOption {
  value: string;
  label: string;
}

interface PartnerKycSettingsModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmitSuccess: (data: PartnerKycSettingsModalData) => void;
  defaultData?: PartnerKycSettingsModalData;
}

const formTypeOptions: SelectOption[] = [
  { value: "pleaseSelect", label: "Please Select" },
  { value: "text", label: "Text" },
  { value: "textArea", label: "Text Area" },
  { value: "select", label: "Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio" },
  { value: "file", label: "File" },
];

const isRequiredOptions: SelectOption[] = [
  { value: "pleaseSelect", label: "Please Select" },
  { value: "required", label: "Required" },
  { value: "optional", label: "Optional" },
];

const PartnerKycSettingsModal: React.FC<PartnerKycSettingsModalProps> = ({
  isOpen,
  isLoading = false,
  onClose,
  onSubmitSuccess,
  defaultData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PartnerKycSettingsModalData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formLabel: "",
      formType: "pleaseSelect",
      isRequired: "pleaseSelect",
      tags: [],
    },
  });

  // const { dirtyFields } = useFormState({ control });
  const [inputValue, setInputValue] = useState("");

  const selectedFormType = watch("formType");

  useEffect(() => {
    if (isOpen && defaultData) {
      reset(defaultData);
    }
  }, [isOpen, defaultData, reset]);

  const onSubmit: SubmitHandler<PartnerKycSettingsModalData> = async (data) => {
    try {
      await onSubmitSuccess(data);
      reset();
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(
          `Validation failed: ${error.errors.map((e) => e.message).join(", ")}`
        );
      } else {
        toast.error("Failed to save KYC field. Please try again.");
      }
      console.error("Error during form submission:", error);
    }
  };

  const handleClose = () => {
    // if (
    //   Object.keys(dirtyFields).length > 0 &&
    //   !window.confirm(
    //     "You have unsaved changes. Are you sure you want to close?"
    //   )
    // ) {
    //   return;
    // }
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={defaultData ? "Edit KYC Field" : "Add New KYC Field"}
      position="top"
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-gray-600">All fields are required.</p>

        <Controller
          name="formType"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="formType"
              label="Form Type"
              required
              showSearch={false}
              options={formTypeOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.formType}
              isDisabled={isSubmitting || isLoading}
              aria-describedby="formType-error"
            />
          )}
        />

        <Controller
          name="isRequired"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="isRequired"
              label="Is Required"
              required
              showSearch={false}
              options={isRequiredOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.isRequired}
              isDisabled={isSubmitting || isLoading}
              aria-describedby="isRequired-error"
            />
          )}
        />

        <TextInput
          name="formLabel"
          label="Form Label"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
          aria-describedby="formLabel-error"
        />

        {selectedFormType === "checkbox" && (
          <TagsInput
            tags={watch("tags") || []}
            setTags={(newTags) => setValue("tags", newTags)}
            inputValue={inputValue}
            setInputValue={setInputValue}
            labelSpan
          />
        )}

        <div className="flex justify-end pt-6 gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            disabled={isSubmitting || isLoading}
            aria-label="Cancel form"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="px-6 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-900 transition"
            aria-label={defaultData ? "Update KYC field" : "Submit KYC field"}
          >
            {isSubmitting
              ? "Submitting..."
              : isLoading
              ? "Loading..."
              : defaultData
              ? "Update"
              : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PartnerKycSettingsModal;
