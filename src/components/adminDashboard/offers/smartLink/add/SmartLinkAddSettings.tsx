// "use client";

// import React from "react";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import Container from "@/components/shared/container/Container";
// import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
// // import TextInput from "@/components/shared/forms/TextInput";
// import SingleSelect from "@/components/shared/dataTable/SingleSelect";

// const offerOptions = [
//   { value: "health", label: "Health" },
//   { value: "bizzOpp", label: "Bizz Opp" },
//   { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
// ];

// // Schema definition including all used fields
// export const formSchema = z.object({
//   projectid: z
//     .string()
//     .min(2, "Project ID must be at least 2 characters")
//     .max(50),
//   catchAllOffer: z.boolean().optional(),
//   offer: z.string().optional(),
// });

// export type FormData = z.infer<typeof formSchema>;

// interface SmartLinkAddSettingsProps {
//   onSubmitSuccess?: () => void;
//   isLoading?: boolean;
// }

// const SmartLinkAddSettings: React.FC<SmartLinkAddSettingsProps> = ({
//   onSubmitSuccess,
//   isLoading = false,
// }) => {
//   const {
//     // register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     control,
//     // watch,
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       projectid: "",
//       catchAllOffer: false,
//       offer: "",
//     },
//   });

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     try {
//       console.log("Form submitted:", data);
//       reset();
//       onSubmitSuccess?.();
//     } catch (error) {
//       console.error("Submission failed:", error);
//     }
//   };

//   // const applyThrottleRate = watch("catchAllOffer");

//   return (
//     <Container>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-6"
//         noValidate
//       >
//         <span className="text-xs">
//           Fields with an asterisk (<span className="text-red-700">*</span>) are
//           required
//         </span>

//         <Controller
//           control={control}
//           name="catchAllOffer"
//           render={({ field }) => (
//             <>
//               <div className="flex">
//                 <div className="w-1/4">
//                   <ToggleSwitch
//                     size="lg"
//                     label="Catch-All Offer"
//                     checked={field.value ?? false}
//                     onChange={field.onChange}
//                     disabled={isSubmitting || isLoading}
//                     aria-label="Catch-All Offer"
//                   />
//                 </div>
//                 <div className="w-3/4">
//                   {field.value && (
//                     <Controller
//                       control={control}
//                       name="offer"
//                       render={({ field }) => (
//                         <SingleSelect
//                           id="offer"
//                           label="Conversion Status"
//                           // showSearch={false}
//                           required
//                           placeholder="Select one"
//                           options={offerOptions}
//                           value={field.value ?? ""}
//                           onChange={field.onChange}
//                           error={errors.offer}
//                           isDisabled={isSubmitting || isLoading}
//                           aria-required="true"
//                         />
//                       )}
//                     />
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         />
//       </form>
//     </Container>
//   );
// };

// export default SmartLinkAddSettings;
"use client";

import React from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Container from "@/components/shared/container/Container";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormActions from "@/components/shared/forms/FormActions";

const offerOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

const offerEntrySchema = z.object({
  offer: z.string().optional(),
  offerUrl: z.string().optional(),
});

const formSchema = z.object({
  projectid: z
    .string()
    .min(2, "Project ID must be at least 2 characters")
    .max(50),
  catchAllOffer: z.boolean().optional(),
  offer: z.string().optional(),
  offers: z.array(offerEntrySchema).optional(),
});

export type FormData = z.infer<typeof formSchema>;

interface SmartLinkAddSettingsProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const SmartLinkAddSettings: React.FC<SmartLinkAddSettingsProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectid: "",
      catchAllOffer: false,
      offer: "",
      offers: [{ offer: "", offerUrl: "" }],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "offers",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Form submitted:", data);
      reset();
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <span className="text-xs">
          Fields with an asterisk (<span className="text-red-700">*</span>) are
          required
        </span>

        {/* Catch-All Offer Toggle */}
        <Controller
          control={control}
          name="catchAllOffer"
          render={({ field }) => (
            <div className="flex">
              <div className="w-1/4">
                <ToggleSwitch
                  size="lg"
                  label="Catch-All Offer"
                  checked={field.value ?? false}
                  onChange={field.onChange}
                  disabled={isSubmitting || isLoading}
                  aria-label="Catch-All Offer"
                />
              </div>
              <div className="w-3/4 z-50">
                {field.value && (
                  <Controller
                    control={control}
                    name="offer"
                    render={({ field }) => (
                      <SingleSelect
                        id="offer"
                        label="Conversion Status"
                        required
                        placeholder="Select one"
                        options={offerOptions}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        error={errors.offer}
                        isDisabled={isSubmitting || isLoading}
                        aria-required="true"
                      />
                    )}
                  />
                )}
              </div>
            </div>
          )}
        />

        <div className="p-2 ">
          <table className="w-full border border-gray-300 text-sm text-left border-separate border-spacing-0 rounded-md">
            <thead className="bg-gray-100 ">
              <tr>
                <th className="px-2 py-2 text-xs">Allocation</th>
                <th className="px-2 py-2 text-xs">Offer</th>
                <th className="px-2 py-2 text-xs">Offer Url</th>
                <th className="px-2 py-2 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="border-t border-t-gray-300">
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">
                    <Controller
                      control={control}
                      name={`offers.${index}.offer`}
                      render={({ field }) => (
                        <SingleSelect
                          id="offer"
                          placeholder="Select one"
                          options={offerOptions}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          isDisabled={isSubmitting}
                        />
                      )}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <Controller
                      control={control}
                      name={`offers.${index}.offerUrl`}
                      render={({ field }) => (
                        <SingleSelect
                          id="offer"
                          placeholder="Select one"
                          options={offerOptions}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          isDisabled={isSubmitting}
                        />
                      )}
                    />
                  </td>
                  <td className="flex items-center py-2 gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, index - 1)}
                      disabled={index === 0}
                      className="border px-3 py-1 rounded bg-white text-blue-700"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, index + 1)}
                      disabled={index === fields.length - 1}
                      className="border px-3 py-1 rounded bg-white text-blue-700"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="border px-3 py-1 rounded bg-white text-red-700"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add New Button */}
          <button
            type="button"
            onClick={() => append({ offer: "", offerUrl: "" })}
            className="mt-2 px-4 py-1 border border-gray-300 rounded bg-white text-sm"
          >
            Add new
          </button>
        </div>

        <FormActions
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          onCancel={() => reset()}
        />
      </form>
    </Container>
  );
};

export default SmartLinkAddSettings;
