/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { z } from "zod";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import Container from "@/components/shared/container/Container";
import DynamicSelectInputList from "@/components/shared/forms/DynamicSelectInputList";
import SectionDivider from "@/components/shared/SectionDivider";
import DynamicInputList from "@/components/shared/forms/DynamicInputList";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import NumberInput from "@/components/shared/forms/NumberInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import ArrowLine from "@/components/shared/ArrowLine";
import ArrowBox from "@/components/shared/ArrowBox";
import { Controller } from "react-hook-form";

// Form validation schema
const TrackingControlFormSchema = z
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

type FormType = z.infer<typeof TrackingControlFormSchema>;
export type FormData = z.infer<typeof TrackingControlFormSchema>;
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
const commonOptions = [{ value: "health", label: "Health" }];

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

interface TrackingControlFormProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const TrackingControlFormComponent: React.FC<TrackingControlFormProps> = ({
  onSubmitSuccess,
  isLoading: propIsLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={TrackingControlFormSchema}
        defaultValues={{
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
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            reset,
            watch,
            setValue,
            register,
            control,
            formState: { errors, isSubmitting, isValid },
          } = methods;

          // read watches
          const isEnableCaps = watch("isEnableCaps");
          const isEnforceCaps = watch("isEnforceCaps");
          const status = watch("status");
          const isEnableDuplicateClickFilter = watch(
            "isEnableDuplicateClickFilter"
          );

          return (
            <>
              <SectionDivider label="Tracking" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 gap-1">
                <SingleSelect
                  id="specificTrackingDomain"
                  label="Specific Tracking Domain"
                  required
                  options={specificTrackingDomainOptions}
                  value={watch("specificTrackingDomain") || ""}
                  onChange={(val) => setValue("specificTrackingDomain", val)}
                  error={errors.specificTrackingDomain}
                  isDisabled={isSubmitting || propIsLoading}
                  aria-required="true"
                />
                <SingleSelect
                  id="conversionMethod"
                  label="Conversion Method"
                  required
                  options={conversionMethodOptions}
                  value={watch("conversionMethod") || ""}
                  onChange={(val) => setValue("conversionMethod", val)}
                  error={errors.conversionMethod}
                  isDisabled={isSubmitting || propIsLoading}
                  aria-required="true"
                />
              </div>

              <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-1 lg:my-4 my-1">
                <ToggleSwitch
                  label="Force SSL"
                  checked={watch("forceSSL")}
                  onChange={(val) => setValue("forceSSL", val)}
                  disabled={isSubmitting || propIsLoading}
                  aria-label="Toggle Force SSL"
                />
                <ToggleSwitch
                  label="Allow Duplicate Conversions"
                  checked={watch("supportDeepLinks")}
                  onChange={(val) => setValue("supportDeepLinks", val)}
                  disabled={isSubmitting || propIsLoading}
                  aria-label="Toggle Allow Duplicate Conversions"
                />
                <ToggleSwitch
                  label="Fire Postback"
                  checked={watch("useDirectLinking")}
                  onChange={(val) => setValue("useDirectLinking", val)}
                  disabled={isSubmitting || propIsLoading}
                  aria-label="Toggle Fire Postback"
                />
              </div>

              <div className="mt-6">
                <SectionDivider label="Caps" />
                <div>
                  <ToggleSwitch
                    className="z-20"
                    labelClassName="my-4"
                    label="Enable Caps"
                    checked={isEnableCaps}
                    onChange={(val) => setValue("isEnableCaps", val)}
                    disabled={isSubmitting || propIsLoading}
                  />
                  {isEnableCaps && <ArrowLine direction="down" />}
                  {isEnableCaps && (
                    <ArrowBox>
                      <div className="flex flex-col w-full">
                        <ToggleSwitch
                          label="Enforce Caps Specific Timezone"
                          checked={isEnforceCaps}
                          onChange={(val) => setValue("isEnforceCaps", val)}
                          disabled={isSubmitting || propIsLoading}
                        />
                        {isEnforceCaps && <ArrowLine direction="down" />}
                        {isEnforceCaps && (
                          <ArrowBox>
                            <SingleSelect
                              id="timezone"
                              label="Timezone"
                              required
                              options={timezoneOptions}
                              value={watch("timezone") || ""}
                              onChange={(val) => setValue("timezone", val)}
                              error={errors.timezone}
                              isDisabled={isSubmitting || propIsLoading}
                            />
                          </ArrowBox>
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
                                const prefix = category
                                  .split(" ")[0]
                                  .toLowerCase();
                                const fieldName = `${prefix}${type}Cap`;

                                return (
                                  <ToggleSwitch
                                    key={`${category}-${type}`}
                                    label={type}
                                    checked={!!watch(fieldName as any)}
                                    onChange={(val) =>
                                      setValue(fieldName as any, val)
                                    }
                                    disabled={isSubmitting || propIsLoading}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ArrowBox>
                  )}
                </div>
              </div>

              <SectionDivider label="Controls" />

              <div className="flex flex-col w-full">
                <StatusSelector
                  setValue={setValue}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  isLoading={propIsLoading}
                  options={visibilityStatus}
                  fieldName="status"
                  className="text-xs mb-0"
                  aria-required="true"
                />

                {status === "requiredApproval" && (
                  <ArrowLine
                    direction="down"
                    length={20}
                    strokeWidth={1}
                    className="ml-24"
                  />
                )}

                {status === "requiredApproval" && (
                  <ArrowBox>
                    <SingleSelect
                      id="selectQuestionnaire"
                      label="Select Questionnaire"
                      required
                      options={selectQuestionnaireOptions}
                      value={watch("selectQuestionnaire") || ""}
                      onChange={(val) => setValue("selectQuestionnaire", val)}
                      error={errors.selectQuestionnaire}
                      isDisabled={isSubmitting || propIsLoading}
                      aria-required="true"
                    />
                  </ArrowBox>
                )}
              </div>
              <div>
                <Controller
                  name="timezone"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      id="timezone"
                      label="Select Questionnaire"
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
              </div>
              <div className="flex flex-col w-full gap-6 rounded-lg my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SingleSelect
                    id="uniqueSessionIdentifier"
                    label="Unique Session Identifier"
                    required
                    options={uniqueSessionIdentifierOptions}
                    value={watch("uniqueSessionIdentifier") || ""}
                    onChange={(val) => setValue("uniqueSessionIdentifier", val)}
                    error={errors.uniqueSessionIdentifier}
                    isDisabled={isSubmitting || propIsLoading}
                    aria-required="true"
                  />

                  <NumberInput
                    name="sessionDuration"
                    label="Session Duration"
                    type="number"
                    placeholder="Enter Duration"
                    register={register}
                    errors={errors}
                    required
                    disabled={isSubmitting || propIsLoading}
                    aria-required="true"
                  />

                  <SingleSelect
                    id="timeInerval"
                    label="Time Interval"
                    required
                    options={timeInervalOptions}
                    value={watch("timeInerval") || ""}
                    onChange={(val) => setValue("timeInerval", val)}
                    error={errors.timeInerval}
                    isDisabled={isSubmitting || propIsLoading}
                    aria-required="true"
                  />

                  <SingleSelect
                    id="redirectMode"
                    label="Redirect Mode"
                    required
                    options={redirectModeOptions}
                    value={watch("redirectMode") || ""}
                    onChange={(val) => setValue("redirectMode", val)}
                    error={errors.redirectMode}
                    isDisabled={isSubmitting || propIsLoading}
                    aria-required="true"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <ToggleSwitch
                    label="Enable Duplicate Click Filter"
                    checked={isEnableDuplicateClickFilter}
                    onChange={(val) =>
                      setValue("isEnableDuplicateClickFilter", val)
                    }
                    disabled={isSubmitting || propIsLoading}
                    aria-label="Toggle Enable Duplicate Click Filter"
                  />
                  {isEnableDuplicateClickFilter && (
                    <ArrowLine
                      direction="down"
                      length={20}
                      strokeWidth={1}
                      className="ml-5"
                    />
                  )}
                  {isEnableDuplicateClickFilter && (
                    <ArrowBox>
                      <SingleSelect
                        id="duplicateAction"
                        label="Duplicate Click Filter Action"
                        required
                        options={duplicateActionOptions}
                        value={watch("duplicateAction") || ""}
                        onChange={(val) => setValue("duplicateAction", val)}
                        error={errors.duplicateAction}
                        isDisabled={isSubmitting || propIsLoading}
                        aria-required="true"
                      />
                    </ArrowBox>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <SectionDivider label="KPI Requirements" />
                <DynamicInputList
                  form={methods}
                  fieldName="customFields"
                  label="Custom Field"
                  placeholder="Enter custom field value"
                  isDisabled={isSubmitting || propIsLoading}
                />
              </div>

              <div className="mt-6">
                <SectionDivider label="Additional Events" />

                <DynamicSelectInputList
                  form={methods}
                  fieldName="additionalEvents"
                  placeholder="Enter event name"
                  isDisabled={isSubmitting || propIsLoading}
                />
              </div>

              <FormActions
                isSubmitting={isSubmitting}
                isLoading={propIsLoading}
                onCancel={() => reset()}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default TrackingControlFormComponent;
