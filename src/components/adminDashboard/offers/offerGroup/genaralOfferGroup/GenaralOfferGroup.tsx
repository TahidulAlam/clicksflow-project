"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Container from "@/components/shared/container/Container";
import TextInput from "@/components/shared/forms/TextInput";
import FormActions from "@/components/shared/forms/FormActions";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import TagsInput from "@/components/shared/forms/TagsInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";

const currencyOptions = [
  { value: "USD", label: "United States Dollar ($)" },
  { value: "AED", label: "United Arab Emirates Dirham (AED)" },
  { value: "AFN", label: "Afghan Afghani (Af)" },
  { value: "ALL", label: "Albanian Lek (ALL)" },
  { value: "AMD", label: "Armenian Dram (AMD)" },
  { value: "ANG", label: "Netherlands Antillean Guilder (ANG)" },
  { value: "AOA", label: "Angolan Kwanza (AOA)" },
];

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.string().min(1, "Status is required"),
  advertiser: z.string().min(1, "Status is required"),
  currency: z.string().min(1, "Currency is required"),
  internalnotes: z.string().min(1, "Currency is required"),
  tags: z.array(z.string()).optional(),
});
export type FormData = z.infer<typeof formSchema>;
const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "paused", label: "Paused", dotColor: "bg-purple-500" },
  { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
];
const advertiserOptions = [
  { value: "profitNXT", label: "Profit NXT" },
  { value: "clicksAdv", label: "Clicks Adv" },
];
interface GenarelOfferGroup {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const GenaralOfferGroup: React.FC<GenarelOfferGroup> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tags: [],
    },
  });

  const [inputValue, setInputValue] = useState("");
  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      reset();
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };
  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <span className="text-xs">
          Fields with an asterisk (<span className="text-red-700">*</span>) are
          required
        </span>
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
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          options={visibilityStatus}
        />
        <div className="flex gap-2">
          <div className="w-1/2">
            <SingleSelect
              id="advertiser"
              label="Advertiser"
              required
              options={advertiserOptions}
              value={watch("advertiser")}
              onChange={(val) => setValue("advertiser", val)}
              error={errors.advertiser}
              isDisabled={isSubmitting}
            />
          </div>
          <div className="w-1/2">
            <SingleSelect
              id="currency"
              label="Currency"
              required
              options={currencyOptions}
              value={watch("currency")}
              onChange={(val) => setValue("currency", val)}
              error={errors.currency}
            />
          </div>
        </div>
        {/* <TagsInput
          tags={tags}
          setTags={setTags}
          inputValue={inputValue}
          setInputValue={setInputValue}
        /> */}
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagsInput
              tags={field.value || []}
              setTags={(newTags) => field.onChange(newTags)}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          )}
        />
        <TextAreaInput
          name="internalnotes"
          label="Internal Notes"
          rows={4}
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />
        <FormActions
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          onCancel={() => reset()}
        />
      </form>
    </Container>
  );
};

export default GenaralOfferGroup;
