/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import React from "react";
// import {
//   useForm,
//   FormProvider,
//   SubmitHandler,
//   UseFormReturn,
// } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z, ZodTypeAny } from "zod";

// export interface FormAreaProps<T extends ZodTypeAny> {
//   schema: T;
//   defaultValues?: z.infer<T>;
//   onSubmit: SubmitHandler<z.infer<T>>;
//   children: (methods: UseFormReturn<z.infer<T>>) => React.ReactNode;
//   className?: string;
//   formHeaderShow?: boolean;
//   methods?: UseFormReturn<z.infer<T>>;
// }

// const FormArea = <T extends ZodTypeAny>({
//   schema,
//   defaultValues,
//   onSubmit,
//   children,
//   className = "flex flex-col gap-6",
//   formHeaderShow = true,
//   methods,
// }: FormAreaProps<T>) => {
//   const internalMethods = useForm<z.infer<T>>({
//     resolver: zodResolver(schema),
//     defaultValues: defaultValues as any,
//   });

//   const methodsToUse = methods || internalMethods;

//   return (
//     <FormProvider {...methodsToUse}>
//       <form
//         onSubmit={methodsToUse.handleSubmit(onSubmit)}
//         className={className}
//         noValidate
//       >
//         {formHeaderShow && (
//           <span className="text-xs text-gray-600">
//             <span className="bg-blue-950 py-0.5 font-serif text-[10px] px-[6px] rounded-full text-white">
//               i
//             </span>{" "}
//             Fields with an asterisk (<span className="text-red-600">*</span>)
//             are mandatory
//           </span>
//         )}
//         {children(methodsToUse)}
//       </form>
//     </FormProvider>
//   );
// };

// export default FormArea;

"use client";

import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodTypeAny } from "zod";

// Render props interface to match what children expects
export interface FormRenderProps<T extends ZodTypeAny> {
  methods: UseFormReturn<z.infer<T>, any, z.infer<T>>;
}

export interface FormAreaProps<T extends ZodTypeAny> {
  schema: T;
  defaultValues?: z.infer<T>;
  onSubmit: SubmitHandler<z.infer<T>>;
  children: (props: FormRenderProps<T>) => React.ReactNode;
  className?: string;
  formHeaderShow?: boolean;
  methods?: UseFormReturn<z.infer<T>, any, z.infer<T>>;
}

const FormArea = <T extends ZodTypeAny>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = "flex flex-col gap-6",
  formHeaderShow = true,
  methods,
}: FormAreaProps<T>) => {
  const internalMethods = useForm<z.infer<T>, any, z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const methodsToUse = methods ?? internalMethods;

  return (
    <FormProvider {...methodsToUse}>
      <form
        onSubmit={methodsToUse.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {formHeaderShow && (
          <span className="text-xs text-gray-600">
            <span className="bg-blue-950 py-0.5 font-serif text-[10px] px-[6px] rounded-full text-white">
              i
            </span>{" "}
            Fields with an asterisk (<span className="text-red-600">*</span>)
            are mandatory
          </span>
        )}

        {children({ methods: methodsToUse })}
      </form>
    </FormProvider>
  );
};

export default FormArea;
