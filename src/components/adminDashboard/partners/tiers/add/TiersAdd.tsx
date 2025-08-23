"use client";

import React, { useMemo, useCallback } from "react";
import { z } from "zod";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import NumberInput from "@/components/shared/forms/NumberInput";
import { AiOutlinePercentage } from "react-icons/ai";
import TagsInput from "@/components/shared/forms/TagsInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import { UseFormReturn } from "react-hook-form";

// Constants
const VISIBILITY_STATUS = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "paused", label: "Paused", dotColor: "bg-purple-500" },
  { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
];

const DEFAULT_VALUES = {
  name: "",
  status: "",
  margin: "",
  partners: "",
  description: "",
  trackingDomain: "",
  tags: [],
  showtoPartners: false,
};

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  partners: z.string().min(2, "Name must be at least 2 characters").max(50),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(200),
  status: z.string().min(1, "Status is required"),
  margin: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    { message: "Margin must be between 0 and 100" }
  ),
  trackingDomain: z.string().min(1, "Tracking Domain is required"),
  forceSSL: z.boolean().optional(),
  showtoPartners: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

type FormType = z.infer<typeof schema>;

interface TiersAddProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

interface FormContentProps {
  methods: UseFormReturn<FormType>;
  marginRaw: string;
  revenue: number;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  isSubmitting: boolean;
}

const FormContent = React.memo(function FormContent({
  methods,
  marginRaw,
  revenue,
  inputValue,
  setInputValue,
  isLoading,
  isSubmitting,
}: FormContentProps) {
  const { register, watch, setValue, reset } = methods;

  // Properly placed hooks in component body
  const marginValue = useMemo(() => parseFloat(marginRaw) || 0, [marginRaw]);
  const payout = useMemo(
    () => revenue * (1 - marginValue / 100),
    [marginValue, revenue]
  );

  const handleTagsUpdate = useCallback(
    (newTags: string[]) => setValue("tags", newTags),
    [setValue]
  );

  const handleCancel = useCallback(() => reset(), [reset]);

  return (
    <FlexRow cols={{ base: 1 }}>
      <TextInput
        name="name"
        label="Name"
        register={register}
        errors={methods.formState.errors}
        required
        disabled={isSubmitting}
      />

      <StatusSelector
        label="Status"
        fieldName="status"
        setValue={setValue}
        errors={methods.formState.errors}
        isSubmitting={isSubmitting}
        isLoading={isLoading}
        options={VISIBILITY_STATUS}
        selectedStatus={watch("status")}
      />

      <FlexRow cols={{ base: 2 }}>
        <NumberInput
          name="margin"
          type="number"
          label="Margin"
          required
          iconR={AiOutlinePercentage}
          register={register}
          errors={methods.formState.errors}
          valueAsNumber
        />

        <RevenuePayoutDisplay
          marginValue={marginValue}
          revenue={revenue}
          payout={payout}
        />
      </FlexRow>

      <TagsInput
        tags={watch("tags") || []}
        setTags={handleTagsUpdate}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <TextAreaInput
        name="description"
        label="Description"
        register={register}
        errors={methods.formState.errors}
        rows={4}
        required
        disabled={isSubmitting}
      />

      <TextInput
        name="partners"
        label="Partners"
        register={register}
        errors={methods.formState.errors}
        required
        disabled={isSubmitting}
      />

      <FormActions
        isSubmitting={isSubmitting}
        isLoading={isLoading}
        onCancel={handleCancel}
      />
    </FlexRow>
  );
});

interface RevenuePayoutProps {
  marginValue: number;
  revenue: number;
  payout: number;
}

const RevenuePayoutDisplay = React.memo(function RevenuePayoutDisplay({
  marginValue,
  revenue,
  payout,
}: RevenuePayoutProps) {
  return (
    <div className="text-xs text-gray-900 mt-2 bg-gray-300 rounded p-2">
      <h1 className="font-base text-sm">Revenue & Payout Example</h1>
      <div className="flex justify-between text-xs mt-1">
        <div>
          <h1>Revenue</h1>
          <h1>Payout</h1>
        </div>
        <div className="text-right">
          <h1>RPA ${revenue.toFixed(2)}</h1>
          <h1>RPA ${payout.toFixed(2)}</h1>
        </div>
      </div>
      <div className="flex justify-between text-xs">
        Margin <strong>{marginValue}%</strong>
      </div>
    </div>
  );
});

const TiersAdd = React.memo(function TiersAdd({
  onSubmitSuccess,
  isLoading = false,
}: TiersAddProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleSubmit = useCallback(
    async (data: FormType) => {
      console.log("Submitted Data:", data);
      onSubmitSuccess?.();
    },
    [onSubmitSuccess]
  );

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={DEFAULT_VALUES}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const marginRaw = methods.watch("margin");
          const revenue = 1.0;

          return (
            <FormContent
              methods={methods}
              marginRaw={marginRaw}
              revenue={revenue}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isLoading={isLoading}
              isSubmitting={methods.formState.isSubmitting}
            />
          );
        }}
      </FormArea>
    </Container>
  );
});

export default TiersAdd;
