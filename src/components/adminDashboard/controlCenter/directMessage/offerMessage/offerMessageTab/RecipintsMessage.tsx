"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import TagsInput from "@/components/shared/forms/TagsInput";

const commonOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "active" },
  { value: "inactive", label: "inactive" },
  { value: "suspended", label: "suspended" },
  { value: "pending", label: "pending" },
  { value: "exclude", label: "exclude" },
  { value: "include", label: "include" },
];

const suggestionOptions = [{ label: "Internal", value: "internal" }];

const schema = z.object({
  selectPartner: z.string().min(1, "Account Executive is required"),
  tags: z.array(z.string()).optional(),
});

type FormType = z.infer<typeof schema>;

interface RecipintsMessageProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const RecipintsMessage: React.FC<RecipintsMessageProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };
  return (
    <FormArea
      schema={schema}
      formHeaderShow={false}
      className="space-y-5"
      defaultValues={{
        selectPartner: "",
        tags: [],
      }}
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
              name="selectPartner"
              control={control}
              render={({ field }) => (
                <>
                  <SingleSelect
                    id="selectPartner"
                    label="Select Partner"
                    className="max-w-lg mx-auto"
                    //   required
                    showSearch={false}
                    options={commonOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.selectPartner}
                    isDisabled={isSubmitting}
                  />
                  {field.value === "exclude" && (
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <TagsInput
                          label="Select Offer"
                          required
                          className="max-w-lg mx-auto"
                          labelSpan={false}
                          tags={field.value || []}
                          setTags={(newTags) => field.onChange(newTags)}
                          inputValue={inputValue}
                          setInputValue={setInputValue}
                          suggestions={suggestionOptions}
                        />
                      )}
                    />
                  )}
                  {field.value === "include" && (
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <TagsInput
                          label="Select Offer"
                          required
                          className="max-w-lg mx-auto"
                          labelSpan={false}
                          tags={field.value || []}
                          setTags={(newTags) => field.onChange(newTags)}
                          inputValue={inputValue}
                          setInputValue={setInputValue}
                          suggestions={suggestionOptions}
                        />
                      )}
                    />
                  )}
                </>
              )}
            />
            <FormActions
              isSubmitting={isSubmitting}
              isLoading={isLoading}
              onCancel={reset}
            />
          </>
        );
      }}
    </FormArea>
  );
};

export default RecipintsMessage;
