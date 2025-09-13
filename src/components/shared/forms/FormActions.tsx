// import React from "react";

// interface FormActionsProps {
//   isSubmitting?: boolean;
//   isLoading?: boolean;
//   onCancel: () => void;
// }

// const FormActions: React.FC<FormActionsProps> = ({
//   isSubmitting,
//   isLoading,
//   onCancel,
// }) => {
//   return (
//     <div className="flex justify-end gap-2">
//       <button
//         type="button"
//         onClick={onCancel}
//         className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md border border-[#1E3557]"
//       >
//         Cancel
//       </button>
//       <button
//         type="submit"
//         className="px-4 py-2 bg-[#1E3557] border border-[#1E3557] text-white rounded-md hover:bg-blue-700"
//         disabled={isSubmitting || isLoading}
//       >
//         {isSubmitting || isLoading ? "Submitting..." : "Continue"}
//       </button>
//     </div>
//   );
// };

// export default FormActions;

import React from "react";

interface FormActionsProps {
  isSubmitting?: boolean;
  isLoading?: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting,
  isLoading,
  onCancel,
}) => {
  return (
    <div className="flex justify-center gap-1 sticky bottom-0 right-3/12 p-4  bg-[#F2F7FD] z-10 border-t w-full border-t-gray-300">
      <button
        type="button"
        onClick={onCancel}
        className="min-w-[108px] px-4 py-2 bg-blue-50 text-gray-800 rounded border border-[#1E3557] text-sm font-medium cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="min-w-[108px] px-4 py-2 bg-[#1E3557] border border-[#1E3557] text-white rounded  text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? "Submitting..." : "Continue"}
      </button>
    </div>
  );
};

export default FormActions;
