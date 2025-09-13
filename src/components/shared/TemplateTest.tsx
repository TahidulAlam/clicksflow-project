"use client";

import React from "react";
import { z } from "zod";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import Container from "@/components/shared/container/Container";

// Form validation schema
const SchemaName = z.object({});

type FormType = z.infer<typeof SchemaName>;

interface ComponentNameProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const ComponentName: React.FC<ComponentNameProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea schema={SchemaName} defaultValues={{}} onSubmit={handleSubmit}>
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
                onCancel={() => reset()}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default ComponentName;
