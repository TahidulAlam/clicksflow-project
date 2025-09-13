// "use client";

// import React, { useState } from "react";
// import { useFieldArray, UseFormReturn, Path } from "react-hook-form";
// import { MdClose } from "react-icons/md";
// import { FaPlus } from "react-icons/fa";
// import { FormData } from "../../adminDashboard/offers/add/trackingAndControlForm/TrackingControlForm";

// interface DynamicInputListProps {
//   form: UseFormReturn<FormData>;
//   fieldName: "customFields";
//   label?: string;
//   placeholder?: string;
//   isDisabled?: boolean;
// }

// const DynamicInputList: React.FC<DynamicInputListProps> = ({
//   form,
//   fieldName,
//   label = "Custom Field",
//   placeholder = "Enter value",
//   isDisabled = false,
// }) => {
//   const {
//     control,
//     watch,
//     formState: { errors, isSubmitting },
//   } = form;

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: fieldName,
//   });
//   const [hide, setHide] = useState(false);
//   const fieldErrors = errors[fieldName] as
//     | Record<number, { value?: { message?: string } }>
//     | undefined;

//   const handleAdd = () => {
//     setHide(true);
//     append({ value: "" });
//   };

//   const handleRemove = (index: number) => {
//     remove(index);
//   };

//   return (
//     <div className="flex justify-between">
//       <div className="w-1/6 flex items-center justify-between">
//         <button
//           type="button"
//           onClick={handleAdd}
//           className="flex items-center bg-gray-50 z-10 border border-gray-300 rounded-lg px-2 py-2 gap-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 transition-colors"
//           disabled={isDisabled || isSubmitting}
//           aria-label={`Add new ${label.toLowerCase()}`}
//         >
//           <FaPlus size={16} />
//           <span className="text-sm font-medium">Add New</span>
//         </button>
//       </div>
//       {hide && (
//         <div className="w-2/6 flex">
//           <div className="w-px relative h-84 -rotate-90 bg-gray-300 py-4 ml-30" />
//         </div>
//       )}
//       <div
//         className={`space-y-2 w-3/6 z-10 p-4 pb-8 ${
//           hide
//             ? "border border-gray-300 bg-gray-50"
//             : "fixed h-[336px] overflow-y-scroll"
//         }  rounded-lg `}
//       >
//         {fields.map((field, index) => (
//           <div key={field.id} className="flex items-center">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 id={`${fieldName}.${index}.value`}
//                 className="block w-full py-1.5 px-3 border border-gray-300 bg-white rounded-l-md border-r-0 focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:bg-gray-100"
//                 placeholder={placeholder}
//                 value={
//                   (watch(`${fieldName}.${index}.value` as Path<FormData>) as
//                     | string
//                     | undefined) || ""
//                 }
//                 onChange={(e) =>
//                   form.setValue(
//                     `${fieldName}.${index}.value` as Path<FormData>,
//                     e.target.value
//                   )
//                 }
//                 disabled={isDisabled || isSubmitting}
//                 aria-label={`${label} ${index + 1}`}
//               />
//               {fieldErrors?.[index]?.value && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {fieldErrors[index].value.message}
//                 </p>
//               )}
//             </div>
//             <button
//               type="button"
//               onClick={() => handleRemove(index)}
//               className="p-2 text-lg font-bold bg-red-500 border border-red-500 rounded-r-md text-white hover:bg-red-600 disabled:bg-red-300 transition-colors"
//               disabled={isDisabled || isSubmitting}
//               aria-label={`Remove ${label} ${index + 1}`}
//             >
//               <MdClose size={18} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DynamicInputList;

"use client";

import React from "react";
import { useFieldArray, UseFormReturn, Path } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FormData } from "../../adminDashboard/offers/add/trackingAndControlForm/TrackingControlForm";
import ArrowLine from "../ArrowLine";

interface DynamicInputListProps {
  form: UseFormReturn<FormData>;
  fieldName: "customFields";
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

const DynamicInputList: React.FC<DynamicInputListProps> = ({
  form,
  fieldName,
  label = "Custom Field",
  placeholder = "Enter value",
  isDisabled = false,
}) => {
  const {
    control,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const fieldErrors = errors[fieldName] as
    | Record<number, { value?: { message?: string } }>
    | undefined;

  const handleAdd = () => {
    append({ value: "" });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex  my-4">
      {/* Add New Button */}
      <div className="w-1/6 flex items-center ">
        <button
          type="button"
          onClick={handleAdd}
          className="flex px-1.5 h-[30px] items-center bg-gray-50 z-10 border border-gray-300 rounded-lg  gap-2 text-gray-800 disabled:text-gray-400 transition-colors text-xs w-full justify-center"
          disabled={isDisabled || isSubmitting}
          aria-label={`Add new ${label.toLowerCase()}`}
        >
          <FaPlus size={12} />
          <span className="text-xs font-medium whitespace-nowrap">Add New</span>
        </button>
      </div>

      {/* Divider Line (optional visual) */}
      {fields.length > 0 && (
        <div className="w-1/6 flex items-center justify-center">
          <ArrowLine direction="right" length={210} className="ml-0 w-full" />
        </div>
      )}

      {/* Dynamic Input List Section */}
      <div
        className={`w-4/6 z-10 p-4 pb-8 overflow-y-scroll scrollbar-thin max-h-[336px] rounded-lg ${
          fields.length > 0 ? "space-y-2  border border-gray-300" : "fixed"
        }`}
      >
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center">
            <div className="flex-1">
              <input
                type="text"
                id={`${fieldName}.${index}.value`}
                className="block px-1 w-full h-[30px] border border-gray-300 bg-white rounded-l-md border-r-0 focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:bg-gray-100"
                placeholder={placeholder}
                value={
                  (watch(`${fieldName}.${index}.value` as Path<FormData>) as
                    | string
                    | undefined) || ""
                }
                onChange={(e) =>
                  form.setValue(
                    `${fieldName}.${index}.value` as Path<FormData>,
                    e.target.value
                  )
                }
                disabled={isDisabled || isSubmitting}
                aria-label={`${label} ${index + 1}`}
              />
              {fieldErrors?.[index]?.value && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors[index].value.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="h-[30px] w-10 border border-red-500 bg-red-500 rounded-r-md text-white hover:bg-red-600 disabled:bg-red-300 transition-colors text-center flex items-center justify-center"
              disabled={isDisabled || isSubmitting}
              aria-label={`Remove ${label} ${index + 1}`}
            >
              <MdClose size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicInputList;
