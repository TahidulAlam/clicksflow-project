import React from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import toast from "react-hot-toast";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  matchType: z.enum(["exact", "range"], {
    required_error: "Match Type is required",
  }),
  parameter: z.enum(["exact", "range"], {
    required_error: "Match Type is required",
  }),
  action: z.enum(["exact", "range"], {
    required_error: "Match Type is required",
  }),
});

export type TargetFilteringData = z.infer<typeof formSchema>;

interface TrafficFilteringModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmitSuccess: (data: TargetFilteringData) => void;
  defaultData?: TargetFilteringData;
}

const parameterOptions = [
  { value: "exact", label: "Exact" },
  { value: "range", label: "Range" },
];
const matchTypeOptions = [
  { value: "exact", label: "Exact" },
  { value: "range", label: "Range" },
];
const actionOptions = [
  { value: "exact", label: "Exact" },
  { value: "range", label: "Range" },
];

const TrafficFilteringModal: React.FC<TrafficFilteringModalProps> = ({
  isOpen,
  isLoading = false,
  onClose,
  onSubmitSuccess,
  defaultData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TargetFilteringData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultData ?? {
      name: "",
      matchType: "exact",
      parameter: "exact",
      action: "exact",
    },
  });

  const onSubmit: SubmitHandler<TargetFilteringData> = async (data) => {
    console.log("Modal form submitted with data:", data);
    try {
      await onSubmitSuccess(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Failed to save event. Please try again.");
    }
  };

  const handleClose = () => {
    console.log("Closing modal");
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={defaultData ? "Edit Event" : "Add New Event"}
      size="xl"
      position="top"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-gray-600">
          Fields with an asterisk (*) are mandatory
        </p>

        <Controller
          name="parameter"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="parameter"
              label="Parameter"
              required
              showSearch={false}
              options={parameterOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.parameter}
              isDisabled={isSubmitting || isLoading}
            />
          )}
        />
        <Controller
          name="matchType"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="matchType"
              label="Match Type"
              required
              showSearch={false}
              options={matchTypeOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.matchType}
              isDisabled={isSubmitting || isLoading}
            />
          )}
        />
        <TextInput
          name="name"
          label="Value (Case insensitive) "
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />
        <Controller
          name="action"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="action"
              label="Action"
              required
              showSearch={false}
              options={actionOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.action}
              isDisabled={isSubmitting || isLoading}
            />
          )}
        />
        <div className="flex justify-end pt-6 gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="px-6 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-900 transition"
          >
            {isSubmitting || isLoading
              ? "Submitting..."
              : defaultData
              ? "Update"
              : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TrafficFilteringModal;
