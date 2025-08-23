"use client";

import React from "react";
import { z } from "zod";

import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import Container from "@/components/shared/container/Container";
import TextInput from "@/components/shared/forms/TextInput";

// Validation schema
const UICustomizationColorSchema = z.object({
  primaryColor: z.string().min(1, "Primary color is required"),
  secondaryColor: z.string().min(1, "Secondary color is required"),
});

type FormType = z.infer<typeof UICustomizationColorSchema>;

interface UICustomizationColorProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const UICustomizationColor: React.FC<UICustomizationColorProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={UICustomizationColorSchema}
        defaultValues={{
          primaryColor: "#00ccff",
          secondaryColor: "#ff6600",
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

          const primaryColor = watch("primaryColor");
          const secondaryColor = watch("secondaryColor");

          return (
            <>
              <div className="flex gap-5">
                <div>
                  <TextInput
                    name="primaryColor"
                    label="Primary Color"
                    value={primaryColor}
                    onChange={(value) => setValue("primaryColor", value)}
                    showColorPicker
                    onColorChange={(color) => setValue("primaryColor", color)}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
                <div>
                  <TextInput
                    name="secondaryColor"
                    label="Secondary Color"
                    value={secondaryColor}
                    onChange={(value) => setValue("primaryColor", value)}
                    showColorPicker
                    onColorChange={(color) => setValue("secondaryColor", color)}
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
              </div>

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

export default UICustomizationColor;
