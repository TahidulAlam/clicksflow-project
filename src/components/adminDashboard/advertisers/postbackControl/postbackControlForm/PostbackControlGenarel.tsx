"use client";

import React, { useState } from "react";
import * as z from "zod";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import TextInput from "@/components/shared/forms/TextInput";
import FormActions from "@/components/shared/forms/FormActions";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import { Controller } from "react-hook-form";
import DatePickerWrapper from "@/components/shared/calender/DatePickerWrapper";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import TagsInput from "@/components/shared/forms/TagsInput";
import { offersSuggession } from "./offerData";
import toast from "react-hot-toast";

const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-purple-500" },
  { value: "inactive", label: "Inactive", dotColor: "bg-red-500" },
];
const selectTypeOption = [
  { value: "offer", label: "Offer" },
  { value: "advertiser", label: "Advertiser" },
];

const avertiserSuggestions = [
  { value: "C_Adv (1)", label: "C_Adv (1)" },
  { value: "P_NXT (2)", label: "P_NXT (2)" },
  { value: "RBoost (3)", label: "RBoost (3)" },
  { value: "ewe (4)", label: "ewe (4)" },
  { value: "ggg (5)", label: "ggg (5)" },
];
const partnerSuggession = [
  { value: "ewe (4)", label: "ewe (4)" },
  { value: "ggg (5)", label: "ggg (5)" },
];
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  offerIdtags: z.array(z.string()).optional(),
  advertiserIdtags: z.array(z.string()).optional(),
  partnertags: z.array(z.string()).optional(),
  status: z.string().min(1, "Status is required"),
  selectType: z.string().min(1, "Status is required"),
  applyToAllOffers: z.boolean().optional(),
  effectiveBetween: z.boolean().optional(),
  applyToAllPartners: z.boolean().optional(),
  effectiveBetweenDate: z
    .array(z.date().nullable())
    .length(2, "Effective date range must have exactly two dates")
    .refine(
      ([start, end]) => start && end && start <= end,
      "Start date must be before or equal to end date"
    ),
});

type FormType = z.infer<typeof schema>;

interface PostbackControlGenarelProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const PostbackControlGenarel: React.FC<PostbackControlGenarelProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [inputOfferValue, setInputOfferValue] = useState("");
  const [inputAdvertiserValue, setInputAdvertiserValue] = useState("");
  const [inputPartnerValue, setInputPartnerValue] = useState("");

  const handleSubmit = async (data: FormType) => {
    // console.log("Submitted Data:", data);
    if (data) {
      toast.success("Postback Control General Data Submitted Successfully");
    } else {
      toast.error("Failed to submit Postback Control General Data");
    }
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          name: "",
          offerIdtags: [],
          advertiserIdtags: [],
          partnertags: [],
          selectType: selectTypeOption[0].value,
          status: visibilityStatus[0].value,
          applyToAllOffers: true,
          effectiveBetween: false,
          applyToAllPartners: false,
          effectiveBetweenDate: [null, null] as [Date | null, Date | null],
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            reset,
            watch,
            setValue,
            control,
            formState: { errors, isSubmitting },
          } = methods;
          const dateRange = watch("effectiveBetweenDate") as [
            Date | null,
            Date | null
          ];
          return (
            <>
              <FlexRow cols={{ base: 1, lg: 1 }}>
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
              </FlexRow>

              <Controller
                name="effectiveBetween"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <ToggleSwitch
                          label="Effective Between"
                          size="lg"
                          checked={field.value ?? false}
                          onChange={field.onChange}
                          disabled={isSubmitting || isLoading}
                        />
                      </div>
                      <div className="col-span-2">
                        {field.value && (
                          <>
                            <DatePickerWrapper
                              label="Effective Between Date"
                              mode="range"
                              monthsShown={2}
                              value={dateRange}
                              onChange={(range) =>
                                setValue(
                                  "effectiveBetweenDate",
                                  range as [Date | null, Date | null]
                                )
                              }
                              showApplyCancel={true}
                              minDate={new Date(2025, 0, 1)}
                              maxDate={new Date(2030, 11, 31)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              />
              <Controller
                name="applyToAllOffers"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleSwitch
                      label="Apply to all Offers/Advertisers"
                      size="lg"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      disabled={isSubmitting || isLoading}
                    />
                    {!field.value && (
                      <>
                        <Controller
                          control={control}
                          name="selectType"
                          render={({ field }) => (
                            <>
                              <FlexRow cols={{ base: 2, lg: 2 }}>
                                <SingleSelect
                                  id="selectType"
                                  label="Select Type"
                                  required
                                  showSearch={false}
                                  placeholder="Select time"
                                  options={selectTypeOption}
                                  value={field.value}
                                  onChange={field.onChange}
                                  error={errors.selectType}
                                  isDisabled={isSubmitting || isLoading}
                                  aria-required="true"
                                />

                                {field.value === "offer" ? (
                                  <TagsInput
                                    label="Offer ID"
                                    suggestions={offersSuggession}
                                    tags={watch("offerIdtags") || []}
                                    setTags={(newTags) =>
                                      setValue("offerIdtags", newTags)
                                    }
                                    inputValue={inputOfferValue}
                                    setInputValue={setInputOfferValue}
                                  />
                                ) : (
                                  <TagsInput
                                    label="Advertiser ID"
                                    suggestions={avertiserSuggestions}
                                    tags={watch("advertiserIdtags") || []}
                                    setTags={(newTags) =>
                                      setValue("advertiserIdtags", newTags)
                                    }
                                    inputValue={inputAdvertiserValue}
                                    setInputValue={setInputAdvertiserValue}
                                  />
                                )}
                              </FlexRow>
                            </>
                          )}
                        />
                      </>
                    )}
                  </>
                )}
              />
              <Controller
                name="applyToAllPartners"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <ToggleSwitch
                          label="Apply to all Partners"
                          size="lg"
                          checked={field.value ?? false}
                          onChange={field.onChange}
                          disabled={isSubmitting || isLoading}
                        />
                      </div>
                      <div className="col-span-2">
                        {!field.value && (
                          <>
                            <TagsInput
                              label="Partners"
                              suggestions={partnerSuggession}
                              tags={watch("partnertags") || []}
                              setTags={(newTags) =>
                                setValue("partnertags", newTags)
                              }
                              inputValue={inputPartnerValue}
                              setInputValue={setInputPartnerValue}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
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

export default PostbackControlGenarel;
