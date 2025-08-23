"use client";

import React, { useState } from "react";
import Container from "@/components/shared/container/Container";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import TagsInput from "@/components/shared/forms/TagsInput";
import { z } from "zod";
import { Controller } from "react-hook-form";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.string().min(1, "Status is required"),
  comparisonMethod: z.string().min(1, "Comparison Method is required"),
  trackingDomain: z.string().min(1, "Tracking Domain is required"),
  forceSSL: z.boolean().optional(),
  showtoPartners: z.boolean().optional(),
  tags1: z.array(z.string()).optional(),
  tags2: z.array(z.string()).optional(),
});

type FormType = z.infer<typeof schema>;

const visibilityStatus = [
  { value: "block", label: "Block", dotColor: "bg-green-500" },
  { value: "failTraffic", label: "Fail Traffic", dotColor: "bg-red-500" },
];

interface OptionType {
  label: string;
  value: string;
}

const suggestionOptions: OptionType[] = [
  { label: "Shoes", value: "shoes" },
  { label: "Bags", value: "bags" },
  { label: "Watches", value: "watches" },
];
const suggestionOptionsTags2: OptionType[] = [];

const typeOptions = [
  { value: "archive", label: "Archive" },
  { value: "email", label: "Email" },
  { value: "html", label: "Html" },
];

interface SmartLinkAddGeneralProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const TrafficControlCon: React.FC<SmartLinkAddGeneralProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [tags1, setTags1] = useState<string[]>([]);
  const [inputValue1, setInputValue1] = useState("");
  const [tags2, setTags2] = useState<string[]>([]);
  const [inputValue2, setInputValue2] = useState("");

  const handleSubmit = async (data: FormType) => {
    const finalData = {
      ...data,
      tags1,
      tags2,
    };
    console.log("Submitted Data:", finalData);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          name: "",
          status: "",
          trackingDomain: "",
          comparisonMethod: "",
          forceSSL: false,
          showtoPartners: false,
          tags1: [],
          tags2: [],
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            control,
            watch,
            setValue,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <StatusSelector
                label="Status"
                fieldName="status"
                setValue={setValue}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                options={visibilityStatus}
                selectedStatus={watch("status")}
              />

              <TagsInput
                label="Variables"
                tags={tags1}
                setTags={setTags1}
                inputValue={inputValue1}
                setInputValue={setInputValue1}
                suggestions={suggestionOptions}
              />

              <Controller
                name="comparisonMethod"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    id="comparisonMethod"
                    label="Comparison Method"
                    required
                    showSearch={false}
                    options={typeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.comparisonMethod}
                    isDisabled={isSubmitting}
                  />
                )}
              />

              <TagsInput
                label="Action Values  Separate multiple values by ,(comma) or enter key"
                tags={tags2}
                setTags={setTags2}
                inputValue={inputValue2}
                setInputValue={setInputValue2}
                suggestions={suggestionOptionsTags2}
              />
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => {
                  reset();
                  setInputValue1("");
                  setInputValue2("");
                  setTags1([]);
                  setTags2([]);
                }}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default TrafficControlCon;
