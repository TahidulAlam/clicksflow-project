/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { z } from "zod";
import { Controller, FieldError } from "react-hook-form";

import Container from "@/components/shared/container/Container";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import TextInput from "@/components/shared/forms/TextInput";

// === Constants ===
const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "inactive", label: "Inactive", dotColor: "bg-red-500" },
];

const commonOptions = [
  { value: "archive", label: "Archive" },
  { value: "email", label: "Email" },
  { value: "html", label: "Html" },
  { value: "image", label: "Image" },
  { value: "link", label: "Link" },
  { value: "text", label: "Text" },
  { value: "thumbnail", label: "Thumbnail" },
  { value: "video", label: "Video" },
];

const subConfigs = [
  { key: "sub1", label: "Sub1" },
  { key: "sub2", label: "Sub2" },
  { key: "sub3", label: "Sub3" },
  { key: "sub4", label: "Sub4" },
  { key: "sub5", label: "Sub5" },
  { key: "sourceID", label: "Source ID" },
];

// === Zod Schema ===
const schema = z.object({
  partner: z.string().min(1, "Partner is required"),
  offer: z.string().min(1, "Offer is required"),
  status: z.string().min(1, "Status is required"),

  ...Object.fromEntries(
    subConfigs.flatMap(({ key }) => [
      [key, z.boolean().optional()],
      [`${key}MatchType`, z.string().optional()],
      [`${key}ActionValues`, z.string().optional()],
    ])
  ),
});

type FormType = z.infer<typeof schema>;

interface TrafficBlockingAddProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const TrafficBlockingAdd: React.FC<TrafficBlockingAddProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  const defaultValues: Partial<FormType> = {
    partner: "",
    offer: "",
    status: "",
    ...Object.fromEntries(
      subConfigs.flatMap(({ key }) => [
        [key, false],
        [`${key}MatchType`, ""],
        [`${key}ActionValues`, ""],
      ])
    ),
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            control,
            watch,
            setValue,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <FlexRow cols={{ base: 1, lg: 1 }}>
                {/* Partner */}
                <Controller
                  name="partner"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      id="partner"
                      label="Partner"
                      required
                      options={commonOptions}
                      value={field.value}
                      onChange={field.onChange}
                      //   error={errors.partner}
                      isDisabled={isSubmitting}
                    />
                  )}
                />

                {/* Status */}
                <StatusSelector
                  label="Status"
                  fieldName="status"
                  setValue={setValue}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  isLoading={isLoading}
                  options={visibilityStatus}
                />

                {/* Offer */}
                <Controller
                  name="offer"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      id="offer"
                      label="Offer"
                      required
                      options={commonOptions}
                      value={field.value}
                      onChange={field.onChange}
                      //   error={errors.offer}
                      isDisabled={isSubmitting}
                    />
                  )}
                />

                {/* Dynamic Sub Inputs */}
                {subConfigs.map(({ key, label }) => {
                  //   const isEnabled = watch(key);
                  return (
                    <Controller
                      key={key}
                      name={key}
                      control={control}
                      render={({ field }) => (
                        <FlexRow cols={{ base: 3, sm: 1 }}>
                          <ToggleSwitch
                            size="lg"
                            label={label}
                            checked={field.value ?? false}
                            onChange={field.onChange}
                            disabled={isSubmitting}
                          />

                          {field.value && (
                            <>
                              <Controller
                                name={`${key}MatchType`}
                                control={control}
                                render={({ field }) => (
                                  <SingleSelect
                                    id={`${key}MatchType`}
                                    label="Match Type"
                                    required
                                    options={commonOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={
                                      (errors[
                                        `${key}MatchType`
                                      ] as FieldError) ?? undefined
                                    }
                                    isDisabled={isSubmitting}
                                  />
                                )}
                              />

                              <TextInput
                                name={`${key}ActionValues`}
                                label="Action Values"
                                register={register}
                                errors={errors}
                                required
                                disabled={isSubmitting}
                              />
                            </>
                          )}
                        </FlexRow>
                      )}
                    />
                  );
                })}
              </FlexRow>

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

export default TrafficBlockingAdd;
