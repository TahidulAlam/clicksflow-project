"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/shared/forms/TextInput";
import ImageUploader from "@/components/shared/forms/ImageUploader";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import TagsInput from "@/components/shared/forms/TagsInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";

interface SeoSettingsProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}
const metaKeywordsOptions = [
  { value: "clicksflow", label: "ClicksFlow" },
  { value: "revsBill", label: "RevsBill" },
];
const schema = z.object({
  siteTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  socialDescription: z.string().min(1),
  metaKeywords: z.array(z.string()).optional(),
  image: z.union([z.instanceof(File), z.string().optional()]),
});

type FormType = z.infer<typeof schema>;

const SeoSettings: React.FC<SeoSettingsProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      siteTitle: "",
      metaDescription: "",
      socialDescription: "",
      metaKeywords: metaKeywordsOptions.map((option) => option.value),
      image: "/woocommerce-large.png",
    },
  });

  const {
    // register,
    // setValue,
    watch,
    reset,
    // formState: { errors, isSubmitting },
    formState: { isSubmitting },
  } = methods;

  const image = watch("image");
  // const [inputValue, setInputValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof image === "string") {
      setImagePreview(image);
    }
  }, [image]);
  const handleSubmit = async (data: FormType) => {
    console.log("Referral Settings Data:", data);
    onSubmitSuccess?.();
  };
  return (
    <Container maxWidth="full">
      <FormArea
        schema={schema}
        defaultValues={methods.getValues()}
        onSubmit={handleSubmit}
      >
        {() => (
          <>
            <div className="grid lg:grid-cols-8 grid-cols-1 gap-4 mt-4">
              <div className="col-span-2">
                <ImageUploader
                  name="image"
                  label="Upload Image"
                  // register={register}
                  // setValue={setValue}
                  imagePreview={imagePreview}
                  // errors={errors}
                />
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-2">
                  <TagsInput
                    name="metaKeywords"
                    label="Meta Keywords"
                    // tags={watch("metaKeywords") || []}
                    // setTags={(newTags) => setValue("metaKeywords", newTags)}
                    suggestions={metaKeywordsOptions}
                    // inputValue={inputValue}
                    // setInputValue={setInputValue}
                    labelSpan
                  />
                  <TextAreaInput
                    name="metaDescription"
                    label="Meta Description"
                    // register={register}
                    // errors={errors}
                    required
                    defaultValue=""
                    rows={3}
                    disabled={isSubmitting || isLoading}
                  />
                  <TextInput
                    name="siteTitle"
                    label="Site Title"
                    // register={register}
                    // errors={errors}
                    required
                  />
                  <TextAreaInput
                    name="socialDescription"
                    label="Social Description"
                    // register={register}
                    // errors={errors}
                    required
                    defaultValue=""
                    rows={3}
                    disabled={isSubmitting || isLoading}
                  />
                </div>
              </div>
            </div>
            <FormActions isSubmitting={isSubmitting} onCancel={() => reset()} />
          </>
        )}
      </FormArea>
    </Container>
  );
};

export default SeoSettings;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import Container from "@/components/shared/container/Container";
// import FormArea from "@/components/shared/forms/FormArea";
// import FormActions from "@/components/shared/forms/FormActions";
// import TextInput from "@/components/shared/forms/TextInput";
// import TextAreaInput from "@/components/shared/forms/TextAreaInput";
// import TagsInput from "@/components/shared/forms/TagsInput";
// import ImageUploader from "@/components/shared/forms/ImageUploader";

// const metaKeywordsOptions = [
//   { value: "clicksflow", label: "ClicksFlow" },
//   { value: "revsBill", label: "RevsBill" },
// ];

// const schema = z.object({
//   siteTitle: z.string().min(1, "Site Title is required"),
//   metaDescription: z.string().min(1, "Meta Description is required"),
//   socialDescription: z.string().min(1, "Social Description is required"),
//   metaKeywords: z.array(z.string()).default([]),
//   image: z.union([z.instanceof(File), z.string()]).optional(),
// });

// type FormType = z.infer<typeof schema>;

// const SeoSettings = () => {
//   const methods = useForm<FormType>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       siteTitle: "",
//       metaDescription: "",
//       socialDescription: "",
//       metaKeywords: metaKeywordsOptions.map((item) => item.value),
//       image: "/woocommerce-large.png",
//     },
//   });

//   const {
//     control,
//     watch,
//     reset,
//     formState: { isSubmitting },
//   } = methods;

//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [inputValue, setInputValue] = useState("");

//   const image = watch("image");

//   useEffect(() => {
//     if (image instanceof File) {
//       const url = URL.createObjectURL(image);
//       setImagePreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else if (typeof image === "string") {
//       setImagePreview(image);
//     }
//   }, [image]);

//   const handleSubmit = async (data: FormType) => {
//     console.log("Form Submitted:", data);
//   };

//   return (
//     <Container maxWidth="full">
//       <FormArea schema={schema} onSubmit={handleSubmit} methods={methods}>
//         {() => (
//           <>
//             <div className="grid lg:grid-cols-8 grid-cols-1 gap-4 mt-4">
//               <div className="col-span-2">
//                 <Controller
//                   name="image"
//                   control={control}
//                   render={({ field }) => (
//                     <ImageUploader
//                       name="image"
//                       label="Upload Image"
//                       value={field.value}
//                       onChange={field.onChange}
//                       imagePreview={imagePreview}
//                     />
//                   )}
//                 />
//               </div>
//               <div className="col-span-6 flex flex-col gap-4">
//                 <Controller
//                   name="metaKeywords"
//                   control={control}
//                   render={({ field }) => (
//                     <TagsInput
//                       label="Meta Keywords"
//                       tags={field.value || []}
//                       setTags={field.onChange}
//                       suggestions={metaKeywordsOptions}
//                       inputValue={inputValue}
//                       setInputValue={setInputValue}
//                     />
//                   )}
//                 />

//                 <TextAreaInput
//                   name="metaDescription"
//                   label="Meta Description"
//                   required
//                   rows={3}
//                 />

//                 <TextInput
//                   name="siteTitle"
//                   label="Site Title"
//                   required
//                 />

//                 <TextAreaInput
//                   name="socialDescription"
//                   label="Social Description"
//                   required
//                   rows={3}
//                 />
//               </div>
//             </div>

//             <FormActions
//               isSubmitting={isSubmitting}
//               onCancel={() => reset()}
//             />
//           </>
//         )}
//       </FormArea>
//     </Container>
//   );
// };

// export default SeoSettings;
