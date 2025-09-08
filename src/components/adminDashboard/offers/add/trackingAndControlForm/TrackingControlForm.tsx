"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import NumberInput from "@/components/shared/forms/NumberInput";
import DynamicInputList from "../../../../shared/forms/DynamicInputList";
import DynamicSelectInputList from "../../../../shared/forms/DynamicSelectInputList";
import SectionDivider from "@/components/shared/SectionDivider";

export const formSchema = z
  .object({
    specificTrackingDomain: z.string().min(1, "Base Revenue Type is required"),
    conversionMethod: z.string().min(1, "Conversion Method is required"),
    timezone: z.string().min(1, "Timezone is required"),
    forceSSL: z.boolean(),
    supportDeepLinks: z.boolean(),
    useDirectLinking: z.boolean(),
    enableCaps: z.boolean(),
    isEnableCaps: z.boolean(),
    isEnforceCaps: z.boolean(),
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
    isEnableDuplicateClickFilter: z.boolean(),
    termsAndConditions: z.string().optional(),
    duplicateAction: z.string().optional(),
    status: z.string().min(1, "Status is required"),
    selectQuestionnaire: z.string().optional(),
    uniqueSessionIdentifier: z
      .string()
      .min(1, "Unique Session Identifier is required"),
    sessionDuration: z.number().min(1, "Session Duration must be at least 1"),
    timeInerval: z.string().min(1, "Time Interval is required"),
    redirectMode: z.string().min(1, "Redirect Mode is required"),
    // For DynamicInputList
    customFields: z
      .array(
        z.object({
          value: z.string().min(1, "Custom field value is required"),
        })
      )
      .optional(),
    // For DynamicSelectInputList
    additionalEvents: z
      .array(
        z.object({
          baseRevenueType: z.string().min(1, "Base Revenue Type is required"),
          value: z.string().min(1, "Event name is required"),
        })
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.status === "requiredApproval") {
        return !!data.selectQuestionnaire;
      }
      return true;
    },
    {
      message: "Questionnaire is required when status is Required Approval",
      path: ["selectQuestionnaire"],
    }
  )
  .refine(
    (data) => {
      if (data.conditions) {
        return !!data.termsAndConditions;
      }
      return true;
    },
    {
      message: "Terms & Conditions are required when enabled",
      path: ["termsAndConditions"],
    }
  )
  .refine(
    (data) => {
      if (data.isEnableDuplicateClickFilter) {
        return !!data.duplicateAction;
      }
      return true;
    },
    {
      message:
        "Duplicate Action is required when Duplicate Click Filter is enabled",
      path: ["duplicateAction"],
    }
  );

export type FormData = z.infer<typeof formSchema>;

// Dropdown options
const specificTrackingDomainOptions = [
  { value: "clicksflow", label: "beta-tracking.clicksflowclient.in" },
];
const selectQuestionnaireOptions = [
  { value: "questionnaire1", label: "Questionnaire 1" },
  { value: "questionnaire2", label: "Questionnaire 2" },
  { value: "questionnaire3", label: "Questionnaire 3" },
];
const uniqueSessionIdentifierOptions = [
  { value: "session1", label: "Session 1" },
  { value: "session2", label: "Session 2" },
  { value: "session3", label: "Session 3" },
];
const timeInervalOptions = [
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
];
const redirectModeOptions = [
  { value: "mode1", label: "Mode 1" },
  { value: "mode2", label: "Mode 2" },
  { value: "mode3", label: "Mode 3" },
];
const timezoneOptions = [
  { value: "mode1", label: "Mode 1" },
  { value: "mode2", label: "Mode 2" },
  { value: "mode3", label: "Mode 3" },
];
const duplicateActionOptions = [
  { value: "action1", label: "Action 1" },
  { value: "action2", label: "Action 2" },
  { value: "action3", label: "Action 3" },
];
const conversionMethodOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

