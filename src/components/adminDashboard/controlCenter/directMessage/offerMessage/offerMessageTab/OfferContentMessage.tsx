"use client";

import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";
import React from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  offerContent: z.string().min(1, "Offer Content is required"),
});

type FormType = z.infer<typeof schema>;

interface OffersContentProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const OfferContentMessage: React.FC<OffersContentProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };
  return (
    <FormArea
      className="space-y-5"
      formHeaderShow={false}
      schema={schema}
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
              control={control}
              name={"offerContent"}
              render={({ field }) => (
                <MacroBuilder
                  label="Offer Content"
                  className="max-w-lg mx-auto"
                  url={field.value || ""}
                  required
                  setUrl={field.onChange}
                  error={errors?.offerContent}
                  disabled={isSubmitting || isLoading}
                  showDropdownButton={false}
                  forceDropdownOpen={true}
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

export default OfferContentMessage;
