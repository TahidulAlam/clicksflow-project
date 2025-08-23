/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { z } from "zod";

import FormArea from "@/components/shared/forms/FormArea";

import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FormActions from "@/components/shared/forms/FormActions";
import Container from "@/components/shared/container/Container";

// Zod schema for form validation
const FraudDetectionSetupSchema = z.object({
  hideTotalClick: z.boolean().optional(),
  showAccountManagerDetails: z.boolean().optional(),
});

type FormType = z.infer<typeof FraudDetectionSetupSchema>;

interface PartnerPortGenEditProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const PartnerPortGenEdit: React.FC<PartnerPortGenEditProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Fraud Setup Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={FraudDetectionSetupSchema}
        defaultValues={{
          hideTotalClick: false,
          showAccountManagerDetails: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            setValue,
            watch,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          const isHideTotalClickEnabled = watch("hideTotalClick") ?? false;
          const isShowAccountManagerDetails = watch("hideTotalClick") ?? false;

          return (
            <>
              <ToggleSwitch
                size="lg"
                label="Hide Total Click"
                checked={isHideTotalClickEnabled}
                onChange={(val) => setValue("hideTotalClick", val)}
                disabled={isSubmitting}
              />
              <ToggleSwitch
                size="lg"
                label="Show Account Manager Details"
                checked={isShowAccountManagerDetails}
                onChange={(val) => setValue("showAccountManagerDetails", val)}
                disabled={isSubmitting}
              />

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

export default PartnerPortGenEdit;
