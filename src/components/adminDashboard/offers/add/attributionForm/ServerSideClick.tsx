"use client";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { AttributionFormData } from "./validationSchemas";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import ArrowLine from "@/components/shared/ArrowLine";

interface ServerSideClickSectionProps {
  control: Control<AttributionFormData>;
  errors: FieldErrors<AttributionFormData>;
  isSubmitting: boolean;
  isLoading: boolean;
}

const ServerSideClick = ({
  control,
  errors,
  isSubmitting,
  isLoading,
}: ServerSideClickSectionProps) => {
  return (
    <Controller
      control={control}
      name="enableServerSideClick"
      render={({ field }) => (
        <div>
          <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }} gap="0px">
            <ToggleSwitch
              label="Enable Server-Side Click"
              checked={field.value}
              onChange={field.onChange}
              disabled={isSubmitting || isLoading}
              aria-label="Enable Server-Side Click"
            />
            {field.value && <ArrowLine />}
            {field.value && (
              <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg">
                <Controller
                  control={control}
                  name="viewThroughDestinationURL"
                  render={({ field: urlField }) => (
                    <MacroBuilder
                      label="Server-Side Click URL"
                      url={urlField.value || ""}
                      setUrl={urlField.onChange}
                      error={errors.viewThroughDestinationURL}
                      disabled={isSubmitting || isLoading}
                      showDropdownButton={false}
                      forceDropdownOpen={true}
                    />
                  )}
                />
              </div>
            )}
          </FlexRow>
        </div>
      )}
    />
  );
};

export default ServerSideClick;
