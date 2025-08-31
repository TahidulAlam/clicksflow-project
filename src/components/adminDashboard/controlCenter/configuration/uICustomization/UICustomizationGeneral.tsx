"use client";

import React from "react";
import { z } from "zod";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";

import Container from "@/components/shared/container/Container";

import TextAreaInput from "@/components/shared/forms/TextAreaInput";

// Form validation schema
const UICustomizationGeneralSchema = z.object({
  htmlCustomFooter: z.string().min(1, "Method is required"),
  isShowPartnerSignUpLinkEnabled: z.boolean().optional(),
  isShowAdvertiserSignUpLinkEnabled: z.boolean().optional(),
  isShowClicksFlowSupportLinkEnabled: z.boolean().optional(),
});

type FormType = z.infer<typeof UICustomizationGeneralSchema>;

interface UICustomizationGeneralProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const UICustomizationGeneral: React.FC<UICustomizationGeneralProps> = ({
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
        schema={UICustomizationGeneralSchema}
        defaultValues={{
          htmlCustomFooter: `<p style="color:#fff;">Revsbill</p>`,
          isShowPartnerSignUpLinkEnabled: false,
          isShowAdvertiserSignUpLinkEnabled: false,
          isShowClicksFlowSupportLinkEnabled: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            reset,

            formState: { isSubmitting },
          } = methods;

          return (
            <>
              <ToggleSwitch
                size="lg"
                label="Show Partner Sign Up Link (Login Page) "
                name="isShowPartnerSignUpLinkEnabled"
                disabled={isSubmitting}
              />
              <ToggleSwitch
                size="lg"
                name="isShowAdvertiserSignUpLinkEnabled"
                label="Show Advertiser Sign Up Link (Login Page) "
                disabled={isSubmitting}
              />
              <ToggleSwitch
                size="lg"
                label="Show ClicksFlow Support Link in Partner and Advertiser UIs"
                name="isShowClicksFlowSupportLinkEnabled"
                disabled={isSubmitting}
              />
              <TextAreaInput
                name="htmlCustomFooter"
                label="HTML custom Footer(Left Menu)"
                required
                defaultValue={`<p style="color:#fff;">Revsbill</p>`}
                rows={6}
                disabled={isSubmitting || isLoading}
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

export default UICustomizationGeneral;
