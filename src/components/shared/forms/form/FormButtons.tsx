import React from "react";

interface FormButtonsProps {
  isSubmitting?: boolean;
  isLoading?: boolean;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  isSubmitting,
  isLoading,
  onCancel,
  submitLabel = "Continue",
  cancelLabel = "Cancel",
}) => {
  return (
    <div className="flex justify-end gap-1">
      <button
        type="button"
        onClick={onCancel}
        className="min-w-[108px] px-4 py-2 bg-blue-50 text-gray-800 rounded border border-[#1E3557] text-sm font-medium cursor-pointer"
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        className="min-w-[108px] px-4 py-2 bg-[#1E3557] border border-[#1E3557] text-white rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? "Submitting..." : submitLabel}
      </button>
    </div>
  );
};

export default FormButtons;
