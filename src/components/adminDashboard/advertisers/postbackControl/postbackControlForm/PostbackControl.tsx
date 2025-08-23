"use client";

import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

import Container from "@/components/shared/container/Container";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import TagsInput from "@/components/shared/forms/TagsInput";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import SectionDivider from "@/components/shared/SectionDivider";

const actionOptions = [
  { value: "reject", label: "Reject" },
  { value: "rejectAsThrottle", label: "Reject As Throttle" },
];

const controlConditionOption = [
  { value: "matchAll", label: "Match All" },
  {
    value: "atLeastOneRuleMustBeMatching",
    label: "At Least One Rule Must Be Matching",
  },
];

const offerOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

const schema = z.object({
  action: z.string().optional(),
  controlCondition: z.string().optional(),
  offers: z
    .array(
      z.object({
        offer: z.string().optional(),
        offerUrl: z.array(z.string()).optional(),
      })
    )
    .optional(),
});

type FormType = z.infer<typeof schema>;

interface PostbackControlProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const PostbackControl: React.FC<PostbackControlProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [inputValues, setInputValues] = useState<Record<number, string>>({});

  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      action: actionOptions[0].value,
      controlCondition: controlConditionOption[0].value,
      offers: [{ offer: "", offerUrl: [] }],
    },
  });

  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "offers",
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    if (data) {
      toast.success("Postback Control Data Submitted Successfully");
      onSubmitSuccess?.();
    } else {
      toast.error("Failed to submit Postback Control Data");
    }
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          action: actionOptions[0].value,
          controlCondition: controlConditionOption[0].value,
          offers: [{ offer: "", offerUrl: [] }],
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <>
            <FlexRow cols={{ base: 2, sm: 1, md: 1, lg: 2 }}>
              <SingleSelect
                id="action"
                label="Action"
                required
                showSearch={false}
                options={actionOptions}
                value={watch("action")}
                onChange={(val) => setValue("action", val)}
                error={errors.action}
                isDisabled={isSubmitting}
              />
              <SingleSelect
                id="controlCondition"
                label="Control Condition"
                required
                showSearch={false}
                options={controlConditionOption}
                value={watch("controlCondition")}
                onChange={(val) => setValue("controlCondition", val)}
                error={errors.controlCondition}
                isDisabled={isSubmitting}
              />
            </FlexRow>

            <SectionDivider label="Rules" />

            <div className="p-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-start gap-3 border border-gray-300 p-2 mb-2 rounded-md"
                >
                  <div className="flex-1 min-w-[150px]">
                    <Controller
                      control={control}
                      name={`offers.${index}.offer`}
                      render={({ field }) => (
                        <SingleSelect
                          id={`offer-${index}`}
                          label="Variables"
                          placeholder="Select"
                          required
                          options={offerOptions}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          isDisabled={isSubmitting}
                          showSearch={false}
                        />
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <Controller
                      control={control}
                      name={`offers.${index}.offer`}
                      render={({ field }) => (
                        <SingleSelect
                          label="Comparison Method"
                          id={`method-${index}`}
                          placeholder="Select one"
                          options={offerOptions}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          isDisabled={isSubmitting}
                        />
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-[150px]">
                    <Controller
                      control={control}
                      name={`offers.${index}.offerUrl`}
                      defaultValue={[]}
                      render={({ field }) => (
                        <TagsInput
                          id={`offers.${index}.offerUrl`}
                          label="Offer ID"
                          tags={field.value || []}
                          setTags={field.onChange}
                          inputValue={inputValues[index] || ""}
                          setInputValue={(val) =>
                            setInputValues((prev) => ({
                              ...prev,
                              [index]: val,
                            }))
                          }
                        />
                      )}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={index === 0}
                    className="text-white px-3 py-1 rounded transition mt-8 bg-red-600 hover:bg-red-700"
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ offer: "", offerUrl: [] })}
                className="mt-2 px-4 py-1 border border-gray-300 rounded bg-white text-sm"
              >
                + Add New
              </button>
            </div>

            <FormActions
              isSubmitting={isSubmitting}
              isLoading={isLoading}
              onCancel={() => reset()}
            />
          </>
        )}
      </FormArea>
    </Container>
  );
};

export default PostbackControl;
