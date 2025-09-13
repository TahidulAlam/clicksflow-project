// "use client";
// import React from "react";
// import { z } from "zod";
// import { useForm, FormProvider, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import Container from "@/components/shared/container/Container";
// import ImageInput from "@/components/shared/forms/ImageInput";
// import toast from "react-hot-toast";
// import TextAreaInput from "@/components/shared/forms/TextAreaInput";
// import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
// import FlexRow from "@/components/shared/responsibeForm/FlexRow";
// import ArrowLine from "@/components/shared/ArrowLine";

// const emailsFormSchema = z.object({
//   suppressionFile: z.string().min(1, "Suppression file is required"),
//   enableEmailInstructions: z.boolean().optional(),
//   enableEmailOptout: z.boolean().optional(),
//   subjectLines: z.string().optional(),
//   fromLines: z.string().optional(),
//   suppressionFileURL: z.string().optional(),
//   unsubscribeURL: z.string().optional(),
// });

// export type EmailFormData = z.infer<typeof emailsFormSchema>;

// const EmailsForm: React.FC = () => {
//   const methods = useForm<EmailFormData>({
//     resolver: zodResolver(emailsFormSchema),
//     defaultValues: {
//       suppressionFile: "",
//       enableEmailInstructions: false,
//       enableEmailOptout: false,
//       subjectLines: "",
//       fromLines: "",
//       suppressionFileURL: "",
//       unsubscribeURL: "",
//     },
//   });

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = methods;

//   const onSubmit = (data: EmailFormData) => {
//     console.log("Submitted data:", data);
//     toast.success("Form submitted successfully!");
//   };

//   return (
//     <Container>
//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <ImageInput
//             name="suppressionFile"
//             label="Suppression File"
//             register={register}
//             errors={errors}
//             required
//             disabled={isSubmitting}
//           />

//           <Controller
//             name="enableEmailInstructions"
//             control={control}
//             render={({ field }) => (
//               <>
//                 <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }} gap="0px">
//                   <ToggleSwitch
//                     label="Enable Email Instructions"
//                     checked={field.value ?? false}
//                     onChange={field.onChange}
//                     disabled={isSubmitting}
//                     aria-label="Enable Email Instructions"
//                   />
//                   {field.value && <ArrowLine />}
//                   {field.value && (
//                     <>
//                       <FlexRow
//                         cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
//                         className=" border border-gray-300 p-4 rounded-lg"
//                       >
//                         <TextAreaInput
//                           name="subjectLines"
//                           label="Subject Lines"
//                           rows={2}
//                           register={register}
//                           errors={errors}
//                           required
//                           disabled={isSubmitting}
//                         />

//                         <TextAreaInput
//                           name="fromLines"
//                           label="From Lines"
//                           rows={2}
//                           register={register}
//                           errors={errors}
//                           required
//                           disabled={isSubmitting}
//                         />
//                       </FlexRow>
//                     </>
//                   )}
//                 </FlexRow>
//               </>
//             )}
//           />
//           <Controller
//             name="enableEmailOptout"
//             control={control}
//             render={({ field }) => (
//               <>
//                 <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }} gap="0px">
//                   <ToggleSwitch
//                     label="Enable Email Opt-out"
//                     checked={field.value ?? false}
//                     onChange={field.onChange}
//                     disabled={isSubmitting}
//                     aria-label="Enable Email Opt-out"
//                   />
//                   {field.value && (
//                     // <div className="w-px relative h-8 bg-gray-300 py-4 ml-5" />
//                     <ArrowLine />
//                   )}
//                   {field.value && (
//                     <>
//                       <FlexRow
//                         cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
//                         className="border border-gray-300 p-4 rounded-lg"
//                       >
//                         <TextAreaInput
//                           name="suppressionFileURL"
//                           label="Suppression File URL"
//                           rows={2}
//                           register={register}
//                           errors={errors}
//                           required
//                           disabled={isSubmitting}
//                         />

