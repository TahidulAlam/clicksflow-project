"use client";

import React, { useMemo } from "react";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import { z } from "zod";
import FormActions from "@/components/shared/forms/FormActions";
import TextInput from "@/components/shared/forms/TextInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import { Controller } from "react-hook-form";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import countryList from "react-select-country-list";

const schema = z.object({
  address1: z
    .string()
    .min(2, "Address 1 must be at least 2 characters")
    .max(50),
  address2: z
    .string()
    .min(2, "Address 2 must be at least 2 characters")
    .max(50),
  state: z.string().min(2, "State must be at least 2 characters").max(50),
  city: z.string().min(2, "City must be at least 2 characters").max(50),
  postalCode: z
    .string()
    .min(2, "Postal Code must be at least 2 characters")
    .max(50),
  country: z.string().optional(),
  enableAddress: z.boolean().optional(),
});

type FormType = z.infer<typeof schema>;

interface AddressPartnersProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const AddressPartners: React.FC<AddressPartnersProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const countryData = useMemo(() => countryList().getData(), []);

  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          enableAddress: false,
          address1: "",
          address2: "",
          state: "",
          city: "",
          postalCode: "",
          country: "",
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            control,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <Controller
                name="enableAddress"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleSwitch
                      size="lg"
                      label="Enable Address"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      disabled={isSubmitting || isLoading}
                    />
                    {field.value && (
                      <>
                        <TextInput
                          name="address1"
                          label="Address 1"
                          register={register}
                          errors={errors}
                          required
                          disabled={isSubmitting}
                        />
                        <TextInput
                          name="address2"
                          label="Address 2"
                          register={register}
                          errors={errors}
                          disabled={isSubmitting}
                        />
                        <div className="flex gap-5">
                          <div className="w-1/2">
                            <TextInput
                              name="state"
                              label="State"
                              register={register}
                              errors={errors}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="w-1/2">
                            <TextInput
                              name="city"
                              label="City"
                              register={register}
                              errors={errors}
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="w-1/2">
                            <TextInput
                              name="postalCode"
                              label="Postal Code"
                              register={register}
                              errors={errors}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="w-1/2">
                            <Controller
                              name="country"
                              control={control}
                              render={({ field }) => (
                                <SingleSelect
                                  id="country"
                                  label="Country"
                                  required
                                  showSearch
                                  options={countryData}
                                  value={field.value}
                                  onChange={field.onChange}
                                  error={errors.country}
                                  isDisabled={isSubmitting}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              />
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => reset()}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default AddressPartners;
