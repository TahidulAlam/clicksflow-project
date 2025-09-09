/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@/components/shared/container/Container";

import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import TextInput from "@/components/shared/forms/TextInput";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";
import ImageUploader from "@/components/shared/forms/ImageUploader";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import AddCategoryModal from "./AddCategoryModal";
import AddAdvertiserModal from "./AddAdvertiserModal";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import TagsInput from "@/components/shared/forms/TagsInput";
// import FormBody from "@/components/shared/forms/form/FormBody";
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import OfferGroupStatus from "./OfferGroupStatus";
import ExpiresDate from "./ExpiresDate";

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
const statusOptions = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "pending", label: "Pending", dotColor: "bg-yellow-400" },
  { value: "paused", label: "Paused", dotColor: "bg-orange-600" },
];

const schema = z.object({
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

interface GeneralAddOfferProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

type FormType = z.infer<typeof schema>;

const GeneralAddOffer: React.FC<GeneralAddOfferProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
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

  const { watch } = methods;
  const image = watch("image");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState("");
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isCgModalOpen, setIsCgModalOpen] = useState(false);

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof image === "string") {
      setImagePreview(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
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
        }}
        onSubmit={async (data: FormType) => {
          console.log("Submitted Data:", data);
          if (onSubmitSuccess) {
            onSubmitSuccess();
          }
        }}
        // showButtons={true}
        // isLoading={isLoading}
        // onCancel={() => {
        //   methods.reset();
        //   setImagePreview(null);
        //   setInputValue("");
        //   setUrl("");
        //   setToggle(false);
        //   setIsAdModalOpen(false);
        //   setIsCgModalOpen(false);
        // }}
      >
        {(methods) => {
          const {
            register,
            control,
            reset,
            setValue,
            formState: { errors, isSubmitting },
          } = methods;

          const formValues = watch();
          // console.log("Live Form Values:", formValues);
          const {
            status,
            category,
            advertiser,
            currency,
            offerGroupStatus,
            expiresDate,
          } = formValues;

          return (
            <>
              <TextInput
                name="name"
                label="Name"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting || isLoading}
              />

              <StatusSelector
                label="Status"
                fieldName="status"
                options={statusOptions}
                setValue={setValue}
                errors={errors}
                isSubmitting={isSubmitting}
                isLoading={isLoading}
              />

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    {/* Advertiser */}
                    <div>
                      <SingleSelect
                        id="advertiser"
                        label="Advertiser"
                        options={advertiserOptions}
                        value={advertiser}
                        required
                        onChange={(val) => setValue("advertiser", val)}
                        error={errors.advertiser}
                        customModalTrigger={
                          <button
                            type="button"
                            onClick={() => setIsAdModalOpen(true)}
                            className="text-xs text-blue-950"
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
                    {/* Category */}
                    <div>
                      <SingleSelect
                        id="category"
                        label="Category"
                        required
                        options={categoryOptions}
                        value={category}
                        onChange={(val) => setValue("category", val)}
                        error={errors.category}
                        customModalTrigger={
                          <button
                            type="button"
                            onClick={() => setIsCgModalOpen(true)}
                            className="text-xs text-blue-950"
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

                    {/* Currency */}
                    <div>
                      <SingleSelect
                        id="currency"
                        label="Default Currency"
                        required
                        options={currencyOptions}
                        value={currency}
                        onChange={(val) => setValue("currency", val)}
                        error={errors.currency}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-1/2">
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
                showSelect={toggle}
                selectedValue={offerGroupStatus}
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
                    labelSpan={true}
                    setInputValue={setInputValue}
                  />
                )}
              />

              <MacroBuilder
                label="Base Destination URL "
                required
                url={url}
                setUrl={setUrl}
              />

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
                    className="whitespace-nowrap"
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
                showSelect={toggle}
                selectedValue={expiresDate}
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
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default GeneralAddOffer;
