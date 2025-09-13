import {
  Controller,
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { timeOptions } from "./attributionOptions";
import { AttributionFormData } from "./validationSchemas";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import NumberInput from "@/components/shared/forms/NumberInput";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import ArrowLine from "@/components/shared/ArrowLine";

interface ConversionTimeSectionProps {
  control: Control<AttributionFormData>;
  errors: FieldErrors<AttributionFormData>;
  isSubmitting: boolean;
  isLoading: boolean;
  register: UseFormRegister<AttributionFormData>;
}

export const ConversionTimeSection = ({
  control,
  errors,
  isSubmitting,
  isLoading,
  register,
}: ConversionTimeSectionProps) => {
  return (
    <Controller
      control={control}
      name="conversionTime"
      render={({ field }) => (
        <>
          <div className="flex flex-col w-full">
            <ToggleSwitch
              label="Enable Click to Conversion Time"
              checked={field.value}
              onChange={field.onChange}
              disabled={isSubmitting || isLoading}
              aria-label="Enable Click to Conversion Time"
            />
            {field.value && <ArrowLine />}
            {field.value && (
              <FlexRow
                cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                gap="gap-4"
                className="mb-4  border border-gray-300 p-4 rounded-lg"
              >
                <Controller
                  control={control}
                  name="minConversionTime"
                  render={({ field: minField }) => (
                    <div className="grid grid-cols-2 gap-2">
                      <SingleSelect
                        id="minConversionTime"
                        label="Min. Conversion Time"
                        required
                        showSearch={false}
                        placeholder="Select time"
                        options={timeOptions.minConversion}
                        value={minField.value}
                        onChange={minField.onChange}
                        error={errors.minConversionTime}
                        isDisabled={isSubmitting || isLoading}
                        aria-required="true"
                      />
                      {minField.value === "custom" && (
                        <div className="flex gap-2">
                          <div className="w-1/2">
                            <NumberInput
                              id="minSessionLifespan"
                              className="bg-white"
                              label="Session Lifespan"
                              type="number"
                              placeholder="Enter seconds"
                              value={
                                control._formValues.minSessionLifespan ?? 0
                              }
                              register={register}
                              errors={errors}
                              disabled={isSubmitting}
                              required
                              valueAsNumber
                            />
                          </div>
                          <div className="w-1/2">
                            <Controller
                              control={control}
                              name="minTimeInterval"
                              render={({ field: intervalField }) => (
                                <SingleSelect
                                  id="minTimeInterval"
                                  label="Time Interval"
                                  showSearch={false}
                                  required
                                  placeholder="Select interval"
                                  options={timeOptions.intervals}
                                  value={intervalField.value}
                                  onChange={intervalField.onChange}
                                  error={errors.minTimeInterval}
                                  isDisabled={isSubmitting || isLoading}
                                  aria-required="true"
                                />
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="maxConversionTime"
                  render={({ field: maxField }) => (
                    <div className="grid grid-cols-2 gap-2">
                      <SingleSelect
                        id="maxConversionTime"
                        label="Max. Conversion Time"
                        required
                        showSearch={false}
                        placeholder="Select time"
                        options={timeOptions.minConversion}
                        value={maxField.value}
                        onChange={maxField.onChange}
                        error={errors.maxConversionTime}
                        isDisabled={isSubmitting || isLoading}
                        aria-required="true"
                      />
                      {maxField.value === "custom" && (
                        <div className="flex gap-2">
                          <div className="w-1/2">
                            <NumberInput
                              id="maxSessionLifespan"
                              label="Session Lifespan"
                              type="number"
                              placeholder="Enter seconds"
                              value={
                                control._formValues.maxSessionLifespan ?? 0
                              }
                              register={register}
                              errors={errors}
                              disabled={isSubmitting}
                              required
                              valueAsNumber
                            />
                          </div>
                          <div className="w-1/2">
                            <Controller
                              control={control}
                              name="maxTimeInterval"
                              render={({ field: intervalField }) => (
                                <SingleSelect
                                  id="maxTimeInterval"
                                  label="Time Interval"
                                  showSearch={false}
                                  required
                                  placeholder="Select interval"
                                  options={timeOptions.intervals}
                                  value={intervalField.value}
                                  onChange={intervalField.onChange}
                                  error={errors.maxTimeInterval}
                                  isDisabled={isSubmitting || isLoading}
                                  aria-required="true"
                                />
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
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
