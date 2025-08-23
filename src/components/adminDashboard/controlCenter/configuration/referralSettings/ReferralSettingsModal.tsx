import React from "react";
import { z } from "zod";
import { Controller } from "react-hook-form";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import { Modal } from "@/components/shared/modal/Modal";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import TextInput from "@/components/shared/forms/TextInput";

// Select options
const methodOptions = [
  { value: "flatAmount", label: "Flat Amount" },
  { value: "percentageAmount", label: "Percentage Amount" },
];

const commissionTypeOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

// Form validation schema
const ReferralSettingsSchema = z.object({
  status: z.boolean().optional(),
  recurringBonus: z.boolean().optional(),
  method: z.string().min(1, "Method is required"),
  flatAmount: z.string().min(1, "Method is required"),
  percentageAmount: z.string().min(1, "Method is required"),
  commissionType: z.string().min(1, "Method is required"),
  minimumThreshold: z.string().min(1, "Method is required"),
  commissionPeriod: z.string().min(1, "Method is required"),
});

type FormType = z.infer<typeof ReferralSettingsSchema>;

interface ReferralSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const ReferralSettingsModal: React.FC<ReferralSettingsModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Referral Settings Data:", data);
    onSubmitSuccess?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="top"
      size="lg"
      title="Referral Settings"
    >
      <FormArea
        schema={ReferralSettingsSchema}
        defaultValues={{
          status: false,
          method: methodOptions[0].value,
          flatAmount: "",
          percentageAmount: "",
          minimumThreshold: "",
          commissionPeriod: "",
          commissionType: commissionTypeOptions[0].value,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            control,
            setValue,
            watch,
            reset,
            // register,
            formState: { errors, isSubmitting },
          } = methods;

          const isStatusEnabled = watch("status") ?? false;

          return (
            <>
              <ToggleSwitch
                size="lg"
                name="isStatusEnabled"
                label="Enable Partner Referral"
                // checked={isStatusEnabled}
                // onChange={(val) => setValue("status", val)}
                disabled={isSubmitting}
              />

              {isStatusEnabled && (
                <Controller
                  name="method"
                  control={control}
                  render={({ field }) => (
                    <>
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <div className="w-full">
                            <SingleSelect
                              id="method"
                              label="Method"
                              required
                              showSearch={false}
                              options={methodOptions}
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.method}
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          {field.value === "flatAmount" && (
                            <TextInput
                              name="flatAmount"
                              label="Flat Amount"
                              // register={register}
                              // errors={errors}
                              required
                              type="number"
                              inputLeftIcon="$"
                              disabled={isSubmitting || isLoading}
                            />
                          )}
                          {field.value === "percentageAmount" && (
                            <TextInput
                              name="percentageAmount"
                              label="Percentage Amount"
                              // register={register}
                              // errors={errors}
                              required
                              type="number"
                              inputLeftIcon="%"
                              disabled={isSubmitting || isLoading}
                            />
                          )}
                        </div>
                      </div>
                      <ToggleSwitch
                        size="lg"
                        label="Recurring Bonus"
                        name="recurringBonus"
                        // checked={watch("recurringBonus") ?? false}
                        // onChange={(val) => setValue("recurringBonus", val)}
                        disabled={isSubmitting}
                      />
                      <SingleSelect
                        id="commissionType"
                        label="Commission Type"
                        required
                        options={commissionTypeOptions}
                        value={watch("commissionType")}
                        onChange={(val) => setValue("commissionType", val)}
                        showSearch={false}
                        error={errors.commissionType}
                      />
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <TextInput
                            name="minimumThreshold"
                            label="Minimum Threshold"
                            // register={register}
                            // errors={errors}
                            required
                            type="number"
                            inputLeftIcon="$"
                            disabled={isSubmitting || isLoading}
                          />
                        </div>
                        <div className="w-1/2">
                          <TextInput
                            name="commissionPeriod"
                            label="Commission Period"
                            // register={register}
                            // errors={errors}
                            // required
                            type="number"
                            inputRightIcon="Days"
                            disabled={isSubmitting || isLoading}
                          />
                        </div>
                      </div>
                    </>
                  )}
                />
              )}
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => {
                  reset();
                  onClose();
                }}
              />
            </>
          );
        }}
      </FormArea>
    </Modal>
  );
};

export default ReferralSettingsModal;
