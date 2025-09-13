"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";

import FormActions from "@/components/shared/forms/FormActions";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import Container from "@/components/shared/container/Container";

export const formSchema = z.object({
  specificTrackingDomain: z.string().min(1, "Base Revenue Type is required"),
  conversionMethod: z.string().min(1, "Conversion Method is required"),
  timezone: z.string().min(1, "Timezone is required"),
  forceSSL: z.boolean(),
  supportDeepLinks: z.boolean(),
  useDirectLinking: z.boolean(),
  enableCaps: z.boolean(),
  isEnableCaps: z.boolean(),
  isEnforceCaps: z.boolean(),
  clickcapsDailyCap: z.boolean(),
  clickcapsWeeklyCap: z.boolean(),
  clickcapsMonthlyCap: z.boolean(),
  clickcapsGlobalCap: z.boolean(),
  conversionDailyCap: z.boolean(),
  conversionWeeklyCap: z.boolean(),
  conversionMonthlyCap: z.boolean(),
  conversionGlobalCap: z.boolean(),
  payoutDailyCap: z.boolean(),
  payoutWeeklyCap: z.boolean(),
  payoutMonthlyCap: z.boolean(),
  payoutGlobalCap: z.boolean(),
  revenueDailyCap: z.boolean(),
  revenueWeeklyCap: z.boolean(),
  revenueMonthlyCap: z.boolean(),
  revenueGlobalCap: z.boolean(),
  conditions: z.boolean(),
  forceConditions: z.boolean(),
});

export type FormData = z.infer<typeof formSchema>;

const capsCategories = ["Click Caps", "conversion", "payout", "revenue"];
const capsTypes = ["Daily", "Weekly", "Monthly", "Global"];

const CapControl = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specificTrackingDomain: "",
      conversionMethod: "",
      timezone: "",
      forceSSL: false,
      supportDeepLinks: false,
      useDirectLinking: false,
      enableCaps: false,
      isEnableCaps: false,
      isEnforceCaps: false,
      clickcapsDailyCap: false,
      clickcapsWeeklyCap: false,
      clickcapsMonthlyCap: false,
      clickcapsGlobalCap: false,
      conversionDailyCap: false,
      conversionWeeklyCap: false,
      conversionMonthlyCap: false,
      conversionGlobalCap: false,
      payoutDailyCap: false,
      payoutWeeklyCap: false,
      payoutMonthlyCap: false,
      payoutGlobalCap: false,
      revenueDailyCap: false,
      revenueWeeklyCap: false,
      revenueMonthlyCap: false,
      revenueGlobalCap: false,
      conditions: false,
      forceConditions: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      console.log("Form submitted with data:", formData);
      toast.success("Form submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Form submission failed.");
    }
  };

  const isEnableCaps = watch("isEnableCaps");

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Enable Caps */}
        <span className="text-xs my-4">
          Fields with an asterisk (<span className="text-red-700">*</span>) are
          required
        </span>
        <FlexRow cols={{ base: 1, lg: 1 }} gap="0px">
          <Controller
            name="isEnableCaps"
            control={control}
            render={({ field }) => (
              <ToggleSwitch
                size="lg"
                label="Enable Caps"
                checked={Boolean(field.value)}
                onChange={field.onChange}
                disabled={isSubmitting || isLoading}
              />
            )}
          />
          {isEnableCaps && (
            <div className="w-px relative h-8 bg-gray-300 py-4 ml-5" />
          )}
          {isEnableCaps && (
            <div className="flex flex-col gap-6 border border-gray-300 rounded-lg bg-gray-50 p-4">
              {/* Caps Matrix */}
              <div className="flex flex-col gap-8 mt-2">
                {capsCategories.map((category) => (
                  <div key={category}>
                    <h3 className="text-md font-semibold mb-2">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {capsTypes.map((type) => {
                        const fieldName =
                          `${category}${type}Cap` as keyof FormData;
                        return (
                          <Controller
                            key={fieldName}
                            name={fieldName}
                            control={control}
                            render={({ field }) => (
                              <ToggleSwitch
                                label={type}
                                size="lg"
                                checked={Boolean(field.value)}
                                onChange={field.onChange}
                                disabled={isSubmitting || isLoading}
                              />
                            )}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </FlexRow>

        <FormActions
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          onCancel={() => reset()}
        />
      </form>
    </Container>
  );
};

export default CapControl;
