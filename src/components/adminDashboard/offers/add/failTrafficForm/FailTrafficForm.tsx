// "use client";

// import React from "react";
// import {
//   useForm,
//   FormProvider,
//   useFieldArray,
//   Controller,
// } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import RedirectCard from "./RedirectCard";
// import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
// import FlexRow from "@/components/shared/responsibeForm/FlexRow";
// import SectionDivider from "@/components/shared/SectionDivider";

// const failTrafficSchema = z.object({
//   enableRedirect: z.boolean(),
//   redirects: z
//     .array(
//       z.object({
//         partners: z.string().min(1, "Partners field is required"),
//         failReason: z.string().min(1, "Fail reason is required"),
//         destinationType: z.string().min(1, "Destination type is required"),
//         offer: z.string().min(1, "Offer is required"),
//         payPartner: z.boolean().optional(),
//         applyToAllPartners: z.boolean().optional(),
//       })
//     )
//     .nonempty("At least one redirect is required"),
// });

// type FailTrafficFormValues = z.infer<typeof failTrafficSchema>;

// const offerList = [
//   { label: "Offer A", value: "offerA" },
//   { label: "Offer B", value: "offerB" },
// ];

// export default function FailTrafficForm() {
//   const methods = useForm<FailTrafficFormValues>({
//     resolver: zodResolver(failTrafficSchema),
//     defaultValues: {
//       enableRedirect: false,
//       redirects: [],
//     },
//   });

//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "redirects",
//   });

//   const onSubmit = (data: FailTrafficFormValues) => {
//     console.log("Submitted Data:", data);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <Controller
//         control={control}
//         name="enableRedirect"
//         render={({ field }) => (
//           <>
//             <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }}>
//               <ToggleSwitch
//                 label="Block Proxy"
//                 checked={field.value}
//                 onChange={field.onChange}
//                 disabled={isSubmitting}
//                 aria-label="Block Proxy"
//               />
//               {field.value && (
//                 <>
//                   <SectionDivider label="Redirects" />
//                   <FormProvider {...methods}>
//                     <form
//                       onSubmit={handleSubmit(onSubmit)}
//                       className="space-y-6"
//                     >
//                       {fields.map((field, index) => (
//                         <RedirectCard
//                           key={field.id}
//                           index={index}
//                           offerOptions={offerList}
//                           onRemove={() => remove(index)}
//                           isSubmitting={isSubmitting}
//                         />
//                       ))}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           append({
//                             partners: "",
//                             failReason: "",
//                             destinationType: "",
//                             offer: "",
//                             payPartner: false,
//                             applyToAllPartners: false,
//                           })
//                         }
//                         className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg"
//                       >
//                         Add Redirect
//                       </button>

//                       <div className="mt-6 text-right">
//                         <button
//                           type="submit"
//                           className="bg-blue-950 text-white px-5 py-2 rounded hover:bg-blue-900 transition"
//                           disabled={isSubmitting}
//                         >
//                           Submit
//                         </button>
//                       </div>
//                     </form>
//                   </FormProvider>
//                 </>
//               )}
//             </FlexRow>
//           </>
//         )}
//       />
//     </div>
//   );
// }
"use client";

import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import RedirectCard from "./RedirectCard";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import SectionDivider from "@/components/shared/SectionDivider";
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import Container from "@/components/shared/container/Container";

// ✅ Schema
const failTrafficSchema = z.object({
  enableRedirect: z.boolean(),
  redirects: z
    .array(
      z.object({
        partners: z.string().min(1, "Partners field is required"),
        failReason: z.string().min(1, "Fail reason is required"),
        destinationType: z.string().min(1, "Destination type is required"),
        offer: z.string().min(1, "Offer is required"),
        payPartner: z.boolean().optional(),
        applyToAllPartners: z.boolean().optional(),
      })
    )
    .nonempty("At least one redirect is required"),
});

type FailTrafficFormValues = z.infer<typeof failTrafficSchema>;

interface FailTrafficFormProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

// ✅ Default redirect object
const defaultRedirect = {
  partners: "",
  failReason: "",
  destinationType: "",
  offer: "",
  payPartner: false,
  applyToAllPartners: false,
};

const offerList = [
  { label: "Offer A", value: "offerA" },
  { label: "Offer B", value: "offerB" },
];

const FailTrafficForm: React.FC<FailTrafficFormProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  // Top-level form
  const methods = useForm<FailTrafficFormValues>({
    resolver: zodResolver(failTrafficSchema),
    defaultValues: {
      enableRedirect: false,
      redirects: [],
    },
  });

  const { control, reset } = methods;

  // Field Array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "redirects",
  });

  const handleSubmit = (data: FailTrafficFormValues) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  // ✅ Extracted UI for redirects
  const renderRedirects = (isSubmitting: boolean) => (
    <>
      <SectionDivider label="Redirects" />

      {fields.map((item, index) => (
        <RedirectCard
          key={item.id}
          index={index}
          offerOptions={offerList}
          onRemove={() => remove(index)}
          isSubmitting={isSubmitting}
        />
      ))}
      <div>
        <button
          type="button"
          onClick={() => append(defaultRedirect)}
          className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg"
        >
          Add Redirect
        </button>
      </div>

      <FormActions
        isSubmitting={isSubmitting}
        isLoading={isLoading}
        onCancel={() => reset()}
      />
    </>
  );

  return (
    <Container>
      <FormArea
        schema={failTrafficSchema}
        onSubmit={handleSubmit}
        methods={methods}
        className="space-y-6"
      >
        {({ control, formState: { isSubmitting } }) => (
          <Controller
            control={control}
            name="enableRedirect"
            render={({ field }) => (
              <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 1 }}>
                <ToggleSwitch
                  label="Block Proxy"
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                  aria-label="Block Proxy"
                />

                {field.value && renderRedirects(isSubmitting)}
              </FlexRow>
            )}
          />
        )}
      </FormArea>
    </Container>
  );
};

export default FailTrafficForm;
