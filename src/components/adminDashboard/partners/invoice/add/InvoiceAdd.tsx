"use client";

import React from "react";
import { z } from "zod";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import TextInput from "@/components/shared/forms/TextInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import DatePickerWrapper from "@/components/shared/calender/DatePickerWrapper";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import { Controller } from "react-hook-form";
import NumberInput from "@/components/shared/forms/NumberInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import FormActions from "@/components/shared/forms/FormActions";
import toast from "react-hot-toast";

const advertiserOptions = [
  { value: "none", label: "None" },
  { value: "net7", label: "Net 7" },
  { value: "net15", label: "Net 15" },
  { value: "net30", label: "Net 30" },
  { value: "net60", label: "Net 60" },
  { value: "custom", label: "Custom" },
];

const schema = z.object({
  trxID: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  invoiceHiddenFromPartner: z.boolean().default(false),
  effectiveDateRange: z
    .array(z.date().nullable())
    .length(2, "Effective date range must have exactly two dates")
    .refine(
      ([start, end]) => start && end && start <= end,
      "Start date must be before or equal to end date"
    ),
  paymentTerms: z.string().min(1, "Status is required"),
  selectPartner: z.string().min(1, "Status is required"),
  publicNotes: z.string().min(1, "Status is required"),
  internalNotes: z.string().min(1, "Status is required"),
  customPaymentTermsinDays: z.number().min(1, "Status is required"),
});

type FormType = z.infer<typeof schema>;

interface InvoiceAddProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const InvoiceAdd: React.FC<InvoiceAddProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    if (data) {
      toast.success("Data Submitted Successfully");
      onSubmitSuccess?.();
    } else {
      toast.error("Failed to submit Data");
    }
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          trxID: "",
          paymentTerms: "",
          selectPartner: "",
          publicNotes: "",
          internalNotes: "",
          invoiceHiddenFromPartner: false,
          customPaymentTermsinDays: 0,
          effectiveDateRange: [null, null],
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            control,
            reset,
            watch,
            setValue,
            formState: { errors, isSubmitting },
          } = methods;

          const dateRange = watch("effectiveDateRange") as [
            Date | null,
            Date | null
          ];

          return (
            <>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <Controller
                  name="selectPartner"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      id="selectPartner"
                      label="Select Partner"
                      required
                      // showSearch={false}
                      options={advertiserOptions}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.selectPartner}
                      isDisabled={isSubmitting}
                    />
                  )}
                />
                <ToggleSwitch
                  className="gap-2"
                  label="Hide Invoice From Partner"
                  labelClassName="mb-1"
                  checked={watch("invoiceHiddenFromPartner")}
                  onChange={(val) => setValue("invoiceHiddenFromPartner", val)}
                  disabled={isSubmitting || isLoading}
                />
              </div>
              <DatePickerWrapper
                mode="range"
                label="Effective Date Range"
                placeholder="Select date range"
                value={dateRange}
                showYearDropdown={true}
                showMonthDropdown={true}
                onChange={(range) =>
                  setValue(
                    "effectiveDateRange",
                    range as [Date | null, Date | null]
                  )
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
              <TextInput
                name="trxID"
                label="Trx ID"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting}
              />
              <TextAreaInput
                name="internalNotes"
                label="Internal Notes"
                rows={3}
                register={register}
                errors={errors}
                required
                disabled={isSubmitting}
              />
              <TextAreaInput
                name="publicNotes"
                label="Public Notes"
                rows={3}
                register={register}
                errors={errors}
                required
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

export default InvoiceAdd;
