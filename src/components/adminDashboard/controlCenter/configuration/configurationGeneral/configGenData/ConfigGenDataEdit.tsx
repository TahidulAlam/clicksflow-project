/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/shared/forms/TextInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import ImageUploader from "@/components/shared/forms/ImageUploader";
import Container from "@/components/shared/container/Container";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";

const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "BDT", label: "BDT" },
];

const timezoneOptions = [
  { value: "America/Nassau", label: "America/Nassau" },
  { value: "Asia/Dhaka", label: "Asia/Dhaka" },
  { value: "UTC", label: "UTC" },
];

interface ConfigGenDataEditProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const schema = z.object({
  siteTitle: z.string().min(1),
  show: z.boolean(),
  supportEmail: z.string().email(),
  networkId: z.string().min(1),
  networkIdName: z.string().min(1),
  currency: z.string().min(1),
  currencySymbol: z.string().min(1),
  timezone: z.string().min(1),
  logo: z.union([z.instanceof(File), z.string().optional()]),
  favicon: z.union([z.instanceof(File), z.string().optional()]),
  forceSecurePassword: z.boolean(),
  agreePolicy: z.boolean(),
  userRegistration: z.boolean(),
  forceSSL: z.boolean(),
  kycVerification: z.boolean(),
  emailVerification: z.boolean(),
  emailNotification: z.boolean(),
});

type FormType = z.infer<typeof schema>;

const ConfigGenDataEdit: React.FC<ConfigGenDataEditProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      siteTitle: "",
      show: true,
      supportEmail: "",
      networkId: "",
      networkIdName: "",
      currency: "USD",
      currencySymbol: "$",
      timezone: "America/Nassau",
      logo: "/logo.png",
      favicon: "/favicon.ico",
      forceSecurePassword: false,
      agreePolicy: true,
      userRegistration: true,
      forceSSL: true,
      kycVerification: false,
      emailVerification: true,
      emailNotification: true,
    },
  });

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const logo = watch("logo");
  const favicon = watch("favicon");

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  useEffect(() => {
    if (logo instanceof File) {
      const url = URL.createObjectURL(logo);
      setLogoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof logo === "string") {
      setLogoPreview(logo);
    }
  }, [logo]);

  useEffect(() => {
    if (favicon instanceof File) {
      const url = URL.createObjectURL(favicon);
      setFaviconPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof favicon === "string") {
      setFaviconPreview(favicon);
    }
  }, [favicon]);
  const handleSubmit = async (data: FormType) => {
    console.log("Referral Settings Data:", data);
    onSubmitSuccess?.();
  };
  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={methods.getValues()}
        onSubmit={handleSubmit}
      >
        {() => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="siteTitle"
                label="Site Title"
                // register={register}
                // errors={errors}
                required
              />
              <ToggleSwitch
                label="Show"
                name="show"
                // checked={watch("show")}
                // onChange={(val) => setValue("show", val)}
                disabled={isSubmitting}
              />
            </div>

            <TextInput
              name="supportEmail"
              label="Support Email"
              // register={register}
              // errors={errors}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name="networkId"
                label="Network ID"
                // register={register}
                // errors={errors}
                required
              />
              <TextInput
                name="networkIdName"
                label="Network ID Name"
                // register={register}
                // errors={errors}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SingleSelect
                id="currency"
                label="Currency"
                required
                options={currencyOptions}
                value={watch("currency")}
                onChange={(val) => setValue("currency", val)}
                error={errors.currency}
              />
              <TextInput
                name="currencySymbol"
                label="Currency Symbol"
                // register={register}
                // errors={errors}
                required
              />
            </div>

            <SingleSelect
              id="timezone"
              label="Timezone"
              required
              options={timezoneOptions}
              value={watch("timezone")}
              onChange={(val) => setValue("timezone", val)}
              error={errors.timezone}
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <ImageUploader
                name="logo"
                label="Logo"
                // register={register}
                // setValue={setValue}
                imagePreview={logoPreview}
                // errors={errors}
              />
              <ImageUploader
                name="favicon"
                label="Favicon"
                // register={register}
                // setValue={setValue}
                imagePreview={faviconPreview}
                // errors={errors}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <ToggleSwitch
                label="Force Secure Password"
                name="forceSecurePassword"
                // checked={watch("forceSecurePassword")}
                // onChange={(val) => setValue("forceSecurePassword", val)}
                disabled={isSubmitting}
              />
              <ToggleSwitch
                label="Agree Policy"
                name="agreePolicy"
                // checked={watch("agreePolicy")}
                // onChange={(val) => setValue("agreePolicy", val)}
                disabled={isSubmitting}
              />
              <ToggleSwitch
                label="User Registration"
                name="userRegistration"
                // checked={watch("userRegistration")}
                // onChange={(val) => setValue("userRegistration", val)}
                disabled={isSubmitting}
              />
              <ToggleSwitch
                label="Force SSL"
                name="forceSSL"
                // checked={watch("forceSSL")}
                // onChange={(val) => setValue("forceSSL", val)}
                disabled={isSubmitting}
              />
              <ToggleSwitch
                label="KYC Verification"
                name="kycVerification"
                // checked={watch("kycVerification")}
                // onChange={(val) => setValue("kycVerification", val)}
                disabled={isSubmitting}
              />
              <ToggleSwitch
                label="Email Verification"
                name="emailVerification"
                // checked={watch("emailVerification")}
                // onChange={(val) => setValue("emailVerification", val)}
                disabled={isSubmitting}
              />
              <ToggleSwitch
                label="Email Notification"
                name="emailNotification"
                // checked={watch("emailNotification")}
                // onChange={(val) => setValue("emailNotification", val)}
                disabled={isSubmitting}
              />
            </div>

            <FormActions isSubmitting={isSubmitting} onCancel={() => reset()} />
          </>
        )}
      </FormArea>
    </Container>
  );
};

export default ConfigGenDataEdit;
