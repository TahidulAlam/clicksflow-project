"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormActions from "@/components/shared/forms/FormActions";
import TextInput from "@/components/shared/forms/TextInput";
import NumberInput from "@/components/shared/forms/NumberInput";
import { MdOutlinePercent } from "react-icons/md";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import { BsCurrencyDollar } from "react-icons/bs";
import DatePickerWrapper from "@/components/shared/calender/DatePickerWrapper";
import SectionDivider from "@/components/shared/SectionDivider";
import {
  dayOfMonthOptions,
  dayOptions,
  invoiceOption,
  monthOptions,
  paymentTermsOptions,
  typeOptions,
} from "@/constants/billingOptions";

const schema = z
  .object({
    billingFrequency: z.enum(
      [
        "weekly",
        "bimonthly",
        "monthly",
        "twomonths",
        "quarterly",
        "manual",
        "other",
      ],
      { required_error: "Type is required" }
    ),

    taxID: z.string().optional(),
    bitcoin_address: z.string().optional(),
    account_number: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    recipient_name: z.string().optional(),
    bank_name: z.string().optional(),
    bank_address: z.string().optional(),
    account_name: z.string().optional(),
    routing_number_or_iban_or_short_code: z.string().optional(),
    payxum_id_or_email: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    swift_code: z.string().optional(),
    // Billing frequency fields
    day: z.string().optional(),
    monthly: z.string().optional(),
    bimonthly1: z.string().optional(),
    bimonthly2: z.string().optional(),
    startingMonth1: z.string().optional(),
    dayofMonth1: z.string().optional(),
    startingMonth2: z.string().optional(),
    dayofMonth2: z.string().optional(),
    automaticInvoiceCreation: z.boolean().optional(),
    hideInvoicesFromPartners: z.boolean().optional(),
    invoiceGen: z.string().optional(),
    paymentTerms: z.string().optional(),
    invoiceStartDate: z.date().optional(),
    taxParentage: z.number().optional(),
    autoInvoiceAmountThreshold: z.number().optional(),
  })
  .refine(
    (data) => {
      switch (data.billingFrequency) {
        case "weekly":
          return !!data.day;
        case "bimonthly":
          return !!data.bimonthly1 && !!data.bimonthly2;
        case "monthly":
          return !!data.monthly;
        case "twomonths":
          return !!data.startingMonth1 && !!data.dayofMonth1;
        case "quarterly":
          return !!data.startingMonth2 && !!data.dayofMonth2;
        default:
          return true;
      }
    },
    {
      message: "Required fields are missing",
      path: ["billingFrequency"],
    }
  );

type FormType = z.infer<typeof schema>;

