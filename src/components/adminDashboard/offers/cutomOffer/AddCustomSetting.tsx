"use client";

import React from "react";
import { z } from "zod";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";

import Container from "@/components/shared/container/Container";

// Form validation schema
const AddCustomSettingSchema = z.object({});

type FormType = z.infer<typeof AddCustomSettingSchema>;

interface AddCustomSettingProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const AddCustomSetting: React.FC<AddCustomSettingProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Referral Settings Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={AddCustomSettingSchema}
        defaultValues={{}}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            reset,
            formState: { isSubmitting },
          } = methods;

          return (
            <>
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => {
                  reset();
                }}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default AddCustomSetting;
