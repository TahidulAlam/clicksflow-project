"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaDollarSign } from "react-icons/fa";

import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import NumberInput from "@/components/shared/forms/NumberInput";

// Schema
export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  revenueType: z.string().min(1, "Revenue Type is required"),
  payoutType: z.string().optional(),
  revenuePerEvent: z
    .number()
    .min(1, "Revenue per event must be greater than 0"),
  costPerConversionEvent: z.number().optional(),
  isPrivate: z.boolean(),
  manualApproval: z.boolean(),
  allowDuplicates: z.boolean(),
  firePartnerPostback: z.boolean(),
  firePostback: z.boolean(),
});

export type RevenueEventData = z.infer<typeof formSchema>;

interface RevenueAddModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmitSuccess: (data: RevenueEventData) => void;
  defaultData?: RevenueEventData;
}

const revenueTypeOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "JHON_STEPHEN", label: "Jhon Stephen" },
];

const payoutTypeOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "JHON_STEPHEN", label: "Jhon Stephen" },
];

export const RevenueAddModal: React.FC<RevenueAddModalProps> = ({
  isOpen,
  isLoading = false,
  onClose,
  onSubmitSuccess,
  defaultData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RevenueEventData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultData ?? {
      name: "",
      revenueType: "",
      payoutType: "",
      revenuePerEvent: 0,
      costPerConversionEvent: 0,
      isPrivate: false,
      manualApproval: false,
      allowDuplicates: false,
      firePartnerPostback: false,
      firePostback: false,
    },
  });

  const isPrivate = watch("isPrivate");
  const revenueTypeValue = watch("revenueType");
  const payoutTypeValue = watch("payoutType");

  const onSubmit: SubmitHandler<RevenueEventData> = (data) => {
    const formData = { ...data };
    if (formData.isPrivate) {
      formData.payoutType = undefined;
      formData.costPerConversionEvent = undefined;
    }
    onSubmitSuccess(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={defaultData ? "Edit Event" : "Add New Event"}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-gray-600">
          Fields with an asterisk (*) are mandatory
        </p>

        <TextInput
          name="name"
          label="Name"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />

        <div className="flex flex-col w-full">
          <ToggleSwitch
            label="Private"
            checked={isPrivate}
            onChange={(val) => setValue("isPrivate", val)}
            disabled={isSubmitting || isLoading}
          />
          {!isPrivate && (
            <div className="w-px relative h-5  bg-gray-300 -mt-3 py-4 ml-5" />
          )}
          {/* -rotate-90 */}
          {!isPrivate && (
            <div className="flex gap-4 rounded-lg bg-gray-50 border border-gray-300 py-4 px-4">
              <div className="w-1/2">
                <SingleSelect
                  id="payoutType"
                  label="Payout Type"
                  required
                  options={payoutTypeOptions}
                  value={payoutTypeValue || ""}
                  onChange={(val) => setValue("payoutType", val)}
                  error={errors.payoutType}
                  isDisabled={isSubmitting || isLoading}
                />
              </div>
              <div className="w-1/2">
                <NumberInput<RevenueEventData>
                  name="costPerConversionEvent"
                  label="Cost per Conversion"
                  type="number"
                  placeholder="Enter amount"
                  icon={FaDollarSign}
                  register={register}
                  errors={errors}
                  required
                  valueAsNumber
                  disabled={isSubmitting || isLoading}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <SingleSelect
              id="revenueType"
              label="Revenue Type"
              required
              options={revenueTypeOptions}
              value={revenueTypeValue}
              onChange={(val) => setValue("revenueType", val)}
              error={errors.revenueType}
              isDisabled={isSubmitting || isLoading}
            />
          </div>
          <div className="w-1/2">
            <NumberInput<RevenueEventData>
              name="revenuePerEvent"
              label="Revenue per Event"
              type="number"
              placeholder="Enter amount"
              icon={FaDollarSign}
              register={register}
              errors={errors}
              required
              valueAsNumber
              disabled={isSubmitting || isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ToggleSwitch
            label="Manually Approve Conv."
            checked={watch("manualApproval")}
            onChange={(val) => setValue("manualApproval", val)}
            disabled={isSubmitting || isLoading}
          />
          <ToggleSwitch
            label="Allow Duplicate Conversions"
            checked={watch("allowDuplicates")}
            onChange={(val) => setValue("allowDuplicates", val)}
            disabled={isSubmitting || isLoading}
          />
          {!isPrivate && (
            <ToggleSwitch
              label="Fire Partner Postback"
              checked={watch("firePartnerPostback")}
              onChange={(val) => setValue("firePartnerPostback", val)}
              disabled={isSubmitting || isLoading}
            />
          )}
          <ToggleSwitch
            label="Fire Postback"
            checked={watch("firePostback")}
            onChange={(val) => setValue("firePostback", val)}
            disabled={isSubmitting || isLoading}
          />
        </div>

        <div className="flex justify-end pt-6 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="px-6 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-900 transition"
          >
            {isSubmitting || isLoading
              ? "Submitting..."
              : defaultData
              ? "Update"
              : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RevenueAddModal;
