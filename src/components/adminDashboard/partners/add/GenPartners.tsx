"use client";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

import Container from "@/components/shared/container/Container";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import TagsInput from "@/components/shared/forms/TagsInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";

const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "inactive", label: "Inactive", dotColor: "bg-yellow-500" },
  { value: "suspend", label: "Suspend", dotColor: "bg-orange-500" },
  { value: "pending", label: "Pending", dotColor: "bg-red-500" },
];

const verifyStatus = [
  { value: "verified", label: "Verified", dotColor: "bg-green-500" },
  { value: "unverified", label: "Unverified", dotColor: "bg-red-500" },
];

const commonOptions = [
  { value: "admin", label: "Admin" },
  { value: "partner", label: "Partner" },
];

const suggestionOptions = [{ label: "Internal", value: "internal" }];

// Validation schema using zod
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  internalNotes: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50),
  status: z.string().min(1, "Status is required"),
  kycstatus: z.string().min(1, "KYC Status is required"),
  accountManager: z.string().min(1, "Account Manager is required"),
  accountExecutive: z.string().min(1, "Account Executive is required"),
  referredBy: z.string().min(1, "Referred By is required"),
  partnerTier: z.string().min(1, "Partner Tier is required"),
  defaultCurrency: z.string().min(1, "Partner Tier is required"),
  trafficSource: z.string().min(1, "Partner Tier is required"),
  tags: z.array(z.string()).optional(),
  allowPartnerNotifications: z.boolean().optional(),
  enableCPC: z.boolean().optional(),
});

type FormType = z.infer<typeof schema>;

interface PartnersGeneralProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const GenPartners: React.FC<PartnersGeneralProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          name: "",
          internalNotes: "",
          status: "active",
          kycstatus: "verified",
          accountManager: "",
          accountExecutive: "",
          referredBy: "",
          partnerTier: "",
          defaultCurrency: "",
          trafficSource: "",
          tags: [],
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            setValue,
            reset,
            control,
            watch,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <TextInput
                name="name"
                label="Name"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting}
              />

              <StatusSelector
                label="Visibility Status"
                fieldName="status"
                setValue={setValue}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                options={visibilityStatus}
              />

              <div className="flex gap-5 w-full">
                <div className="w-1/2">
                  <Controller
                    name="accountManager"
                    control={control}
                    render={({ field }) => (
                      <SingleSelect
                        id="accountManager"
                        label="Account Manager"
                        required
                        showSearch
                        options={commonOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.accountManager}
                        isDisabled={isSubmitting}
                      />
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Controller
                    name="accountExecutive"
                    control={control}
                    render={({ field }) => (
                      <SingleSelect
                        id="accountExecutive"
                        label="Account Executive"
                        required
                        showSearch
                        options={commonOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.accountExecutive}
                        isDisabled={isSubmitting}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-5 w-full">
                <div className="w-1/2">
                  <Controller
                    name="referredBy"
                    control={control}
                    render={({ field }) => (
                      <SingleSelect
                        id="referredBy"
                        label="Referred By"
                        // required
                        showSearch
                        options={commonOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.referredBy}
                        isDisabled={isSubmitting}
                      />
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Controller
                    name="partnerTier"
                    control={control}
                    render={({ field }) => (
                      <SingleSelect
                        id="partnerTier"
                        label="Partner Tier"
                        // required
                        showSearch
                        options={commonOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.partnerTier}
                        isDisabled={isSubmitting}
                      />
                    )}
                  />
                </div>
              </div>

              <StatusSelector<FormType>
                label="KYC Status"
                fieldName="kycstatus"
                setValue={setValue}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                // required
                options={verifyStatus}
              />

              {/* Tags Input with Controller */}
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    label="Label"
                    labelSpan={true}
                    tags={field.value || []}
                    setTags={(newTags) => field.onChange(newTags)}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    suggestions={suggestionOptions}
                  />
                )}
              />
              <div className="flex gap-5 w-full">
                <div className="w-1/2">
                  <Controller
                    name="defaultCurrency"
                    control={control}
                    render={({ field }) => (
                      <SingleSelect
                        id="defaultCurrency"
                        label="Default Currency"
                        required
                        showSearch
                        options={commonOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.defaultCurrency}
                        isDisabled={isSubmitting}
                      />
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Controller
                    name="trafficSource"
                    control={control}
                    render={({ field }) => (
                      <SingleSelect
                        id="trafficSource"
                        label="Traffic Source"
                        // required
                        showSearch
                        options={commonOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.trafficSource}
                        isDisabled={isSubmitting}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="w-1/2">
                  <ToggleSwitch
                    size="lg"
                    label="Allow partner to receive notifications"
                    checked={watch("allowPartnerNotifications") ?? false}
                    onChange={(val) =>
                      setValue("allowPartnerNotifications", val)
                    }
                    disabled={isSubmitting}
                  />
                </div>
                <div className="w-1/2">
                  <ToggleSwitch
                    size="lg"
                    label="Enable CPC/CPM Dynamic Payouts for Partner"
                    checked={watch("enableCPC") ?? false}
                    onChange={(val) => setValue("enableCPC", val)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <TextAreaInput
                name="internalNotes"
                label="Internal Notes"
                rows={4}
                register={register}
                errors={errors}
                // required
                disabled={isSubmitting}
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
    </Container>
  );
};

export default GenPartners;
