"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import StatusSelector from "../../../../shared/forms/StatusSelector";
import ImageUploader from "../../../../shared/forms/ImageUploader";

import TagsInput from "../../../../shared/forms/TagsInput";
import MacroBuilder from "../../../../shared/forms/MacroBuilder";
import FormActions from "../../../../shared/forms/FormActions";
import TextInput from "../../../../shared/forms/TextInput";
import TextAreaInput from "../../../../shared/forms/TextAreaInput";
import SingleSelect from "../../../../shared/dataTable/SingleSelect";
import AddCategoryModal from "./AddCategoryModal";
import AddAdvertiserModal from "./AddAdvertiserModal";
import ExpiresDate from "./ExpiresDate";
import OfferGroupStatus from "./OfferGroupStatus";
// import AddCategoryModal from "./AddCategoryModal";

const advertiserOptions = [{ value: "profitnxt", label: "profit NXT" }];
const categoryOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];
const currencyOptions = [
  { value: "USD", label: "United States Dollar ($)" },
  { value: "AED", label: "United Arab Emirates Dirham (AED)" },
  { value: "AFN", label: "Afghan Afghani (Af)" },
  { value: "ALL", label: "Albanian Lek (ALL)" },
  { value: "AMD", label: "Armenian Dram (AMD)" },
  { value: "ANG", label: "Netherlands Antillean Guilder (ANG)" },
  { value: "AOA", label: "Angolan Kwanza (AOA)" },
];

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  appidentifier: z.string().min(2).max(50),
  previewurl: z.string().min(2).max(50),
  projectid: z.string().min(2).max(50),
  internalnotes: z.string().min(2).max(200),
  channels: z.string().min(2).max(100),
  advertisercampaignname: z.string().min(2).max(100),
  description: z.string().min(2).max(100),
  status: z.string().min(1, "Status is required"),
  advertiser: z.string().min(1, "Advertiser is required"),
  image: z.union([z.instanceof(File), z.string().optional()]),
  category: z.string().min(1, "Category is required"),
  currency: z.string().min(1, "Currency is required"),
  offerGroupStatus: z.string().optional(),
  expiresDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type FormData = z.infer<typeof formSchema>;

interface GenarelAddFormProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const GenarelAddForm: React.FC<GenarelAddFormProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "",
      advertiser: "",
      category: "",
      image: "",
      tags: [],
      currency: "",
      offerGroupStatus: "",
      description: "",
      expiresDate: "",
      appidentifier: "",
      previewurl: "",
      projectid: "",
      internalnotes: "",
      channels: "",
      advertisercampaignname: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSelect, setShowSelect] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState("");
  const image = watch("image");

  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isCgModalOpen, setIsCgModalOpen] = useState(false);
  useEffect(() => {
    setShowSelect(toggle);
  }, [toggle]);

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof image === "string") {
      setImagePreview(image);
    }
  }, [image]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let imageUrl = typeof data.image === "string" ? data.image : "";

      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append("file", data.image);
        imageUrl = await new Promise<string>((resolve) =>
          setTimeout(() => resolve("https://via.placeholder.com/150"), 1000)
        );
      }

      console.log("Submitted Data:", { ...data, image: imageUrl });

      reset();
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
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
          name="name"
          label="Name"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />

        <StatusSelector
          // register={register}
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
        />

        <div className="flex gap-4">
          <div className="flex flex-col w-1/2 gap-2">
            {/* <AddAdvertiserModal
              isOpen={isAdModalOpen}
              onClose={() => setIsAdModalOpen(false)}
            /> */}
            <div className="flex flex-col space-y-8">
              <div className="z-40">
                <SingleSelect
                  id="category"
                  label="Category"
                  required
                  options={categoryOptions}
                  value={watch("category")}
                  onChange={(val) => setValue("category", val)}
                  error={errors.currency}
                  customModalTrigger={
                    <button
                      type="button"
                      onClick={() => setIsCgModalOpen(true)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      + Add
                    </button>
                  }
                />
                <AddAdvertiserModal
                  isOpen={isAdModalOpen}
                  onClose={() => setIsAdModalOpen(false)}
                />
              </div>
              <div className="z-30">
                <SingleSelect
                  id="advertiser"
                  label="Advertiser"
                  options={advertiserOptions}
                  value={watch("advertiser")}
                  onChange={(val) => setValue("advertiser", val)}
                  error={errors.advertiser}
                  customModalTrigger={
                    <button
                      type="button"
                      onClick={() => setIsAdModalOpen(true)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      + Add
                    </button>
                  }
                />
                <AddCategoryModal
                  isOpen={isCgModalOpen}
                  onClose={() => setIsCgModalOpen(false)}
                />
              </div>
              <div className="z-20">
                <SingleSelect
                  id="currency"
                  label="Default Currency"
                  required
                  options={currencyOptions}
                  value={watch("currency")}
                  onChange={(val) => setValue("currency", val)}
                  error={errors.currency}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <ImageUploader
              name="image"
              register={register}
              setValue={setValue}
              errors={errors}
              imagePreview={imagePreview}
            />
          </div>
        </div>
        <OfferGroupStatus
          toggle={toggle}
          setToggle={setToggle}
          showSelect={showSelect}
          selectedValue={watch("offerGroupStatus")}
          onChange={(val: string) => setValue("offerGroupStatus", val)}
        />

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagsInput
              tags={field.value || []}
              setTags={(newTags) => field.onChange(newTags)}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          )}
        />
        <MacroBuilder url={url} setUrl={setUrl} />

        <TextInput
          name="appidentifier"
          label="App Identifier"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />
        <TextInput
          name="previewurl"
          label="Preview URL"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />
        <TextInput
          name="projectid"
          label="Project ID"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />

        <TextAreaInput
          name="internalnotes"
          label="Internal Notes"
          rows={4}
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />
        <div className="flex w-full gap-4">
          <div className="w-1/2">
            <TextInput
              name="channels"
              label="Channels"
              register={register}
              errors={errors}
              required
              disabled={isSubmitting || isLoading}
            />
          </div>
          <div className="w-1/2">
            <TextInput
              name="advertisercampaignname"
              label="Advertiser Campaign Name"
              register={register}
              errors={errors}
              required
              disabled={isSubmitting || isLoading}
            />
          </div>
        </div>
        <ExpiresDate
          toggle={toggle}
          setToggle={setToggle}
          showSelect={showSelect}
          selectedValue={watch("expiresDate")}
          onChange={(val: string) => setValue("expiresDate", val)}
        />
        <TextAreaInput
          name="description"
          label="Description"
          rows={4}
          register={register}
          errors={errors}
          required
          disabled={isSubmitting || isLoading}
        />
        <FormActions
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          onCancel={() => reset()}
        />
      </form>
    </div>
  );
};

export default GenarelAddForm;
