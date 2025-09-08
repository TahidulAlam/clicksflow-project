import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/shared/modal/Modal";
import toast from "react-hot-toast";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import ImageInput from "@/components/shared/forms/ImageInput";
import CreativeEmail from "./CreativeEmail";

const creativesSchema = z.object({
  creativeName: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  status: z.string().min(1, "Status is required"),
  archiveImage: z.string(),
  email: z.string(),
  emailFrom: z.string().min(1, "Match Type is required"),
  codeEmail: z.string().min(1, "Match Type is required"),
  attachment: z.string().min(1, "Match Type is required"),
  htmlForm: z.string().min(1, "Match Type is required"),
  visibility: z.boolean(),
});

export type CreativesData = z.infer<typeof creativesSchema>;

const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "paused", label: "Paused", dotColor: "bg-purple-500" },
  { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
];

const typeOptions = [
  { value: "archive", label: "Archive" },
  { value: "email", label: "Email" },
  { value: "html", label: "Html" },
  { value: "image", label: "Image" },
  { value: "link", label: "Link" },
  { value: "text", label: "Text" },
  { value: "thumbnail", label: "Thumbnail" },
  { value: "video", label: "Video" },
];

interface CreativesModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmitSuccess: (data: CreativesData) => void;
  defaultData?: CreativesData;
}

const CreativesModal: React.FC<CreativesModalProps> = ({
  isOpen,
  isLoading = false,
  onClose,
  onSubmitSuccess,
  defaultData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreativesData>({
    resolver: zodResolver(creativesSchema),
    defaultValues: defaultData,
  });

  // Removed unused variable 'selectedType'

  useEffect(() => {
    if (isOpen) {
      reset(defaultData);
    }
  }, [isOpen, defaultData, reset]);

  const onSubmit = async (data: CreativesData) => {
    try {
      onSubmitSuccess(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to save creative. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      title={defaultData ? "Edit Creative" : "Add New Creative"}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <p className="text-sm text-gray-600">
          Fields marked with an asterisk (*) are required.
        </p>

        <TextInput
          name="creativeName"
          label="Creative Name"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />

        <StatusSelector
          label="Status"
          fieldName="status"
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          options={visibilityStatus}
        />
        <div className="">
          <ToggleSwitch
            className="gap-4"
            label="Visibility"
            checked={watch("visibility")}
            onChange={(val) => setValue("visibility", val)}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex gap-5">
          <div className="w-full">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <>
                  <SingleSelect
                    id="type"
                    label="Type"
                    required
                    showSearch={false}
                    options={typeOptions}
                    placeholder="Select creative type"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.type}
                    isDisabled={isSubmitting}
                  />
                  <>
                    <div className="w-full mt-2">
                      {field.value === "archive" && (
                        <ImageInput
                          name="archiveImage"
                          label="Archive Image"
                          register={register}
                          errors={errors}
                          required
                          disabled={isSubmitting || isLoading}
                        />
                      )}

                      {field.value === "email" && (
                        <CreativeEmail
                          register={register}
                          errors={errors}
                          control={control}
                          disabled={isSubmitting || isLoading}
                        />
                      )}
                      {field.value === "html" && (
                        <CreativeEmail
                          register={register}
                          errors={errors}
                          html={true}
                          control={control}
                          disabled={isSubmitting || isLoading}
                        />
                      )}
                      {field.value === "image" && (
                        <ImageInput
                          name="archiveImage"
                          label="Image"
                          register={register}
                          errors={errors}
                          required
                          disabled={isSubmitting || isLoading}
                        />
                      )}
                      {field.value === "link" && (
                        <CreativeEmail
                          register={register}
                          errors={errors}
                          html={true}
                          control={control}
                          disabled={isSubmitting || isLoading}
                        />
                      )}
                      {field.value === "text" && (
                        <ImageInput
                          name="archiveImage"
                          label="Text"
                          register={register}
                          errors={errors}
                          required
                          disabled={isSubmitting || isLoading}
                        />
                      )}
                      {field.value === "thumbnail" && (
                        <ImageInput
                          name="archiveImage"
                          label="Thumbnail"
                          register={register}
                          errors={errors}
                          required
                          disabled={isSubmitting || isLoading}
                        />
                      )}
                      {field.value === "video" && (
                        <ImageInput
                          name="archiveImage"
                          label="Video"
                          register={register}
                          errors={errors}
                          required
                          disabled={isSubmitting || isLoading}
                        />
                      )}
                    </div>
                  </>
                </>
              )}
            />
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-950 text-white px-5 py-2 rounded hover:bg-blue-900 transition"
            disabled={isSubmitting || isLoading}
          >
            {defaultData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreativesModal;
