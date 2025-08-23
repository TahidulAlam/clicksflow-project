"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput";
import TagsInput, { OptionType } from "@/components/shared/forms/TagsInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormActions from "@/components/shared/forms/FormActions";

// Schema
export const adjustmentSchema = z.object({
  label: z.string().min(2, "Label must be at least 2 characters").max(50),
  type: z.string().min(1, "Type is required"),
  tags: z.array(z.string()).optional(),
});

export type AdjustmentFormData = z.infer<typeof adjustmentSchema>;

// Options
const typeOptions = [
  { value: "payout", label: "Payout" },
  { value: "revenue", label: "Revenue" },
  { value: "click", label: "Click" },
];

const tagSuggest: OptionType[] = [
  { label: "jpg", value: "JPG" },
  { label: "pdf", value: "PDF" },
  { label: "csv", value: "CSV" },
  { label: "xlsx", value: "XLSX" },
];

interface AdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdjustmentFormData) => Promise<void> | void;
  defaultValues?: AdjustmentFormData;
  isSubmittingForm?: boolean;
  title?: string;
}

const AdjustmentModal: React.FC<AdjustmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isSubmittingForm = false,
  title,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AdjustmentFormData>({
    resolver: zodResolver(adjustmentSchema),
    defaultValues: defaultValues ?? {
      label: "",
      type: "",
      tags: [],
    },
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues ?? { label: "", type: "", tags: [] });
    }
  }, [isOpen, defaultValues, reset]);

  const handleFormSubmit: SubmitHandler<AdjustmentFormData> = useCallback(
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
      title={title ?? "Add Adjustment"}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <TextInput
          label="Label"
          name="label"
          required
          register={register}
          errors={errors}
          disabled={isSubmittingForm}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="type"
              label="Type"
              required
              options={typeOptions}
              placeholder="Select one"
              value={field.value}
              onChange={field.onChange}
              error={errors.type}
              isDisabled={isSubmittingForm}
            />
          )}
        />

        <TagsInput
          label="Tags"
          suggestions={tagSuggest}
          tags={watch("tags") || []}
          setTags={(tags) => setValue("tags", tags)}
          inputValue={inputValue}
          setInputValue={setInputValue}
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

export default AdjustmentModal;
