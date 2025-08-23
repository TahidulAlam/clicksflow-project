"use client";

import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import TagsInput from "@/components/shared/forms/TagsInput";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

const suggestionOptions = [{ label: "Internal", value: "internal" }];

const schema = z.object({
  tags: z.array(z.string()).optional(),
});

type FormType = z.infer<typeof schema>;

interface OffersProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const Offers: React.FC<OffersProps> = ({
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
      className="space-y-5"
      formHeaderShow={false}
      schema={schema}
      defaultValues={{
        tags: [],
      }}
      onSubmit={handleSubmit}
    >
      {(methods) => {
        const {
          reset,
          control,
          formState: { isSubmitting },
        } = methods;

        return (
          <>
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

export default Offers;
