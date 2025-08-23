/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Controller } from "react-hook-form";

import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import FormActions from "@/components/shared/forms/FormActions";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import TagsInput from "@/components/shared/forms/TagsInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import { generateRandomPassword } from "@/function/GenarateRandomPass";
import SectionDivider from "@/components/shared/SectionDivider";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";

const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "paused", label: "Paused", dotColor: "bg-purple-500" },
  { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
];
const visibilitykycStatus = [
  { value: "verified", label: "Verified", dotColor: "bg-green-500" },
  { value: "unverified", label: "Unverified", dotColor: "bg-red-500" },
];
const advertiserOptions = [
  { value: "profitNXT", label: "Profit NXT" },
  { value: "clicksAdv", label: "Clicks Adv" },
];
const attributeMethodOptions = [
  { value: "firstPartner", label: "First Partner Attribution" },
  { value: "secondPartner", label: "Second Partner Attribution" },
];
const emailAttributionMethodOption = [
  { value: "firstTouch", label: "First Touch" },
  { value: "lastTouch", label: "Last Touch" },
];
const currencyOptions = [
  { value: "USD", label: "United States Dollar ($)" },
  { value: "AED", label: "United Arab Emirates Dirham (AED)" },
  { value: "AFN", label: "Afghan Afghani (AFN)" },
  { value: "ALL", label: "Albanian Lek (ALL)" },
  { value: "AMD", label: "Armenian Dram (AMD)" },
  { value: "ANG", label: "Netherlands Antillean Guilder (ANG)" },
  { value: "AOA", label: "Angolan Kwanza (AOA)" },
];

const capsKeys = [
  "partnerIDCap",
  "partnerCap",
  "sub1Cap",
  "sub2Cap",
  "sub4Cap",
  "sub5Cap",
  "sourceIDCap",
] as const;

type CapKey = (typeof capsKeys)[number];

const capsTypes: { label: string; key: CapKey }[] = [
  { label: "Partner ID", key: "partnerIDCap" },
  { label: "Partner", key: "partnerCap" },
  { label: "Sub 1", key: "sub1Cap" },
  { label: "Sub 2", key: "sub2Cap" },
  { label: "Sub 4", key: "sub4Cap" },
  { label: "Sub 5", key: "sub5Cap" },
  { label: "Source ID", key: "sourceIDCap" },
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.string().min(1, "Status is required"),
  kycStatus: z.string().min(1, "KYC Status is required"),
  currency: z.string().min(1, "Currency is required"),
  attributeMethod: z.string().min(1, "Attribution Method is required"),
  emailAttributionMethod: z
    .string()
    .min(1, "Email Attribution Method is required"),
  accountManager: z.string().min(1, "Account Manager is required"),
  salesManager: z.string().min(1, "Sales Manager is required"),
  internalNotes: z.string().min(1, "Sales Manager is required"),
  verificationToken: z.string().min(1, "Verification Token is required"),
  enforceVerificationToken: z.boolean().optional(),
  forceSSL: z.boolean().optional(),
  showtoPartners: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  partnerIDCap: z.boolean().optional(),
  partnerCap: z.boolean().optional(),
  sub1Cap: z.boolean().optional(),
  sub2Cap: z.boolean().optional(),
  sub4Cap: z.boolean().optional(),
  sub5Cap: z.boolean().optional(),
  sourceIDCap: z.boolean().optional(),
});

type FormType = z.infer<typeof schema>;

