// "use client";

// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ZodTypeAny, z } from "zod";
// import FormButtons from "./FormButtons";

// type FormRenderProps<T extends z.ZodTypeAny> = {
//   methods: ReturnType<typeof useForm<z.infer<T>>>;
// };

// export interface FormBodyProps<T extends ZodTypeAny> {
//   schema: T;
//   defaultValues: z.infer<T>;
//   onSubmit: SubmitHandler<z.infer<T>>;
//   children: (props: FormRenderProps<T>) => React.ReactNode;
//   className?: string;

//   // New Props
//   showButtons?: boolean;
//   onCancel?: () => void;
//   isSubmitting?: boolean;
//   isLoading?: boolean;
//   submitLabel?: string;
//   cancelLabel?: string;
// }

// const FormBody = <T extends ZodTypeAny>({
//   schema,
//   defaultValues,
//   onSubmit,
//   children,
//   className = "flex flex-col gap-6",

//   showButtons = false,
//   onCancel,
//   isSubmitting = false,
//   isLoading = false,
//   submitLabel = "Continue",
//   cancelLabel = "Cancel",
// }: FormBodyProps<T>) => {
//   const methods = useForm<z.infer<T>>({
//     resolver: zodResolver(schema),
//     defaultValues,
//   });

//   return (
//     <form
//       onSubmit={methods.handleSubmit(onSubmit)}
//       className={className}
//       noValidate
//     >
//       <span className="text-xs text-gray-600">
//         <span className="bg-blue-950 py-0.5 font-serif text-[10px] px-[6px] rounded-full text-white">
//           i
//         </span>{" "}
//         Fields with an asterisk (<span className="text-red-600">*</span>) are
//         mandatory
//       </span>

//       {children(methods)}

//       {showButtons && (
//         <FormButtons
//           isSubmitting={isSubmitting}
//           isLoading={isLoading}
//           onCancel={onCancel || (() => methods.reset())}
//           submitLabel={submitLabel}
//           cancelLabel={cancelLabel}
//         />
//       )}
//     </form>
//   );
// };

// export default FormBody;
