"use client";

import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
  Control,
  Controller,
} from "react-hook-form";
import TextInput from "@/components/shared/forms/TextInput";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";
import AttachmentInput from "@/components/shared/forms/AttachmentInput";

interface CreativeEmailProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  html?: boolean;
  disabled?: boolean;
  isSubmitting?: boolean;
  isLoading?: boolean;
}

const CreativeEmail = <T extends FieldValues>({
  register,
  errors,
  control,
  html = false,
  disabled = false,
  isSubmitting = false,
  isLoading = false,
}: CreativeEmailProps<T>) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <TextInput
            name={html ? ("htmlForm" as Path<T>) : ("emailFrom" as Path<T>)}
            label={html ? "Height" : "From"}
            register={register}
            errors={errors}
            required
            disabled={disabled}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            name={html ? ("width" as Path<T>) : ("emailSubject" as Path<T>)}
            label={html ? "Width" : "Subject"}
            register={register}
            errors={errors}
            required
            disabled={disabled}
          />
        </div>
      </div>

      <Controller
        control={control}
        name={"codeEmail" as Path<T>}
        render={({ field }) => (
          <MacroBuilder
            label="Base Destination URL"
            url={field.value || ""}
            setUrl={field.onChange}
            // error={errors?.codeEmail}
            disabled={isSubmitting || isLoading}
            showDropdownButton={false}
            forceDropdownOpen={true}
          />
        )}
      />
      <h1 className="text-xs font-semibold text-gray-800">
        Additional Attachments{" "}
      </h1>
      <AttachmentInput
        name={"attachment" as Path<T>}
        label="Upload File"
        register={register}
        errors={errors}
        required
        // imagePreview
        accept="image/*,.pdf,.docx"
      />
    </div>
  );
};

export default CreativeEmail;