interface AdvertiserBillingProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const AdvertiserBilling: React.FC<AdvertiserBillingProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };
  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          billingFrequency: "weekly",
          bitcoin_address: "",
          account_number: "",
          name: "",
          email: "",
          recipient_name: "",
          bank_name: "",
          bank_address: "",
          account_name: "",
          routing_number_or_iban_or_short_code: "",
          payxum_id_or_email: "",
          first_name: "",
          last_name: "",
          phone: "",
          country: "",
          swift_code: "",
          // Billing frequency fields
          day: "",
          monthly: "",
          bimonthly1: "",
          bimonthly2: "",
          startingMonth1: "",
          dayofMonth1: "",
          startingMonth2: "",
          dayofMonth2: "",
          taxID: "",
          taxParentage: 0,
          autoInvoiceAmountThreshold: 0,
          automaticInvoiceCreation: false,
          hideInvoicesFromPartners: false,
          invoiceGen: "",
          paymentTerms: "none",
          invoiceStartDate: new Date(),
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            control,
            watch,
            register,
            reset,
            setValue,
            formState: { errors, isSubmitting },
          } = methods;

          const selectedType = watch("billingFrequency");

          return (
            <>
              <div>
                <div className="grid grid-cols-3 gap-4">
                  {/* Billing Frequency */}
                  <div className="col-span-1">
                    <Controller
                      name="billingFrequency"
                      control={control}
                      render={({ field }) => (
                        <SingleSelect
                          id="billingFrequency"
                          label="Billing Frequency"
                          required
                          showSearch={false}
                          options={typeOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.billingFrequency}
                          isDisabled={isSubmitting}
                        />
                      )}
                    />
                  </div>
                  {/* Dynamic Billing Frequency Fields */}
                  {selectedType === "weekly" && (
                    <div className="col-span-1">
                      <Controller
                        name="day"
                        control={control}
                        render={({ field }) => (
                          <SingleSelect
                            id="day"
                            label="Weekday"
                            required
                            showSearch={false}
                            options={dayOptions}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.day}
                            isDisabled={isSubmitting}
                          />
                        )}
                      />
                    </div>
                  )}
                  {/* Bimonthly (Twice a month) */}
                  {selectedType === "bimonthly" && (
                    <>
                      <div className="col-span-1">
                        <Controller
                          name="bimonthly1"
                          control={control}
                          render={({ field }) => (
                            <SingleSelect
                              id="bimonthly1"
                              label="First Billing Day"
                              required
                              showSearch={false}
                              options={[...dayOfMonthOptions]}
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.bimonthly1}
                              isDisabled={isSubmitting}
                            />
                          )}
                        />
                      </div>
                      <div className="col-span-1">
                        <Controller
                          name="bimonthly2"
                          control={control}
                          render={({ field }) => (
                            <SingleSelect
                              id="bimonthly2"
                              label="Second Billing Day"
                              required
                              showSearch={false}
                              options={[...dayOfMonthOptions]}
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.bimonthly2}
                              isDisabled={isSubmitting}
                            />
                          )}
                        />
                      </div>
                    </>
                  )}

                  {/* Monthly */}
                  {selectedType === "monthly" && (
                    <div className="col-span-1">
                      <Controller
                        name="monthly"
                        control={control}
                        render={({ field }) => (
                          <SingleSelect
                            id="monthly"
                            label="Day of Month"
                            required
                            showSearch={false}
                            options={[...dayOfMonthOptions]}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.monthly}
                            isDisabled={isSubmitting}
                          />
                        )}
                      />
                    </div>
                  )}

                  {/* Two Months */}
                  {selectedType === "twomonths" && (
                    <>
                      <div className="col-span-1">
                        <Controller
                          name="startingMonth1"
                          control={control}
                          render={({ field }) => (
                            <SingleSelect
                              id="startingMonth1"
                              label="Starting Month"
                              required
                              showSearch={false}
                              options={[...monthOptions]}
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.startingMonth1}
                              isDisabled={isSubmitting}
                            />
                          )}
                        />
                      </div>
                      <div className="col-span-1">
                        <Controller
                          name="dayofMonth1"
                          control={control}
                          render={({ field }) => (
                            <SingleSelect
                              id="dayofMonth1"
                              label="Day of Month"
                              required
                              showSearch={false}
                              options={[...dayOfMonthOptions]}
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.dayofMonth1}
                              isDisabled={isSubmitting}
                            />
                          )}
                        />
                      </div>
                    </>
                  )}

                  {/* Quarterly */}
                  {selectedType === "quarterly" && (
                    <>
                      <div className="col-span-1">
                        <Controller
                          name="startingMonth2"
                          control={control}
                          render={({ field }) => (
                            <SingleSelect
                              id="startingMonth2"
                              label="Starting Month"
                              required
                              showSearch={false}
                              options={monthOptions}
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.startingMonth2}
                              isDisabled={isSubmitting}
                            />
                          )}
                        />
                      </div>
                      <div className="col-span-1">
                        <Controller
                          name="dayofMonth2"
                          control={control}
                          render={({ field }) => (
                            <SingleSelect
                              id="dayofMonth2"
                              label="Day of Month"
                              required
                              showSearch={false}
                              options={[...dayOfMonthOptions]}
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.dayofMonth2}
                              isDisabled={isSubmitting}
                            />
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <TextInput
                    name="taxID"
                    label="Tax ID / VAT or SSN"
                    register={register}
                    errors={errors}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="w-1/2">
                  <NumberInput
                    name="taxParentage"
                    label="Tax Parentage"
                    register={register}
                    type="number"
                    errors={errors}
                    required
                    iconR={MdOutlinePercent}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <SectionDivider label="Auto Invoicing" />
              <div>
                <Controller
                  name="automaticInvoiceCreation"
                  control={control}
                  render={({ field }) => (
                    <>
                      <ToggleSwitch
                        size="lg"
                        label="Automatic Invoice Creation"
                        checked={field.value ?? false}
                        onChange={field.onChange}
                        disabled={isSubmitting || isLoading}
                      />
                      {field.value && (
                        <>
                          <div className="lg:flex flex-col gap-5 mt-5">
                            <div className="lg:w-1/2 w-full">
                              <Controller
                                name="invoiceGen"
                                control={control}
                                render={({ field }) => (
                                  <SingleSelect
                                    id="invoiceGen"
                                    label="Invoice Generation Days Delay"
                                    required
                                    showSearch={false}
                                    options={invoiceOption}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.invoiceGen}
                                    isDisabled={isSubmitting}
                                  />
                                )}
                              />
                            </div>
                            <div className="lg:w-1/2 w-full">
                              <NumberInput
                                name="autoInvoiceAmountThreshold"
                                label="Auto Invoice Creation Amount Threshold"
                                register={register}
                                type="number"
                                errors={errors}
                                required
                                iconR={BsCurrencyDollar}
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>
                          <div className="mt-5">
                            <DatePickerWrapper
                              mode="single"
                              label="Select a Date"
                              placeholder="Click to select a date"
                              value={selectedDate}
                              onChange={(date) => setSelectedDate(date as Date)}
                              showApplyCancel={true}
                              minDate={new Date(2025, 0, 1)}
                              maxDate={new Date(2025, 11, 31)}
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                />
              </div>
              <SectionDivider label="Default Invoice Settings" />
              <div className="w-1/2">
                <Controller
                  name="paymentTerms"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      id="paymentTerms"
                      label="Payment Terms"
                      required
                      showSearch={false}
                      options={paymentTermsOptions}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.invoiceGen}
                      isDisabled={isSubmitting}
                    />
                  )}
                />
                <ToggleSwitch
                  size="lg"
                  labelClassName="mt-2"
                  label="Hide Invoices from partners"
                  checked={watch("hideInvoicesFromPartners") ?? false}
                  onChange={(val) => setValue("hideInvoicesFromPartners", val)}
                  disabled={isSubmitting}
                />
              </div>
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

export default AdvertiserBilling;
