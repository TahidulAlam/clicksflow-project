import { Controller, Control, FieldErrors } from "react-hook-form";

import { attributionMethodOptions, timeOptions } from "./attributionOptions";
import { AttributionFormData } from "./validationSchemas";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import NumberInput from "@/components/shared/forms/NumberInput";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";

interface EmailOwnershipSectionProps {
  control: Control<AttributionFormData>;
  errors: FieldErrors<AttributionFormData>;
  isSubmitting: boolean;
  isLoading: boolean;
}

export const EmailOwnershipSection = ({
  control,
  errors,
  isSubmitting,
  isLoading,
}: EmailOwnershipSectionProps) => {
  return (
    <Controller
      control={control}
      name="enableMaxEmail"
      render={({ field }) => (
        <>
          <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }} gap="0px">
            <ToggleSwitch
              label="Enable Email Ownership"
              checked={field.value}
              onChange={field.onChange}
              disabled={isSubmitting || isLoading}
              aria-label="Enable Email Ownership"
            />
            {field.value && (
              <div className="w-px relative h-8 bg-gray-300 py-4 ml-5" />
            )}
            {field.value && (
              <div className=" bg-gray-50 border border-gray-300 p-4 rounded-lg">
                <Controller
                  control={control}
                  name="emailAttributionMethod"
                  render={({ field: methodField }) => (
                    <SingleSelect
                      id="emailAttributionMethod"
                      label="Email Attribution Method"
                      required
                      showSearch={false}
                      options={attributionMethodOptions}
                      value={methodField.value}
                      onChange={methodField.onChange}
                      error={errors.emailAttributionMethod}
                      isDisabled={isSubmitting || isLoading}
                      aria-required="true"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="enableViewThroughLookbackWindow"
                  render={({ field: maxField }) => (
                    <div className="mt-4">
                      <ToggleSwitch
                        label="Enable Max Email Attribution Window"
                        checked={maxField.value}
                        onChange={maxField.onChange}
                        disabled={isSubmitting || isLoading}
                        aria-label="Enable Max Email Attribution Window"
                      />
                      {maxField.value && (
                        <div className="w-px relative h-8 bg-gray-300 py-4 ml-5" />
                      )}
                      {maxField.value && (
                        <FlexRow
                          cols={{ base: 2, sm: 1, md: 2, lg: 2 }}
                          gap="gap-4"
                          className=" bg-gray-50 border border-gray-300 p-4 rounded-lg"
                        >
                          <Controller
                            control={control}
                            name="maxEmailAttributionWindowType"
                            render={({ field: typeField }) => (
                              <SingleSelect
                                id="maxEmailAttributionWindowType"
                                label="Max Email Attribution Window Type"
                                required
                                showSearch={false}
                                options={attributionMethodOptions}
                                value={typeField.value}
                                onChange={typeField.onChange}
                                error={errors.maxEmailAttributionWindowType}
                                isDisabled={isSubmitting || isLoading}
                                aria-required="true"
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name="maxEmailAttributionWindow"
                            render={({ field: windowField }) => (
                              <>
                                <SingleSelect
                                  id="maxEmailAttributionWindow"
                                  label="Max Email Attribution Window"
                                  required
                                  showSearch={false}
                                  options={timeOptions.minConversion}
                                  value={windowField.value}
                                  onChange={windowField.onChange}
                                  error={errors.maxEmailAttributionWindow}
                                  isDisabled={isSubmitting || isLoading}
                                  aria-required="true"
                                />
                                {windowField.value === "custom" && (
                                  <>
                                    <div className="flex flex-col gap-2">
                                      <div>
                                        <NumberInput
                                          id="customEmailAttributionWindow"
                                          label="Custom Email Attribution Window"
                                          type="number"
                                          placeholder="Enter minutes"
                                          value={
                                            control._formValues
                                              .customEmailAttributionWindow ?? 0
                                          }
                                          register={control.register}
                                          errors={errors}
                                          disabled={isSubmitting}
                                          required
                                          valueAsNumber
                                        />
                                      </div>
                                      <div>
                                        <SingleSelect
                                          id="maxEmailAttributionWindow"
                                          label="Max Email Attribution Window"
                                          required
                                          showSearch={false}
                                          options={timeOptions.intervals}
                                          value={windowField.value}
                                          onChange={windowField.onChange}
                                          error={
                                            errors.maxEmailAttributionWindow
                                          }
                                          isDisabled={isSubmitting || isLoading}
                                          aria-required="true"
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          />
                        </FlexRow>
                      )}
                    </div>
                  )}
                />
              </div>
            )}
          </FlexRow>
        </>
      )}
    />
  );
};
