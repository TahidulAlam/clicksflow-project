// "use client";

// import React from "react";
// import { z } from "zod";
// import dynamic from "next/dynamic";
// import { Controller } from "react-hook-form";
// import FormActions from "@/components/shared/forms/FormActions";
// import FormArea from "@/components/shared/forms/FormArea";
// import Container from "@/components/shared/container/Container";

// // import EmailTextEditor from "@/components/shared/richTextEditor/EmailTextEditor";

// const EmailTextEditor = dynamic(() => import("@/components/shared/richTextEditor/EmailTextEditor"), {
//   ssr: false,
// });

// import BoxAccordion, {
//   BoxContent,
//   BoxHeader,
// } from "@/components/shared/boxAccordion/BoxAccordion";
// import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
// import TextInput from "@/components/shared/forms/TextInput";
// type ShortCode = {
//   code: string;
//   description: string;
// };

// type ShortCodeGroup = {
//   title: string;
//   codes: ShortCode[];
// };

// type ShortCodeTableProps = {
//   groups: ShortCodeGroup[];
// };
// // import RichTextEditor from "@/components/shared/richTextEditor/RichTextEditor";

// const EmailTemplateEditSchema = z.object({
//   subject: z.string().min(1, "Subject is required"),
//   body: z.string().min(1, "Body is required"),
//   isStatus: z.boolean().optional(),
// });

// type FormType = z.infer<typeof EmailTemplateEditSchema>;

// interface EmailTemplateEditProps {
//   onSubmitSuccess?: () => void;
//   isLoading?: boolean;
// }

// const EmailTemplateEdit: React.FC<EmailTemplateEditProps> = ({
//   onSubmitSuccess,
//   isLoading = false,
// }) => {
//   const handleSubmit = async (data: FormType) => {
//     console.log("Email Template Data:", data);
//     onSubmitSuccess?.();
//   };

