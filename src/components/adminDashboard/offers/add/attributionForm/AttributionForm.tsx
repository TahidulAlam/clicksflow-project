/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";

// import SingleSelect from "@/components/shared/dataTable/SingleSelect";
// import {
//   attributionFormSchema,
//   AttributionFormData,
// } from "./validationSchemas";
// import { attributionMethodOptions } from "./attributionOptions";
// import { ThrottleRateSection } from "./ThrottleRateSection";
// import { ConversionTimeSection } from "./ConversionTimeSection";
// import { EmailOwnershipSection } from "./EmailOwnershipSection";
// import { ViewThroughSection } from "./ViewThroughSection";
// import ServerSideClick from "./ServerSideClick";

// const AttributionForm = () => {
//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors, isSubmitting, isLoading },
//     register,
//   } = useForm<AttributionFormData>({
//     resolver: zodResolver(attributionFormSchema),
//     defaultValues: {
//       attributionMethod: "firstPartnerAttribution",
//     },
//   });

//   const onSubmit: SubmitHandler<AttributionFormData> = async (formData) => {
//     try {
//       console.log("Form Submitted:", formData);
//       reset();
//       toast.success("Settings saved successfully!");
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("Failed to save settings. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-lg font-semibold mb-4">
//         Fields with an asterisk ( * ) are mandatory
//       </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
//         <Controller
//           control={control}
//           name="attributionMethod"
//           render={({ field }) => (
//             <SingleSelect
//               id="attributionMethod"
//               label="Attribution Method"
//               showSearch={false}
//               required
//               options={attributionMethodOptions}
//               value={field.value}
//               onChange={field.onChange}
//               error={errors.attributionMethod}
//               isDisabled={isSubmitting || isLoading}
//               aria-required="true"
//             />
//           )}
//         />
//         {/* Apply Throttle Rate */}
//         <ThrottleRateSection
//           control={control}
//           errors={errors}
//           isSubmitting={isSubmitting}
//           isLoading={isLoading}
//           register={register}
//         />
//         {/* Enable Click to Conversion Time */}
//         <ConversionTimeSection
//           control={control}
//           errors={errors}
//           isSubmitting={isSubmitting}
//           isLoading={isLoading}
//           register={register}
//         />
//         {/* Enable Email Ownership */}
//         <EmailOwnershipSection
//           control={control}
//           errors={errors}
//           isSubmitting={isSubmitting}
//           isLoading={isLoading}
//         />
//         {/* Enable View-Through */}
//         <ViewThroughSection
//           control={control}
//           errors={errors}
//           isSubmitting={isSubmitting}
//           isLoading={isLoading}
//         />
//         <ServerSideClick
//           control={control}
//           errors={errors}
//           isSubmitting={isSubmitting}
//           isLoading={isLoading}
//         />
//         <div className="flex justify-end mt-6">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-sky-950 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             disabled={isSubmitting || isLoading}
//             aria-label="Submit form"
//           >
//             {isSubmitting || isLoading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AttributionForm;

"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
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
import z from "zod";
import Container from "@/components/shared/container/Container";

type FormType = z.infer<typeof attributionFormSchema>;

interface AttributionFormProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}
const AttributionForm: React.FC<AttributionFormProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Referral Settings Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={attributionFormSchema}
        defaultValues={{
          attributionMethod: "firstPartnerAttribution",
          applyThrottleRate: false,
          throttleRate: 0,
          conversionStatus: false,
          conversionTime: false,
          enableMaxEmail: false,
          emailAttributionMethod: "lastClick",
          maxEmailAttributionWindowType: "hour",
          maxEmailAttributionWindow: "0",
          enableViewThrough: false,

          viewThroughDestinationURL: "",
          enableServerSideClick: false,
          maxLookbackWindow: false,
          minLookbackWindow: false,
          enableViewThroughLookbackWindow: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            control,
            register,
            setValue,
            watch,
            formState: { errors, isSubmitting, isLoading },
            reset,
          } = methods;

          return (
            <>
              <SingleSelect
                id="attributionMethod"
                label="Attribution Method"
                showSearch={false}
                required
                options={attributionMethodOptions}
                value={watch("attributionMethod")}
                onChange={(val) => setValue("attributionMethod", val)}
                error={errors.attributionMethod}
                isDisabled={isSubmitting || isLoading}
                aria-required="true"
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

              {/* Enable Server-Side Click */}
              <ServerSideClick
                control={control}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
              />

              {/* Form actions */}
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => reset()}
                // submitLabel="Save Settings"
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default AttributionForm;
