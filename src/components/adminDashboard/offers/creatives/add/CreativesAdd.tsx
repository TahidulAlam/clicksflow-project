"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Container from "@/components/shared/container/Container";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import FormActions from "@/components/shared/forms/FormActions";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import ImageInput from "@/components/shared/forms/ImageInput";
import CreativeEmail from "../../add/creativesForm/CreativeEmail";

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
const offerOptions = [
  { value: "profitNXT", label: "Profit NXT" },
  { value: "clicksAdv", label: "Clicks Adv" },
];
const visibilityStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "paused", label: "Paused", dotColor: "bg-purple-500" },
  { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
];

export const formSchema = z.object({
  creativeName: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.string().min(1, "Status is required"),
  offer: z.string().min(1, "Status is required"),
  visibleToPartner: z.boolean().optional(),
  // tags: z.array(z.string()).optional(),
  type: z.enum(
    ["archive", "email", "html", "image", "link", "text", "thumbnail", "video"],
    {
      required_error: "Type is required",
    }
  ),

  // File inputs or content fields
  archiveImage: z.any().optional(),
  subject: z.string().optional(),
  body: z.string().optional(),
  htmlContent: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

interface CreativesAddProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const CreativesAdd: React.FC<CreativesAddProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      creativeName: "",
      status: "",
      // tags: [],
    },
  });

  const selectedStatus = watch("status");
  const selectedType = watch("type");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Submitted Data:", data);
      reset();
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Container className="bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <span className="text-xs">
          Fields with an asterisk (<span className="text-red-700">*</span>) are
          required
        </span>

        <TextInput
          name="creativeName"
          label="Creative Name"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting}
        />

        <StatusSelector
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          options={visibilityStatus}
          selectedStatus={selectedStatus}
        />
        <div className="flex gap-2">
          <div className="w-1/5">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  id="type"
                  label="Type"
                  required
                  showSearch={false}
                  options={typeOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.type}
                  isDisabled={isSubmitting}
                />
              )}
            />
          </div>
          <div className="w-4/5">
            <Controller
              name="offer"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  id="offer"
                  label="Offer"
                  required
                  //   placeholder="Archive"
                  options={offerOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.offer}
                  isDisabled={isSubmitting}
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ToggleSwitch
            label="Visible To Partner"
            checked={watch("visibleToPartner") ?? false}
            onChange={(val) => setValue("visibleToPartner", val)}
            disabled={isSubmitting}
          />
        </div>
        {/* Dynamic Creative Inputs */}
        <div className="w-full">
          {selectedType === "archive" && (
            <ImageInput
              name="archiveImage"
              label="Archive Image"
              register={register}
              errors={errors}
              required
              disabled={isSubmitting || isLoading}
            />
          )}

          {(selectedType === "email" || selectedType === "link") && (
            <CreativeEmail
              register={register}
              errors={errors}
              control={control}
              disabled={isSubmitting || isLoading}
            />
          )}

          {selectedType === "html" && (
            <CreativeEmail
              register={register}
              errors={errors}
              control={control}
              html={true}
              disabled={isSubmitting || isLoading}
            />
          )}

          {["image", "text", "thumbnail", "video"].includes(
            selectedType || ""
          ) && (
            <ImageInput
              name="archiveImage"
              label={
                selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
              }
              register={register}
              errors={errors}
              required
              disabled={isSubmitting || isLoading}
            />
          )}
        </div>

        <FormActions
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          onCancel={() => reset()}
        />
      </form>
    </Container>
  );
};

export default CreativesAdd;
