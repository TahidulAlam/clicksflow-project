"use client";

import React from "react";
import { z } from "zod";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import Container from "@/components/shared/container/Container";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import TextInput from "@/components/shared/forms/TextInput";

// Zod schema
const PartnerSignUpSettingEditSchema = z.object({
  customSignUpHeader: z.string().min(1, "Header is required"),
  customSignUpConfirmation: z.string().min(1, "Confirmation is required"),
  externalSignUpURL: z.string().min(1, "External URL is required"),
  showAutoApprovePartners: z.boolean().optional(),
  showAdvertiserSignUpLink: z.boolean().optional(),
  showCustomizeHeader: z.boolean().optional(),
  showCustomizeConfirmation: z.boolean().optional(),
});

type FormType = z.infer<typeof PartnerSignUpSettingEditSchema>;

interface PartnerSignUpSettingEditProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const PartnerSignUpSettingEdit: React.FC<PartnerSignUpSettingEditProps> = ({
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
        schema={PartnerSignUpSettingEditSchema}
        defaultValues={{
          customSignUpHeader: "",
          customSignUpConfirmation: "",
          externalSignUpURL: "",
          showAutoApprovePartners: false,
          showAdvertiserSignUpLink: false,
          showCustomizeHeader: false,
          showCustomizeConfirmation: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            setValue,
            watch,
            reset,
            register,
            formState: { errors, isSubmitting },
          } = methods;

          const isShowAutoApprovePartnersEnabled =
            watch("showAutoApprovePartners") ?? false;
          const isShowUseExternalSignUpURL =
            watch("showAdvertiserSignUpLink") ?? false;
          const isShowCustomizeHeaderEnabled =
            watch("showCustomizeHeader") ?? false;
          const isShowCustomizeConfirmationEnabled =
            watch("showCustomizeConfirmation") ?? false;

          return (
            <>
              <ToggleSwitch
                size="lg"
                label="Auto Approve Partners"
                checked={isShowAutoApprovePartnersEnabled}
                onChange={(val) => setValue("showAutoApprovePartners", val)}
                disabled={isSubmitting}
              />

              <ToggleSwitch
                size="lg"
                label="Use External Sign Up URL"
                checked={isShowUseExternalSignUpURL}
                onChange={(val) => setValue("showAdvertiserSignUpLink", val)}
                disabled={isSubmitting}
              />

              {isShowUseExternalSignUpURL && (
                <TextInput
                  name="externalSignUpURL"
                  label="External Sign Up URL"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting || isLoading}
                />
              )}

              <ToggleSwitch
                size="lg"
                label="Customize Header"
                checked={isShowCustomizeHeaderEnabled}
                onChange={(val) => setValue("showCustomizeHeader", val)}
                disabled={isSubmitting}
              />
              {isShowCustomizeHeaderEnabled && (
                <TextAreaInput
                  name="customSignUpHeader"
                  label="Custom Sign Up Header"
                  register={register}
                  errors={errors}
                  required
                  defaultValue="<p style='color:#fff;'>Revsbill</p>"
                  rows={6}
                  disabled={isSubmitting || isLoading}
                />
              )}
              <ToggleSwitch
                size="lg"
                label="Customize Confirmation"
                checked={isShowCustomizeConfirmationEnabled}
                onChange={(val) => setValue("showCustomizeConfirmation", val)}
                disabled={isSubmitting}
              />

              {isShowCustomizeConfirmationEnabled && (
                <TextAreaInput
                  name="customSignUpConfirmation"
                  label="Custom Sign Up Confirmation"
                  register={register}
                  errors={errors}
                  required
                  defaultValue="<p style='color:#fff;'>Revsbill</p>"
                  rows={6}
                  disabled={isSubmitting || isLoading}
                />
              )}

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

export default PartnerSignUpSettingEdit;
