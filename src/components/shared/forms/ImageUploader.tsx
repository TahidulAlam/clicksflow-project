// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";
// import React, { useCallback } from "react";
// import Image from "next/image";
// import { ImUpload3 } from "react-icons/im";
// import {
//   UseFormRegister,
//   UseFormSetValue,
//   FieldErrors,
//   FieldValues,
//   Path,
// } from "react-hook-form";

// interface ImageUploaderProps<T extends FieldValues> {
//   name: Path<T>;
//   label?: string;
//   required?: boolean;
//   className?: string;
//   register: UseFormRegister<T>;
//   setValue: UseFormSetValue<T>;
//   imagePreview?: string | null;
//   errors: FieldErrors<T>;
// }

// function ImageUploader<T extends FieldValues>({
//   name,
//   label = "Upload Image",
//   register,
//   setValue,
//   className = "",
//   imagePreview,
//   required = false,
//   errors,
// }: ImageUploaderProps<T>) {
//   const handleFileChange = useCallback(
//     (file: File | null) => {
//       if (file) {
//         setValue(name, file as any, { shouldValidate: true });
//       }
//     },
//     [setValue, name]
//   );

//   const handleDrop = useCallback(
//     (e: React.DragEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       e.stopPropagation();
//       const file = e.dataTransfer.files?.[0];
//       handleFileChange(file);
//     },
//     [handleFileChange]
//   );

//   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   return (
//     <div className={`flex flex-col gap-2 w-full ${className}`}>
//       <label htmlFor={name} className="text-xs font-bold text-gray-800">
//         {label} {required && <span className="text-red-600">*</span>}
//       </label>

//       <div
//         className="w-full h-[250px] flex flex-col items-center justify-center relative border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           id={`file-upload-${String(name)}`}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
//           {...register(name)}
//           onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//         />

//         {!imagePreview && (
//           <div className="text-center pointer-events-none">
//             <h3 className="mt-2 text-sm font-medium text-gray-900">
//               <span>{label}</span>
//               <br />
//               <span className="text-indigo-600">Drag & drop</span> or{" "}
//               <span className="underline">browse</span>
//             </h3>
//             <p className="mt-1 text-xs text-gray-500">
//               PNG, JPG, GIF up to 10MB
//             </p>
//             <div className="mt-4 p-2 bg-[#1E3557] text-white rounded-md inline-flex items-center gap-2">
//               <ImUpload3 size={20} />
//               <span>Upload</span>
//             </div>
//           </div>
//         )}

//         {imagePreview && (
//           <div className="flex flex-col items-center">
//             <Image
//               src={imagePreview}
//               alt="Preview"
//               width={120}
//               height={120}
//               className="w-32 h-32 object-cover border rounded"
//             />
//           </div>
//         )}

//         {errors[name] && (
//           <p className="mt-2 text-xs text-red-500 text-center">
//             {String(errors[name]?.message)}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageUploader;

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { ImUpload3 } from "react-icons/im";
import {
  useFormContext,
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";

interface ImageUploaderProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  imagePreview?: string | null;

  // Optional props for controlled usage
  register?: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  errors?: FieldErrors<T>;
}

function ImageUploader<T extends FieldValues>({
  name,
  label = "Upload Image",
  className = "",
  imagePreview,
  required = false,
  register: registerProp,
  setValue: setValueProp,
  errors: errorsProp,
}: ImageUploaderProps<T>) {
  const context = useFormContext<T>();
  const register = registerProp ?? context?.register;
  const setValue = setValueProp ?? context?.setValue;
  const errors = errorsProp ?? context?.formState?.errors;

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file && setValue) {
        setValue(name, file as any, { shouldValidate: true });
      }
    },
    [setValue, name]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files?.[0];
      handleFileChange(file);
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const error = errors?.[name];

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label htmlFor={name} className="text-xs font-bold text-gray-800">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div
        className="w-full h-[250px] flex flex-col items-center justify-center relative border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/*"
          id={`file-upload-${String(name)}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          {...(register ? register(name) : {})}
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />

        {!imagePreview && (
          <div className="text-center pointer-events-none">
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <span>{label}</span>
              <br />
              <span className="text-indigo-600">Drag & drop</span> or{" "}
              <span className="underline">browse</span>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
            <div className="mt-4 p-2 bg-[#1E3557] text-white rounded-md inline-flex items-center gap-2">
              <ImUpload3 size={20} />
              <span>Upload</span>
            </div>
          </div>
        )}

        {imagePreview && (
          <div className="flex flex-col items-center">
            <Image
              src={imagePreview}
              alt="Preview"
              width={120}
              height={120}
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}

        {error && (
          <p className="mt-2 text-xs text-red-500 text-center">
            {String(error?.message)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;

// "use client";

// import React, { useCallback } from "react";
// import Image from "next/image";
// import { ImUpload3 } from "react-icons/im";
// import { useFormContext, FieldValues, Path } from "react-hook-form";

// interface ImageUploaderProps<T extends FieldValues> {
//   name: Path<T>;
//   label?: string;
//   required?: boolean;
//   className?: string;
//   imagePreview?: string | null;
// }

// function ImageUploader<T extends FieldValues>({
//   name,
//   label = "Upload Image",
//   className = "",
//   imagePreview,
//   required = false,
// }: ImageUploaderProps<T>) {
//   const {
//     register,
//     setValue,
//     formState: { errors },
//   } = useFormContext<T>();

//   const handleFileChange = useCallback(
//     (file: File | null) => {
//       if (file) {
//         setValue(name, file as any, { shouldValidate: true });
//       }
//     },
//     [setValue, name]
//   );

//   const handleDrop = useCallback(
//     (e: React.DragEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       e.stopPropagation();
//       const file = e.dataTransfer.files?.[0];
//       handleFileChange(file);
//     },
//     [handleFileChange]
//   );

//   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   const error = errors?.[name];

//   return (
//     <div className={`flex flex-col gap-2 w-full ${className}`}>
//       <label htmlFor={name} className="text-xs font-bold text-gray-800">
//         {label} {required && <span className="text-red-600">*</span>}
//       </label>

//       <div
//         className="w-full h-[250px] flex flex-col items-center justify-center relative border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           id={`file-upload-${String(name)}`}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
//           {...register(name)}
//           onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
//         />

//         {!imagePreview && (
//           <div className="text-center pointer-events-none">
//             <h3 className="mt-2 text-sm font-medium text-gray-900">
//               <span>{label}</span>
//               <br />
//               <span className="text-indigo-600">Drag & drop</span> or{" "}
//               <span className="underline">browse</span>
//             </h3>
//             <p className="mt-1 text-xs text-gray-500">
//               PNG, JPG, GIF up to 10MB
//             </p>
//             <div className="mt-4 p-2 bg-[#1E3557] text-white rounded-md inline-flex items-center gap-2">
//               <ImUpload3 size={20} />
//               <span>Upload</span>
//             </div>
//           </div>
//         )}

//         {imagePreview && (
//           <div className="flex flex-col items-center">
//             <Image
//               src={imagePreview}
//               alt="Preview"
//               width={120}
//               height={120}
//               className="w-32 h-32 object-cover border rounded"
//             />
//           </div>
//         )}

//         {error && (
//           <p className="mt-2 text-xs text-red-500 text-center">
//             {String(error?.message)}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageUploader;