//   return (
//     <Container maxWidth="full">
//       <div className="space-y-6">
//       {groups.map((group, idx) => (
//         <div
//           key={idx}
//           className="border border-gray-300 rounded-md overflow-hidden"
//         >
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="text-left px-4 py-2 font-semibold">
//                   {group.title}
//                 </th>
//                 <th className="text-left px-4 py-2 font-semibold">
//                   Description
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {group.codes.map((code, i) => (
//                 <tr
//                   key={i}
//                   className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                 >
//                   <td className="px-4 py-2 font-mono">{code.code}</td>
//                   <td className="px-4 py-2">{code.description}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//       <FormArea
//         schema={EmailTemplateEditSchema}
//         formHeaderShow={false}
//         defaultValues={{
//           subject: "Password Reset Request",
//           isStatus: false,
//           body: "<p>Hello, start typing your email...</p>",
//         }}
//         onSubmit={handleSubmit}
//       >
//         {(methods) => {
//           const {
//             // register,
//             control,
//             reset,
//             formState: { errors, isSubmitting },
//           } = methods;

//           return (
//             <>
//               <BoxAccordion collapsible={false}>
//                 <BoxHeader
//                   className="bg-blue-950 text-white"
//                   collapsible={false}
//                 >
//                   Email Template
//                 </BoxHeader>
//                 <BoxContent>
//                   <div className="grid grid-cols-2 gap-2 mb-2">
//                     <TextInput
//                       name="subject"
//                       label="Subject"
//                       required
//                       disabled={isSubmitting || isLoading}
//                       defaultValue="Password Reset Request"
//                     />
//                     <ToggleSwitch
//                       size="lg"
//                       label="Status"
//                       name="isStatus"
//                       className="gap-2"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <Controller
//                       name="body"
//                       control={control}
//                       render={({ field }) => (
//                         <EmailTextEditor
//                           value={field.value}
//                           onChange={(html) => field.onChange(html)}
//                           placeholder="Start typing your email..."
//                           maxLength={5000}
//                           autoFocus
//                         />
//                       )}
//                     />
//                     {errors.body && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.body.message}
//                       </p>
//                     )}
//                   </div>
//                 </BoxContent>
//               </BoxAccordion>
//               {/* Form Actions */}
//               <FormActions
//                 isSubmitting={isSubmitting}
//                 isLoading={isLoading}
//                 onCancel={() => {
//                   reset();
//                 }}
//               />
//             </>
//           );
//         }}
//       </FormArea>
//     </Container>
//   );
// };

// export default EmailTemplateEdit;

"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import Container from "@/components/shared/container/Container";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import TextInput from "@/components/shared/forms/TextInput";

const EmailTextEditor = dynamic(
  () => import("@/components/shared/richTextEditor/EmailTextEditor"),
  { ssr: false }
);

type ShortCode = {
  code: string;
  description: string;
};

type ShortCodeGroup = {
  title: string;
  codes: ShortCode[];
};

const EmailTemplateEditSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  isStatus: z.boolean().optional(),
});

type FormType = z.infer<typeof EmailTemplateEditSchema>;

interface EmailTemplateEditProps {
  templateId: string;
  initialData: FormType & { shortcodeGroups?: ShortCodeGroup[] };
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const EmailTemplateEdit: React.FC<EmailTemplateEditProps> = ({
  templateId,
  initialData,
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [groups, setGroups] = useState<ShortCodeGroup[]>([]);

  useEffect(() => {
    if (initialData?.shortcodeGroups) {
      setGroups(initialData.shortcodeGroups);
    }
  }, [initialData]);

  const handleSubmit = async (data: FormType) => {
    console.log("Saving Email Template:", { id: templateId, ...data });
    // TODO: call your API here with PUT/PATCH
    onSubmitSuccess?.();
  };

  return (
    <Container maxWidth="full">
      {groups.length > 0 && (
        <div className="space-y-6 mb-6">
          {groups.map((group, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-md overflow-hidden"
            >
              <div className="w-full border-collapse">
                <div>
                  <div className="bg-gray-100 flex justify-between">
                    <div className="text-left px-4 py-2 font-semibold">
                      {group.title}
                    </div>
                    <div className="text-left px-4 py-2 font-semibold">
                      Description
                    </div>
                  </div>
                </div>
                <div className="">
                  {group.codes.map((code, i) => (
                    <div
                      key={i}
                      className={
                        i % 2 === 0
                          ? "bg-white grid grid-cols-2"
                          : "bg-gray-50 grid grid-cols-2"
                      }
                    >
                      <div className="px-4 py-2 font-mono text-start">
                        {code.code}
                      </div>
                      <div className="px-4 py-2 text-end">
                        {code.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main form */}
      <FormArea
        schema={EmailTemplateEditSchema}
        formHeaderShow={false}
        defaultValues={{
          subject: initialData.subject,
          isStatus: initialData.isStatus ?? false,
          body: initialData.body,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            control,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <BoxAccordion collapsible={false}>
                <BoxHeader
                  className="bg-blue-950 text-white"
                  collapsible={false}
                >
                  Email Template
                </BoxHeader>
                <BoxContent>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <TextInput
                      name="subject"
                      label="Subject"
                      required
                      disabled={isSubmitting || isLoading}
                    />
                    <ToggleSwitch
                      size="lg"
                      label="Status"
                      name="isStatus"
                      className="gap-2"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="mb-4">
                    <Controller
                      name="body"
                      control={control}
                      render={({ field }) => (
                        <EmailTextEditor
                          value={field.value}
                          onChange={(html) => field.onChange(html)}
                          placeholder="Start typing your email..."
                          maxLength={5000}
                          autoFocus
                        />
                      )}
                    />
                    {errors.body && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.body.message}
                      </p>
                    )}
                  </div>
                </BoxContent>
              </BoxAccordion>

              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() =>
                  reset({
                    subject: initialData.subject,
                    isStatus: initialData.isStatus ?? false,
                    body: initialData.body,
                  })
                }
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default EmailTemplateEdit;
