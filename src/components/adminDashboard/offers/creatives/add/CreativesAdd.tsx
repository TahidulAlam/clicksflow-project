"use client";

import React from "react";
import { z } from "zod";
import { Controller, UseFormReturn, Control } from "react-hook-form";

import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import Container from "@/components/shared/container/Container";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import ImageInput from "@/components/shared/forms/ImageInput";
import CreativeEmail from "../../add/creativesForm/CreativeEmail";

// Options
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

// Schema + types
const SchemaName = z.object({
  creativeName: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.string().min(1, "Status is required"),
  offer: z.string().min(1, "Offer is required"),
  visibleToPartner: z.boolean().optional(),
  type: z.enum(
    ["archive", "email", "html", "image", "link", "text", "thumbnail", "video"],
    { required_error: "Type is required" }
  ),
  // File inputs or content fields
  archiveImage: z.any().optional(),
  subject: z.string().optional(),
  body: z.string().optional(),
  htmlContent: z.string().optional(),
});

type FormType = z.infer<typeof SchemaName>;

interface CreativesAddProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const CreativesAdd: React.FC<CreativesAddProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      {/* Ensure FormArea is generic so methods/control are typed as FormType */}
      <FormArea
        schema={SchemaName}
        defaultValues={{
          creativeName: "",
          status: "",
          offer: "",
          type: "archive",
          visibleToPartner: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const typedMethods = methods as unknown as UseFormReturn<FormType>;
          const {
            register,
            control,
            watch,
            setValue,
            reset,
            formState: { errors, isSubmitting },
          } = typedMethods;

          // control is typed as Control<FormType>
          // (if FormArea already types methods correctly you can remove the `as` assertion)
          const typedControl = control as unknown as Control<FormType>;

          const selectedType = watch("type");

          return (
            <>
              <TextInput
                name="creativeName"
                label="Creative Name"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting || isLoading}
              />

              <StatusSelector
                setValue={setValue}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                options={visibilityStatus}
              />

              {/* Type + Offer */}
              <div className="flex gap-2">
                <div className="w-1/5">
                  <Controller
                    control={typedControl}
                    name="type"
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
                        isDisabled={isSubmitting || isLoading}
                      />
                    )}
                  />
                </div>

                <div className="w-4/5">
                  <Controller
                    control={typedControl}
                    name="offer"
                    render={({ field }) => (
                      <SingleSelect
                        id="offer"
                        label="Offer"
                        required
                        options={offerOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.offer}
                        isDisabled={isSubmitting || isLoading}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Visible To Partner */}
              <div className="flex items-center gap-4">
                <ToggleSwitch
                  label="Visible To Partner"
                  checked={watch("visibleToPartner") ?? false}
                  onChange={(val) => setValue("visibleToPartner", val)}
                  disabled={isSubmitting || isLoading}
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
                    control={typedControl}
                    disabled={isSubmitting || isLoading}
                  />
                )}

                {selectedType === "html" && (
                  <CreativeEmail
                    register={register}
                    errors={errors}
                    control={typedControl}
                    html
                    disabled={isSubmitting || isLoading}
                  />
                )}

                {["image", "text", "thumbnail", "video"].includes(
                  selectedType ?? ""
                ) && (
                  <ImageInput
                    name="archiveImage"
                    label={
                      selectedType
                        ? selectedType.charAt(0).toUpperCase() +
                          selectedType.slice(1)
                        : "Upload File"
                    }
                    register={register}
                    errors={errors}
                    required
                    disabled={isSubmitting || isLoading}
                  />
                )}
              </div>

              {/* Actions */}
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => reset()}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default CreativesAdd;
