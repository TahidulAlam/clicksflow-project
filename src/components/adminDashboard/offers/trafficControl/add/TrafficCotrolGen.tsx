"use client";
import React, { useState } from "react";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import { z } from "zod";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import FormActions from "@/components/shared/forms/FormActions";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import { Controller } from "react-hook-form";
import DatePickerWrapper from "@/components/shared/calender/DatePickerWrapper";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";

const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "inactive", label: "Deleted", dotColor: "bg-red-500" },
];

const advertiserOptions = [
  { value: "offer", label: "Offer" },
  { value: "advertiser", label: "Advertiser" },
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.string().min(1, "Status is required"),
  trackingDomain: z.string().min(1, "Tracking Domain is required"),
  forceSSL: z.boolean().optional(),
  showtoPartners: z.boolean().optional(),
  effectiveBetween: z.boolean().optional(),
  advertisers: z.boolean().optional(),
  offers: z.string().optional(),
  offer: z.string().optional(),
  advertiser: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type FormType = z.infer<typeof schema>;

interface TrafficControlGenProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const TrafficControlGen: React.FC<TrafficControlGenProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [tempRange, setTempRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data, tempRange);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          name: "",
          status: "",
          trackingDomain: "",
          forceSSL: false,
          showtoPartners: false,
          effectiveBetween: false,
          advertisers: true,
          tags: [],
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            watch,
            setValue,
            reset,
            control,
            formState: { errors, isSubmitting },
          } = methods;

          const selectedOffers = watch("offers");

          return (
            <>
              <TextInput
                name="name"
                label="Name"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting}
              />

              <TextInput
                name="trackingDomain"
                label="Tracking Domain"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting}
              />

              <StatusSelector
                label="Status"
                fieldName="status"
                setValue={setValue}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                options={visibilityStatus}
              />

              <Controller
                name="effectiveBetween"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleSwitch
                      size="lg"
                      label="Effective Between"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      disabled={isSubmitting || isLoading}
                    />
                    {field.value && (
                      <DatePickerWrapper
                        mode="range"
                        label="Conference Dates"
                        placeholder="Select start and end dates"
                        value={range}
                        onChange={(date) =>
                          Array.isArray(date) && setTempRange(date)
                        }
                        onApply={(confirmedRange) => {
                          setRange(confirmedRange as [Date, Date]);
                        }}
                        onCancel={() => setTempRange(range)}
                        showApplyCancel
                        monthsShown={2}
                      />
                    )}
                  </>
                )}
              />

              <Controller
                name="advertisers"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleSwitch
                      size="lg"
                      label="Apply to all Offers/Advertisers"
                      checked={field.value ?? true}
                      onChange={(checked) => {
                        field.onChange(checked);
                        if (checked) {
                          setValue("offers", undefined);
                          setValue("offer", undefined);
                          setValue("advertiser", undefined);
                        }
                      }}
                      disabled={isSubmitting || isLoading}
                    />

                    {!field.value && (
                      <>
                        <SingleSelect
                          id="offers"
                          label="Offers"
                          required
                          showSearch={false}
                          options={advertiserOptions}
                          value={selectedOffers}
                          onChange={(val) => {
                            setValue("offers", val);
                            setValue("offer", "");
                            setValue("advertiser", "");
                          }}
                          error={errors.offers}
                          isDisabled={isSubmitting}
                        />

                        {selectedOffers === "offer" && (
                          <TextInput
                            name="offer"
                            label="Offer"
                            register={register}
                            errors={errors}
                            required
                            disabled={isSubmitting}
                          />
                        )}

                        {selectedOffers === "advertiser" && (
                          <TextInput
                            name="advertiser"
                            label="Advertiser"
                            register={register}
                            errors={errors}
                            required
                            disabled={isSubmitting}
                          />
                        )}
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

export default TrafficControlGen;
