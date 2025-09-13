import {
  Controller,
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { FaPercentage } from "react-icons/fa";
import { conversionStatusOptions } from "./attributionOptions";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import NumberInput from "@/components/shared/forms/NumberInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import { AttributionFormData } from "./validationSchemas";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import ArrowLine from "@/components/shared/ArrowLine";

interface ThrottleRateSectionProps {
  control: Control<AttributionFormData>;
  errors: FieldErrors<AttributionFormData>;
  isSubmitting: boolean;
  isLoading: boolean;
  register: UseFormRegister<AttributionFormData>;
}

export const ThrottleRateSection = ({
  control,
  errors,
  isSubmitting,
  isLoading,
  register,
}: ThrottleRateSectionProps) => {
  return (
    <Controller
      control={control}
      name="applyThrottleRate"
      render={({ field }) => (
        <>
          <div className="flex flex-col w-full">
            <ToggleSwitch
              label="Apply Throttle Rate"
              checked={field.value}
              onChange={field.onChange}
              disabled={isSubmitting || isLoading}
              aria-label="Apply Throttle Rate"
            />
            {field.value && (
              // <div className="w-px relative h-8 bg-gray-300 py-4 ml-5" />
              <ArrowLine />
            )}
            {field.value && (
              <FlexRow
                cols={{ base: 2, sm: 1, md: 2, lg: 2 }}
                gap="gap-4"
                className="mb-4  border border-gray-300 p-4 rounded-lg"
              >
                <Controller
                  control={control}
                  name="conversionStatus"
                  render={({ field: statusField }) => (
                    <SingleSelect
                      id="conversionStatus"
                      label="Conversion Status"
                      showSearch={false}
                      required
                      placeholder="Select status"
                      options={conversionStatusOptions}
                      value={statusField.value ? String(statusField.value) : ""}
                      onChange={statusField.onChange}
                      error={errors.conversionStatus}
                      isDisabled={isSubmitting || isLoading}
                      aria-required="true"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="throttleRate"
                  render={({ field: rateField }) => (
                    <NumberInput
                      id="throttleRate"
                      label="Revenue per Conversion"
                      type="number"
                      placeholder="Enter amount"
                      icon={FaPercentage}
                      value={rateField.value ?? 0}
                      register={register}
                      errors={errors}
                      disabled={isSubmitting}
                      required
                      valueAsNumber
                    />
                  )}
                />
              </FlexRow>
            )}
          </div>
        </>
      )}
    />
  );
};