interface AdvertiserGeneralProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const AdvertiserGeneral: React.FC<AdvertiserGeneralProps> = ({
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
          status: "",
          kycStatus: "",
          currency: "",
          attributeMethod: "",
          verificationToken: "",
          emailAttributionMethod: "",
          internalNotes: "",
          accountManager: advertiserOptions[0].value,
          salesManager: advertiserOptions[0].value,
          enforceVerificationToken: false,
          forceSSL: false,
          showtoPartners: false,
          tags: [],
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            watch,
            setValue,
            reset,
            control,
            formState: { errors, isSubmitting },
          } = methods;

          const regeneratePassword = () => {
            const newPassword = generateRandomPassword(25);
            setValue("verificationToken", newPassword);
          };

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
                label="Status"
                fieldName="status"
                options={visibilityStatus}
                selectedStatus={watch("status")}
                setValue={setValue}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
              />

              <TextInput
                name="accountManager"
                label="Tracking Domain"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting}
              />

              <FlexRow cols={{ base: 2, md: 2, lg: 2 }}>
                <SingleSelect
                  id="accountManager"
                  label="Account Manager"
                  required
                  showSearch={false}
                  options={advertiserOptions}
                  value={watch("accountManager")}
                  onChange={(val) => setValue("accountManager", val)}
                  error={errors.accountManager}
                  isDisabled={isSubmitting}
                />
                <SingleSelect
                  id="salesManager"
                  label="Sales Manager"
                  required
                  showSearch={false}
                  options={advertiserOptions}
                  value={watch("salesManager")}
                  onChange={(val) => setValue("salesManager", val)}
                  error={errors.salesManager}
                  isDisabled={isSubmitting}
                />
              </FlexRow>

              <TagsInput
                tags={watch("tags") || []}
                setTags={(newTags) => setValue("tags", newTags)}
                inputValue={inputValue}
                labelSpan={true}
                setInputValue={setInputValue}
              />

              <StatusSelector
                label="KYC Status"
                fieldName="kycStatus"
                options={visibilitykycStatus}
                selectedStatus={watch("kycStatus")}
                setValue={setValue}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
              />

              <SingleSelect
                id="currency"
                label="Default Currency"
                required
                options={currencyOptions}
                value={watch("currency")}
                onChange={(val) => setValue("currency", val)}
                error={errors.currency}
              />

              <FlexRow cols={{ base: 2, md: 2, lg: 2 }}>
                <SingleSelect
                  id="emailAttributionMethod"
                  label="Email Attribution Method"
                  required
                  options={emailAttributionMethodOption}
                  value={watch("emailAttributionMethod")}
                  onChange={(val) => setValue("emailAttributionMethod", val)}
                  error={errors.emailAttributionMethod}
                />
                <SingleSelect
                  id="attributeMethod"
                  label="Attribute Method"
                  required
                  options={attributeMethodOptions}
                  value={watch("attributeMethod")}
                  onChange={(val) => setValue("attributeMethod", val)}
                  error={errors.attributeMethod}
                />
              </FlexRow>

              <Controller
                control={control}
                name="enforceVerificationToken"
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <ToggleSwitch
                        label="Enforce Verification Token"
                        checked={field.value ?? false}
                        onChange={field.onChange}
                        disabled={isSubmitting || isLoading}
                      />
                    </div>
                    <div className="col-span-2">
                      {field.value && (
                        <TextInput
                          name="verificationToken"
                          label="Verification Token"
                          register={register}
                          errors={errors}
                          required
                          inputRightIcon={
                            <button
                              type="button"
                              className="bg-gray-100 rounded-r px-3 border border-gray-300 py-[6px]"
                              onClick={regeneratePassword}
                              title="Regenerate Password"
                            >
                              Generate
                            </button>
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
              />

              <SectionDivider label="Variables exposed in the Advertiser UI" />

              <div className="grid grid-cols-3 gap-4">
                {capsTypes.map(({ label, key }) => (
                  <Controller
                    key={key}
                    name={key}
                    control={control}
                    render={({ field }) => (
                      <ToggleSwitch
                        label={label}
                        size="lg"
                        checked={!!field.value}
                        onChange={field.onChange}
                        disabled={isSubmitting || isLoading}
                      />
                    )}
                  />
                ))}
              </div>
              <TextAreaInput
                name="internalNotes"
                label="Internal Notes"
                register={register}
                errors={errors}
                rows={3}
                disabled={isSubmitting}
              />
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

export default AdvertiserGeneral;
