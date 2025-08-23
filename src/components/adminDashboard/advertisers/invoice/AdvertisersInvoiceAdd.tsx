"use client";

import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import DatePickerWrapper from "@/components/shared/calender/DatePickerWrapper";
import Container from "@/components/shared/container/Container";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import NumberInput from "@/components/shared/forms/NumberInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import React from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const advertiserOptions = [
  { value: "none", label: "None" },
  { value: "net7", label: "Net 7" },
  { value: "net15", label: "Net 15" },
  { value: "net30", label: "Net 30" },
  { value: "net60", label: "Net 60" },
  { value: "custom", label: "Custom" },
];

const schema = z.object({
  selectAdvertiser: z.string().optional(),
  invoiceHiddenFromAdvertiser: z.boolean().optional(),
  paymentTerms: z.string().min(1, "Status is required"),
  publicNotes: z.string().min(1, "Status is required"),
  internalNotes: z.string().min(1, "Status is required"),
  paymentPeriod: z
    .array(z.date().nullable())
    .length(2, "Effective date range must have exactly two dates")
    .refine(
      ([start, end]) => start && end && start <= end,
      "Start date must be before or equal to end date"
    ),
});

type FormType = z.infer<typeof schema>;

interface AdvertisersInvoiceAddProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const AdvertisersInvoiceAdd: React.FC<AdvertisersInvoiceAddProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    if (data) {
      toast.success("Invoice Data Submitted Successfully");
      onSubmitSuccess?.();
    } else {
      toast.error("Failed to submit Invoice Data");
    }
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          selectAdvertiser: "",
          paymentTerms: "",
          publicNotes: "",
          internalNotes: "",
          invoiceHiddenFromAdvertiser: false,
          paymentPeriod: [null, null],
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            control,
            reset,
            register,
            watch,
            setValue,
            formState: { errors, isSubmitting },
          } = methods;

          const dateRange = watch("paymentPeriod") as [
            Date | null,
            Date | null
          ];

          return (
            <>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <Controller
                  name="selectAdvertiser"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      id="selectAdvertiser"
                      label="Select Advertiser"
                      required
                      options={advertiserOptions}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.selectAdvertiser}
                      isDisabled={isSubmitting}
                    />
                  )}
                />

                <Controller
                  name="invoiceHiddenFromAdvertiser"
                  control={control}
                  render={({ field }) => (
                    <ToggleSwitch
                      className="gap-2"
                      label="Invoice Hidden From Advertiser"
                      labelClassName="mb-1"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      disabled={isSubmitting || isLoading}
                    />
                  )}
                />
              </div>

              <DatePickerWrapper
                mode="range"
                label="Payment Period"
                placeholder="Select date range"
                value={dateRange}
                showYearDropdown
                showMonthDropdown
                onChange={(range) =>
                  setValue("paymentPeriod", range as [Date | null, Date | null])
                }
                showApplyCancel
                minDate={new Date(2025, 0, 1)}
                maxDate={new Date(2025, 11, 31)}
              />
              <Controller
                name="paymentTerms"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <SingleSelect
                          id="paymentTerms"
                          label="Payment Terms"
                          required
                          showSearch={false}
                          options={advertiserOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.paymentTerms}
                          isDisabled={isSubmitting}
                        />
                      </div>

                      {field.value === "custom" && (
                        <div className="col-span-1 md:col-span-1 lg:col-span-2">
                          <NumberInput
                            id="customPaymentTermsinDays"
                            label="Custom Payment Terms in Days"
                            type="number"
                            placeholder="Enter seconds"
                            value={
                              control._formValues.customPaymentTermsinDays ?? 0
                            }
                            inputLabelR="Days"
                            register={register}
                            errors={errors}
                            disabled={isSubmitting}
                            required
                            valueAsNumber
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              />
              <TextAreaInput
                name="publicNotes"
                label="Public Notes"
                rows={3}
                register={register}
                errors={errors}
                // required
                disabled={isSubmitting}
              />
              <TextAreaInput
                name="internalNotes"
                label="Internal Notes"
                rows={3}
                register={register}
                errors={errors}
                // required
                disabled={isSubmitting}
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

export default AdvertisersInvoiceAdd;
