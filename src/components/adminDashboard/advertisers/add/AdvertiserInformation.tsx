"use client";

import React from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormActions from "@/components/shared/forms/FormActions";
import TextInput from "@/components/shared/forms/TextInput";
import SectionDivider from "@/components/shared/SectionDivider";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";

// Example options for timezone dropdown
const commonOptions = [
  { label: "UTC", value: "UTC" },
  { label: "GMT", value: "GMT" },
  { label: "Asia/Dhaka", value: "Asia/Dhaka" },
];

const schema = z.object({
  platformName: z.string().min(2, "Name must be at least 2 characters").max(50),
  platformUsername: z.string().min(2).max(50),
  platformURL: z.string().url("Invalid URL"),
  timezone: z.string().min(1, "Timezone is required"),
  accountingContactEmailAddress: z.string().email("Invalid email address"),
  offerIDParameter: z.string().min(1, "Required"),
  partnerIDParameter: z.string().min(1, "Required"),
});

type FormType = z.infer<typeof schema>;

interface AdvertiserInformationProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const AdvertiserInformation: React.FC<AdvertiserInformationProps> = ({
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
        schema={schema}
        defaultValues={{
          platformName: "",
          platformUsername: "",
          platformURL: "",
          timezone: "",
          accountingContactEmailAddress: "",
          offerIDParameter: "",
          partnerIDParameter: "",
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            control,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <FlexRow cols={{ base: 2, lg: 2 }}>
                <TextInput
                  name="platformName"
                  label="Platform Name"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
                <TextInput
                  name="platformUsername"
                  label="Platform Username"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
              </FlexRow>
              <TextInput
                name="platformURL"
                label="Platform URL"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting}
              />
              <FlexRow cols={{ base: 2, lg: 2 }}>
                <Controller
                  name="timezone"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      id="timezone"
                      label="Timezone"
                      required
                      showSearch
                      options={commonOptions}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.timezone}
                      isDisabled={isSubmitting}
                    />
                  )}
                />
                <TextInput
                  name="accountingContactEmailAddress"
                  label="Accounting Contact Email Address"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
              </FlexRow>

              <SectionDivider label="Direct Linking" />
              <FlexRow cols={{ base: 2, lg: 2 }}>
                <TextInput
                  name="offerIDParameter"
                  label="Offer ID Parameter"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
                <TextInput
                  name="partnerIDParameter"
                  label="Partner ID Parameter"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
              </FlexRow>
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={reset}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default AdvertiserInformation;
