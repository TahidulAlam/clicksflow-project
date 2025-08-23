"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput";
import FormActions from "@/components/shared/forms/FormActions";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import { IoCloseSharp } from "react-icons/io5";
import TagsInput, { OptionType } from "@/components/shared/forms/TagsInput";

// Options
const formTypeOptions = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Text Area" },
  { value: "select", label: "Select" },
  { value: "cheackbox", label: "Check Box" },
  { value: "radio", label: "Radio" },
  { value: "file", label: "File" },
];
const isRequiredOptions = [
  { value: "required", label: "Required" },
  { value: "optional", label: "Optional" },
];

const tagSuggest: OptionType[] = [
  { label: "jpg", value: "JPG" },
  { label: "jpeg", value: "JPEG" },
  { label: "png", value: "PNG" },
  { label: "doc", value: "DOC" },
  { label: "docx", value: "DOCX" },
  { label: "pdf", value: "PDF" },
];
// Schema
export const formSchema = z.object({
  formLabel: z.string().min(2, "Label must be at least 2 characters").max(50),
  formType: z.string(),
  isRequired: z.string(),
  tags: z.array(z.string()).optional(),

  addOptions: z
    .array(z.object({ value: z.string().min(1, "Option cannot be empty") }))
    .optional(),
});

export type GenerateFormData = z.infer<typeof formSchema>;

interface GenerateFormModalProps {
  isOpen: boolean;
  isSubmittingForm?: boolean;
  onClose: () => void;
  onSubmit: (data: GenerateFormData) => Promise<void> | void;
  defaultValues?: GenerateFormData;
  title?: string;
}

const GenerateFormModal: React.FC<GenerateFormModalProps> = React.memo(
  ({
    isOpen,
    isSubmittingForm = false,
    onClose,
    onSubmit,
    defaultValues,
    title,
  }) => {
    const {
      register,
      handleSubmit,
      control,
      reset,
      setValue,
      watch,
      formState: { errors },
    } = useForm<GenerateFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues ?? {
        formLabel: "",
        formType: "",
        isRequired: "",
        addOptions: [],
      },
    });
    const [inputValue, setInputValue] = useState("");

    const { fields, append, remove } = useFieldArray({
      control,
      name: "addOptions",
    });

    const formType = watch("formType");

    useEffect(() => {
      if (isOpen) {
        reset(
          defaultValues ?? {
            formLabel: "",
            formType: "",
            isRequired: "",
            tags: [],
            addOptions: [],
          }
        );
      }
    }, [isOpen, defaultValues, reset]);

    const handleFormSubmit: SubmitHandler<GenerateFormData> = useCallback(
      async (data) => {
        await onSubmit(data);
        reset();
        onClose();
      },
      [onSubmit, reset, onClose]
    );

    const handleCloseModal = useCallback(() => {
      reset();
      onClose();
    }, [reset, onClose]);

    const modalTitle =
      title ?? (defaultValues ? "Edit Field" : "Add New Field");

    return (
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        size="md"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <p className="text-sm text-gray-600">
            Fields with an asterisk (*) are mandatory
          </p>

          {/* Form Type */}
          <Controller
            name="formType"
            control={control}
            render={({ field }) => (
              <SingleSelect
                id="formType"
                label="Form Type"
                required
                placeholder="Select One"
                showSearch={false}
                options={formTypeOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.formType}
                isDisabled={isSubmittingForm}
              />
            )}
          />

          {["select", "cheackbox", "radio"].includes(formType) && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Add Options <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => append({ value: "" })}
                  className="text-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-500 px-3 py-1.5 rounded"
                  disabled={isSubmittingForm}
                >
                  +
                </button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center">
                  <input
                    {...register(`addOptions.${index}.value` as const)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 border border-gray-300 border-r-0 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:shadow-md"
                    disabled={isSubmittingForm}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-sm px-3 py-[11px] rounded-r-md bg-red-500 border-red-500 border text-white hover:underline"
                    disabled={isSubmittingForm}
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              ))}
            </div>
          )}
          {formType === "file" && (
            <>
              <TagsInput
                suggestions={[...tagSuggest]}
                tags={watch("tags") || []}
                setTags={(newTags) => setValue("tags", newTags)}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </>
          )}
          {/* Is Required */}
          <SingleSelect
            id="isRequired"
            label="Is Required"
            required
            placeholder="Select One"
            showSearch={false}
            options={isRequiredOptions}
            value={watch("isRequired")}
            onChange={(val) => setValue("isRequired", val)}
            error={errors.isRequired}
            isDisabled={isSubmittingForm}
          />

          {/* Form Label */}
          <TextInput
            name="formLabel"
            label="Form Label"
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

GenerateFormModal.displayName = "GenerateFormModal";

export default GenerateFormModal;
