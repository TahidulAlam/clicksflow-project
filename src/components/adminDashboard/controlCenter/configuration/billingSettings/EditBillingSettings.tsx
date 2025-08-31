"use client";

import React from "react";
import { z } from "zod";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";

import Container from "@/components/shared/container/Container";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";

// Form validation schema
const EditBillingSettingsSchema = z.object({
  isDisplayLogoinPartnerInvoiceEnabled: z.boolean().optional(),
  isDisplayLogoInAdvertiserInvoiceEnabled: z.boolean().optional(),
  isDisplayPartnersPaymentInfoEnabled: z.boolean().optional(),
  isDisplayAdvertiserPaymentInfoEnabled: z.boolean().optional(),
  isDisplayPartnerTextIDonPartnerInvoiceEnabled: z.boolean().optional(),
  isDisplayAdvertiserTextIDonAdvertiserInvoiceEnabled: z.boolean().optional(),
});

type FormType = z.infer<typeof EditBillingSettingsSchema>;

interface EditBillingSettingsProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const EditBillingSettings: React.FC<EditBillingSettingsProps> = ({
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
        schema={EditBillingSettingsSchema}
        defaultValues={{
          isDisplayLogoinPartnerInvoiceEnabled: true,
          isDisplayLogoInAdvertiserInvoiceEnabled: true,
          isDisplayPartnersPaymentInfoEnabled: true,
          isDisplayAdvertiserPaymentInfoEnabled: true,
          isDisplayPartnerTextIDonPartnerInvoiceEnabled: true,
          isDisplayAdvertiserTextIDonAdvertiserInvoiceEnabled: true,
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
                label="Display Logo in Partner Invoice"
                name="isDisplayLogoinPartnerInvoiceEnabled"
                disabled={isSubmitting}
              />
              <ToggleSwitch
                size="lg"
                label="Display Logo In Advertiser Invoice"
                name="isDisplayLogoInAdvertiserInvoiceEnabled"
                disabled={isSubmitting}
              />
              <ToggleSwitch
                size="lg"
                label="Display Partners Payment Info"
                name="isDisplayPartnersPaymentInfoEnabled"
                disabled={isSubmitting}
              />
              <ToggleSwitch
                size="lg"
                label="Display Advertiser Payment Info"
                name="isDisplayAdvertiserPaymentInfoEnabled"
                disabled={isSubmitting}
              />
              <ToggleSwitch
                size="lg"
                label="Display Advertiser Payment Info"
                name="isDisplayPartnerTextIDonPartnerInvoiceEnabled"
                disabled={isSubmitting}
              />
              <ToggleSwitch
                size="lg"
                label="Display Advertiser Payment Info"
                name="isDisplayAdvertiserTextIDonAdvertiserInvoiceEnabled"
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

export default EditBillingSettings;
