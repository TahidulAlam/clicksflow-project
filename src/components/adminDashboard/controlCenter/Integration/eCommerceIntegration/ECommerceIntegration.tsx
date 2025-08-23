"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import * as z from "zod";

import ECommerceDescriptionModal from "./ECommerceDescriptionModal";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormActions from "@/components/shared/forms/FormActions";

const schema = z.object({
  trackingDomain: z.string().min(1, "Please select an email send method"),
  advertiser: z.string().min(1, "Please select an email send method"),
});

type FormType = z.infer<typeof schema>;

const emailSendOptions = [{ label: "SMTP", value: "smtp" }];
const advertiserOptions = [
  { label: "SMTP", value: "smtp" },
  { label: "SendGrid", value: "sendgrid" },
  { label: "Mailgun", value: "mailgun" },
  { label: "Amazon SES", value: "ses" },
];

interface ECommerceIntegrationProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const ECommerceIntegration: React.FC<ECommerceIntegrationProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isWooCommerce, setIsWooCommerce] = useState(true);

  const handleSubmit = async (data: FormType) => {
    console.log("Submitted data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container mainClassName="border-none">
      <FormArea
        formHeaderShow={false}
        schema={schema}
        defaultValues={{
          trackingDomain: emailSendOptions[0].value,
          advertiser: advertiserOptions[0].value,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            reset,
            control,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              {isWooCommerce ? (
                <div className="bg-blue-50 text-blue-950 p-4 rounded-lg border border-gray-300 mt-5 w-96 h-[150px] flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-sm">WooCommerce</h1>
                    <Image
                      src="/woocommerce-large.png"
                      alt="WooCommerce"
                      width={120}
                      height={32}
                      className="w-[125px] h-8 object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-white text-black border border-gray-300 rounded-lg text-xs"
                      onClick={() => setIsDescriptionModalOpen(true)}
                    >
                      Description
                    </button>
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-white text-black border border-gray-300 rounded-lg text-xs"
                      onClick={() => setIsWooCommerce(false)}
                    >
                      Setup
                    </button>
                  </div>

                  <ECommerceDescriptionModal
                    isOpen={isDescriptionModalOpen}
                    onClose={() => setIsDescriptionModalOpen(false)}
                    title="WooCommerce Integration"
                  />
                </div>
              ) : (
                <div className="mt-5 w-[600px] h-auto mx-auto flex flex-col gap-4 p-4 rounded-lg">
                  <Image
                    src="/woocommerce-large.png"
                    alt="WooCommerce"
                    width={100}
                    height={20}
                    className="w-[125px] h-8 object-cover"
                  />
                  <p className="text-sm text-gray-700">
                    Generate a WordPress plugin for WooCommerce conversion
                    tracking. Configure your advertiser and tracking URL to
                    download a ready-to-use plugin.
                  </p>

                  <Controller
                    name="trackingDomain"
                    control={control}
                    render={({ field }) => (
                      <SingleSelect
                        id="trackingDomain"
                        label="Tracking Domain"
                        required
                        showSearch={false}
                        options={emailSendOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.trackingDomain}
                        isDisabled={isSubmitting}
                      />
                    )}
                  />
                  <Controller
                    name="advertiser"
                    control={control}
                    render={({ field }) => (
                      <SingleSelect
                        id="advertiser"
                        label="Advertiser"
                        required
                        showSearch={false}
                        options={advertiserOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.advertiser}
                        isDisabled={isSubmitting}
                      />
                    )}
                  />

                  <FormActions
                    isSubmitting={isSubmitting}
                    isLoading={isLoading}
                    onCancel={reset}
                  />
                </div>
              )}
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default ECommerceIntegration;
