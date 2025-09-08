"use client";

import React, { useState } from "react";
import { z } from "zod";

import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import TagsInput from "@/components/shared/forms/TagsInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FormActions from "@/components/shared/forms/FormActions";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.string().min(1, "Status is required"),
  trackingDomain: z.string().min(1, "Tracking Domain is required"),
  forceSSL: z.boolean().optional(),
  showtoPartners: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

type FormType = z.infer<typeof schema>;

interface SmartLinkAddGeneralProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "paused", label: "Paused", dotColor: "bg-purple-500" },
  { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
];

const advertiserOptions = [
  { value: "profitNXT", label: "Profit NXT" },
  { value: "clicksAdv", label: "Clicks Adv" },
];

const SmartLinkAddGeneral: React.FC<SmartLinkAddGeneralProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
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
          tags: [],
          forceSSL: false,
          showtoPartners: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            watch,
            setValue,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
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

              <TagsInput
                tags={watch("tags") || []}
                setTags={(newTags) => setValue("tags", newTags)}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />

              <SingleSelect
                id="trackingDomain"
                label="Tracking Domain"
                required
                showSearch={false}
                options={advertiserOptions}
                value={watch("trackingDomain")}
                onChange={(val) => setValue("trackingDomain", val)}
                error={errors.trackingDomain}
                isDisabled={isSubmitting}
              />

              <div className="flex w-1/2 justify-between">
                <ToggleSwitch
                  label="Force SSL"
                  checked={watch("forceSSL") ?? false}
                  onChange={(val) => setValue("forceSSL", val)}
                  disabled={isSubmitting}
                />
                <ToggleSwitch
                  label="Show to Partners"
                  checked={watch("showtoPartners") ?? false}
                  onChange={(val) => setValue("showtoPartners", val)}
                  disabled={isSubmitting}
                />
              </div>

              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => {
                  reset();
                  setInputValue("");
                }}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default SmartLinkAddGeneral;
