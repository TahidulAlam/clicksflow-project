import { Controller, Control, FieldErrors } from "react-hook-form";

import { timeOptions } from "./attributionOptions";
import { AttributionFormData } from "./validationSchemas";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import NumberInput from "@/components/shared/forms/NumberInput";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";

interface ViewThroughSectionProps {
  control: Control<AttributionFormData>;
  errors: FieldErrors<AttributionFormData>;
  isSubmitting: boolean;
  isLoading: boolean;
}

export const ViewThroughSection = ({
  control,
  errors,
  isSubmitting,
  isLoading,
}: ViewThroughSectionProps) => {
  return (
    <Controller
      control={control}
      name="enableViewThrough"
      render={({ field }) => (
        <>
          <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }} gap="0px">
            <ToggleSwitch
              label="Enable View-Through"
              checked={field.value}
              onChange={field.onChange}
              disabled={isSubmitting || isLoading}
              aria-label="Enable View-Through"
            />
            {field.value && (
              <div className="w-px relative h-8 bg-gray-300 py-4 ml-5" />
            )}
            {field.value && (
              <FlexRow
                cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                gap="0px"
                className=" space-y-4 bg-gray-50 border border-gray-300 p-4 rounded-lg"
              >
                <Controller
                  control={control}
                  name="viewThroughDestinationURL"
                  render={({ field: urlField }) => (
                    <MacroBuilder
                      label="Base Destination URL"
                      url={urlField.value || ""}
                      setUrl={urlField.onChange}
                      error={errors.viewThroughDestinationURL}
                      disabled={isSubmitting || isLoading}
                      showDropdownButton={false}
                      forceDropdownOpen={true}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="enableViewThroughLookbackWindow"
                  render={({ field: lookbackField }) => (
                    <>
                      <FlexRow
                        cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                        gap="0px"
                      >
                        <ToggleSwitch
                          label="Enable View-Through Lookback Window"
                          checked={lookbackField.value}
                          onChange={lookbackField.onChange}
                          disabled={isSubmitting || isLoading}
                          aria-label="Enable View-Through Lookback Window"
                        />
                        {lookbackField.value && (
                          <div className="w-px relative h-8 bg-gray-300 py-4 ml-5" />
                        )}

                        {lookbackField.value && (
                          <FlexRow
                            cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                            gap="0px"
                            className="bg-gray-50 border border-gray-300 p-4 rounded-lg"
                          >
                            <Controller
                              control={control}
                              name="minLookbackWindow"
                              render={({ field: minField }) => (
                                <div className="flex gap-2">
                                  <FlexRow
                                    cols={{ base: 1, sm: 2, md: 2, lg: 2 }}
                                  >
                                    <SingleSelect
                                      id="minLookbackWindow"
                                      label="View Through > Min. Lookback Window"
                                      required
                                      showSearch={false}
                                      options={timeOptions.lookbackWindow}
                                      value={
                                        minField.value
                                          ? String(minField.value)
                                          : ""
                                      }
                                      onChange={minField.onChange}
                                      error={errors.minLookbackWindow}
                                      isDisabled={isSubmitting || isLoading}
                                      aria-required="true"
                                    />
                                    {String(minField.value) === "custom" && (
                                      <NumberInput
                                        id="minSessionLifespan"
                                        label="Seconds"
                                        type="number"
                                        placeholder="Enter minutes"
                                        value={
                                          control._formValues
                                            .minSessionLifespan ?? 0
                                        }
                                        register={control.register}
                                        errors={errors}
                                        disabled={isSubmitting}
                                        required
                                        valueAsNumber
                                      />
                                    )}
                                  </FlexRow>
                                </div>
                              )}
                            />

                            <Controller
                              control={control}
                              name="maxLookbackWindow"
                              render={({ field: maxField }) => (
                                <FlexRow
                                  cols={{ base: 1, sm: 2, md: 2, lg: 2 }}
                                >
                                  <SingleSelect
                                    id="maxLookbackWindow"
                                    label="View Through > Max. Lookback Window"
                                    required
                                    showSearch={false}
                                    options={timeOptions.lookbackWindow}
                                    value={
                                      maxField.value
                                        ? String(maxField.value)
                                        : ""
                                    }
                                    onChange={maxField.onChange}
                                    error={errors.maxLookbackWindow}
                                    isDisabled={isSubmitting || isLoading}
                                    aria-required="true"
                                  />
                                  {String(maxField.value) === "custom" && (
                                    <div className="">
                                      <NumberInput
                                        id="maxSessionLifespan"
                                        label="Custom Minutes"
                                        type="number"
                                        placeholder="Enter minutes"
                                        value={
                                          control._formValues
                                            .maxSessionLifespan ?? 0
                                        }
                                        register={control.register}
                                        errors={errors}
                                        disabled={isSubmitting}
                                        required
                                        valueAsNumber
                                      />
                                    </div>
                                  )}
                                </FlexRow>
                              )}
                            />
                          </FlexRow>
                        )}
                      </FlexRow>
                    </>
                  )}
                />
              </FlexRow>
            )}
          </FlexRow>
        </>
      )}
    />
  );
};
