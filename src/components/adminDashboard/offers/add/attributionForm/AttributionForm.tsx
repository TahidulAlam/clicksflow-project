"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import {
  attributionFormSchema,
  AttributionFormData,
} from "./validationSchemas";
import { attributionMethodOptions } from "./attributionOptions";
import { ThrottleRateSection } from "./ThrottleRateSection";
import { ConversionTimeSection } from "./ConversionTimeSection";
import { EmailOwnershipSection } from "./EmailOwnershipSection";
import { ViewThroughSection } from "./ViewThroughSection";
import ServerSideClick from "./ServerSideClick";

const AttributionForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isLoading },
    register,
  } = useForm<AttributionFormData>({
    resolver: zodResolver(attributionFormSchema),
    defaultValues: {
      attributionMethod: "firstPartnerAttribution",
    },
  });

  const onSubmit: SubmitHandler<AttributionFormData> = async (formData) => {
    try {
      console.log("Form Submitted:", formData);
      reset();
      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to save settings. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-lg font-semibold mb-4">
        Fields with an asterisk ( * ) are mandatory
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <Controller
          control={control}
          name="attributionMethod"
          render={({ field }) => (
            <SingleSelect
              id="attributionMethod"
              label="Attribution Method"
              showSearch={false}
              required
              options={attributionMethodOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.attributionMethod}
              isDisabled={isSubmitting || isLoading}
              aria-required="true"
            />
          )}
        />
        {/* Apply Throttle Rate */}
        <ThrottleRateSection
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          register={register}
        />
        {/* Enable Click to Conversion Time */}
        <ConversionTimeSection
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          register={register}
        />
        {/* Enable Email Ownership */}
        <EmailOwnershipSection
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
        />
        {/* Enable View-Through */}
        <ViewThroughSection
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
        />
        <ServerSideClick
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
        />
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-sky-950 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting || isLoading}
            aria-label="Submit form"
          >
            {isSubmitting || isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttributionForm;