const visibilityStatus = [
  {
    value: "requiredApproval",
    label: "Required Approval",
    dotColor: "bg-blue-500",
  },
  { value: "private", label: "Private", dotColor: "bg-purple-500" },
  { value: "public", label: "Public", dotColor: "bg-green-500" },
];
const capsCategories = ["Conversion Caps", "Payout Caps", "Revenue Caps"];
const capsTypes = ["Daily", "Weekly", "Monthly", "Global"];
const TrackingControlForm = () => {
  const form = useForm<FormData>({
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
      isEnableDuplicateClickFilter: false,
      status: "",
      termsAndConditions: "",
      selectQuestionnaire: "",
      duplicateAction: "",
      uniqueSessionIdentifier: "",
      timeInerval: "",
      redirectMode: "",
      sessionDuration: 1,
      customFields: [],
      additionalEvents: [],
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = form;
  const isEnableCaps = watch("isEnableCaps");
  const isEnforceCaps = watch("isEnforceCaps");
  const status = watch("status");
  const isEnableDuplicateClickFilter = watch("isEnableDuplicateClickFilter");
  const uniqueSessionIdentifier = watch("uniqueSessionIdentifier");
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      console.log("Main Form Data:", formData);
      reset();
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-start text-xs text-gray-600">
        Fields with an asterisk (<span className="text-red-600">*</span>) are
        mandatory
      </h1>

      <SectionDivider label="Tracking" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SingleSelect
            id="specificTrackingDomain"
            label="Base Revenue Type"
            required
            options={specificTrackingDomainOptions}
            value={watch("specificTrackingDomain")}
            onChange={(val) => setValue("specificTrackingDomain", val)}
            error={errors.specificTrackingDomain}
            isDisabled={isSubmitting || isLoading}
            aria-required="true"
          />
          <SingleSelect
            id="conversionMethod"
            label="Conversion Method"
            required
            options={conversionMethodOptions}
            value={watch("conversionMethod")}
            onChange={(val) => setValue("conversionMethod", val)}
            error={errors.conversionMethod}
            isDisabled={isSubmitting || isLoading}
            aria-required="true"
          />
        </div>

        <div className="grid grid-cols-3">
          <ToggleSwitch
            label="Force SSL"
            checked={watch("forceSSL")}
            onChange={(val) => setValue("forceSSL", val)}
            disabled={isSubmitting || isLoading}
            aria-label="Toggle Force SSL"
          />
          <ToggleSwitch
            label="Allow Duplicate Conversions"
            checked={watch("supportDeepLinks")}
            onChange={(val) => setValue("supportDeepLinks", val)}
            disabled={isSubmitting || isLoading}
            aria-label="Toggle Allow Duplicate Conversions"
          />
          <ToggleSwitch
            label="Fire Postback"
            checked={watch("useDirectLinking")}
            onChange={(val) => setValue("useDirectLinking", val)}
            disabled={isSubmitting || isLoading}
            aria-label="Toggle Fire Postback"
          />
        </div>

        <div>
          <div>
            <SectionDivider label="Caps" />
            <div>
              <ToggleSwitch
                className="z-20"
                labelClassName="my-2"
                label="Enable Caps"
                checked={isEnableCaps}
                onChange={(val) => setValue("isEnableCaps", val)}
                disabled={isSubmitting || isLoading}
              />
              {isEnableCaps && (
                <div className="w-px relative h-6  bg-gray-300 py-4 ml-5" />
              )}
              {isEnableCaps && (
                <div className="flex flex-col gap-6 border border-gray-300 bg-gray-50 p-4 rounded-md">
                  <div className="flex flex-col w-full">
                    <ToggleSwitch
                      label="Enforce Caps Specific Timezone"
                      checked={isEnforceCaps}
                      onChange={(val) => setValue("isEnforceCaps", val)}
                      disabled={isSubmitting || isLoading}
                    />
                    {isEnforceCaps && (
                      <div className="w-px relative h-6  bg-gray-300 py-4 ml-5" />
                    )}
                    {isEnforceCaps && (
                      <div className="gap-4 rounded-lg bg-gray-50 border border-gray-300 py-4 px-4">
                        <SingleSelect
                          id="timezone"
                          label="Timezone"
                          required
                          options={timezoneOptions}
                          value={watch("timezone")}
                          onChange={(val) => setValue("timezone", val)}
                          error={errors.timezone}
                          isDisabled={isSubmitting || isLoading}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-8 mt-6">
                    {capsCategories.map((category) => (
                      <div key={category}>
                        <h3 className="text-md font-semibold mb-2">
                          {category}
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                          {capsTypes.map((type) => {
                            const fieldName = `${category
                              .split(" ")[0]
                              .toLowerCase()}${type}Cap` as keyof FormData;
                            return (
                              <ToggleSwitch
                                key={`${category}-${type}`}
                                label={type}
                                checked={!!watch(fieldName)}
                                onChange={(val) => setValue(fieldName, val)}
                                disabled={isSubmitting || isLoading}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <SectionDivider label="Visibility" />

          <div className="flex flex-col w-full">
            <StatusSelector
              setValue={setValue}
              errors={errors}
              isSubmitting={isSubmitting}
              isLoading={isLoading}
              options={visibilityStatus}
              fieldName="status"
              aria-required="true"
            />
            {status && (
              <div className="w-px relative h-5  bg-gray-300 -mt-2 py-4 ml-36" />
            )}
            {status === "requiredApproval" && (
              <div className="rounded-lg bg-gray-50 border border-gray-300 py-4 px-4">
                <SingleSelect
                  id="selectQuestionnaire"
                  label="Select Questionnaire"
                  required
                  options={selectQuestionnaireOptions}
                  value={watch("selectQuestionnaire") || ""}
                  onChange={(val) => setValue("selectQuestionnaire", val)}
                  error={errors.selectQuestionnaire}
                  isDisabled={isSubmitting || isLoading}
                  aria-required="true"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full gap-6 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SingleSelect
              id="uniqueSessionIdentifier"
              label="Unique Session Identifier"
              required
              options={uniqueSessionIdentifierOptions}
              value={uniqueSessionIdentifier}
              onChange={(val) => setValue("uniqueSessionIdentifier", val)}
              error={errors.uniqueSessionIdentifier}
              isDisabled={isSubmitting || isLoading}
              aria-required="true"
            />
            <NumberInput<FormData>
              name="sessionDuration"
              label="Session Duration"
              type="number"
              placeholder="Enter Duration"
              register={form.register}
              errors={errors}
              required
              valueAsNumber
              disabled={isSubmitting || isLoading}
              aria-required="true"
            />
            <SingleSelect
              id="timeInerval"
              label="Time Interval"
              required
              options={timeInervalOptions}
              value={watch("timeInerval")}
              onChange={(val) => setValue("timeInerval", val)}
              error={errors.timeInerval}
              isDisabled={isSubmitting || isLoading}
              aria-required="true"
            />
            <SingleSelect
              id="redirectMode"
              label="Redirect Mode"
              required
              options={redirectModeOptions}
              value={watch("redirectMode")}
              onChange={(val) => setValue("redirectMode", val)}
              error={errors.redirectMode}
              isDisabled={isSubmitting || isLoading}
              aria-required="true"
            />
          </div>
          <div className="flex flex-col w-full">
            <ToggleSwitch
              label="Enable Duplicate Click Filter"
              checked={isEnableDuplicateClickFilter}
              onChange={(val) => setValue("isEnableDuplicateClickFilter", val)}
              disabled={isSubmitting || isLoading}
              aria-label="Toggle Enable Duplicate Click Filter"
            />
            {isEnableDuplicateClickFilter && (
              <div className="w-px relative h-5  bg-gray-300 py-4 ml-5" />
            )}
            {isEnableDuplicateClickFilter && (
              <div className="rounded-lg bg-gray-50 border border-gray-300 py-4 px-4">
                <SingleSelect
                  id="duplicateAction"
                  label="Duplicate Click Filter Action"
                  required
                  options={duplicateActionOptions}
                  value={watch("duplicateAction") || ""}
                  onChange={(val) => setValue("duplicateAction", val)}
                  error={errors.duplicateAction}
                  isDisabled={isSubmitting || isLoading}
                  aria-required="true"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <SectionDivider label="KPI Requirements" />
          <DynamicInputList
            form={form}
            fieldName="customFields"
            label="Custom Field"
            placeholder="Enter custom field value"
            isDisabled={isSubmitting || isLoading}
          />
        </div>

        <div>
          <SectionDivider label="Additional Events" />

          <DynamicSelectInputList
            form={form}
            fieldName="additionalEvents"
            placeholder="Enter event name"
            isDisabled={isSubmitting || isLoading}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-sky-950 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting || isLoading}
            aria-label="Submit form"
          >
            {isSubmitting || isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackingControlForm;