//                         <TextAreaInput
//                           name="unsubscribeURL"
//                           label="Unsubscribe URL"
//                           rows={2}
//                           register={register}
//                           errors={errors}
//                           required
//                           disabled={isSubmitting}
//                         />
//                       </FlexRow>
//                     </>
//                   )}
//                 </FlexRow>
//               </>
//             )}
//           />

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-blue-950 text-white px-5 py-2 rounded hover:bg-blue-900 transition"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </FormProvider>
//     </Container>
//   );
// };

// export default EmailsForm;

"use client";

import React from "react";
import { z } from "zod";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

import Container from "@/components/shared/container/Container";
import ImageInput from "@/components/shared/forms/ImageInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import ArrowLine from "@/components/shared/ArrowLine";

import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";

// ✅ Schema
const emailsFormSchema = z.object({
  suppressionFile: z.string().min(1, "Suppression file is required"),
  enableEmailInstructions: z.boolean().optional(),
  enableEmailOptout: z.boolean().optional(),
  subjectLines: z.string().optional(),
  fromLines: z.string().optional(),
  suppressionFileURL: z.string().optional(),
  unsubscribeURL: z.string().optional(),
});

interface EmailsFormProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}
export type EmailFormData = z.infer<typeof emailsFormSchema>;

const EmailsForm: React.FC<EmailsFormProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleFormSubmit = (data: EmailFormData) => {
    console.log("Submitted data:", data);
    onSubmitSuccess?.();
    toast.success("Form submitted successfully!");
  };

  return (
    <Container>
      <FormArea
        schema={emailsFormSchema}
        defaultValues={{
          suppressionFile: "",
          enableEmailInstructions: false,
          enableEmailOptout: false,
          subjectLines: "",
          fromLines: "",
          suppressionFileURL: "",
          unsubscribeURL: "",
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          register,
          reset,
          control,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <ImageInput
              name="suppressionFile"
              label="Suppression File"
              register={register}
              errors={errors}
              required
              disabled={isSubmitting}
            />

            {/* Email Instructions */}
            <Controller
              name="enableEmailInstructions"
              control={control}
              render={({ field }) => (
                <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }} gap="0px">
                  <ToggleSwitch
                    label="Enable Email Instructions"
                    checked={field.value ?? false}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                  {field.value && <ArrowLine />}
                  {field.value && (
                    <FlexRow
                      cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                      className="border border-gray-300 p-4 rounded-lg"
                    >
                      <TextAreaInput
                        name="subjectLines"
                        label="Subject Lines"
                        rows={2}
                        register={register}
                        errors={errors}
                        required
                        disabled={isSubmitting}
                      />

                      <TextAreaInput
                        name="fromLines"
                        label="From Lines"
                        rows={2}
                        register={register}
                        errors={errors}
                        required
                        disabled={isSubmitting}
                      />
                    </FlexRow>
                  )}
                </FlexRow>
              )}
            />

            {/* Email Opt-out */}
            <Controller
              name="enableEmailOptout"
              control={control}
              render={({ field }) => (
                <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }} gap="0px">
                  <ToggleSwitch
                    label="Enable Email Opt-out"
                    checked={field.value ?? false}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                  {field.value && <ArrowLine />}
                  {field.value && (
                    <FlexRow
                      cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                      className="border border-gray-300 p-4 rounded-lg"
                    >
                      <TextAreaInput
                        name="suppressionFileURL"
                        label="Suppression File URL"
                        rows={2}
                        register={register}
                        errors={errors}
                        required
                        disabled={isSubmitting}
                      />

                      <TextAreaInput
                        name="unsubscribeURL"
                        label="Unsubscribe URL"
                        rows={2}
                        register={register}
                        errors={errors}
                        required
                        disabled={isSubmitting}
                      />
                    </FlexRow>
                  )}
                </FlexRow>
              )}
            />

            {/* Submit */}
            <FormActions
              isSubmitting={isSubmitting}
              isLoading={isLoading}
              onCancel={() => {
                reset();
              }}
            />
          </>
        )}
      </FormArea>
    </Container>
  );
};

export default EmailsForm;
