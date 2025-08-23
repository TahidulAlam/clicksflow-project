"use client";

import React from "react";
import { z } from "zod";
import { Controller } from "react-hook-form";

import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import TextInput from "@/components/shared/forms/TextInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import Container from "@/components/shared/container/Container";

const advertiserOptions = [
  { value: "customerHTML", label: "Customer HTML" },
  { value: "offerPreset", label: "Offer Preset" },
];

const defaultTextValue = `  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Latest Offers</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      background-color: #f9f9f9;
    }

    .announcement {
      background-color: #fff8dc;
      padding: 1rem 2rem;
      text-align: center;
      position: relative;
      border-bottom: 2px solid #f0c000;
    }
    .announcement strong {
      color: #b58900;
    }

    .offer-container {
      padding: 2rem;
      margin-top: -20px;
    }

    .offer-container h3 {
      margin-bottom: 1rem;
    }

    .offer-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .offer-card {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }

    .offer-card a {
      text-decoration: none;
      color: blue;
    }

    .offer-card .payout {
      display: block;
      margin: 10px 0;
      color: #333;
    }

    .view-btn {
      background: #290E00;
      color: #fff;
      padding: 7px 15px;
      border-radius: 5px;
      display: inline-block;
      text-decoration: none;
    }

    @media (max-width: 900px) {
      .offer-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .offer-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <div class="announcement" id="announcement">
    <strong>🚨 Announcement:</strong> Refer and earn 5% from your referral's income!
  </div>

  <div style="display:flex; justify-content:space-between;">

  <div class="offer-container">
    <h3>New Offer</h3>
 <ul style="list-style-type: disc; padding-left: 1.5rem;">
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:blue;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">Payout: CPA-$3.00</span>
    <span style="margin-left:30px">
      <a style="text-decoration:none; background:#290E00; color:#fff; padding:7px 15px; border-radius:5px; display:inline-block;" href="#">View Offer</a>
    </span>
  </li>
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:blue;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">Payout: CPA-$3.00</span>
    <span style="margin-left:30px">
      <a style="text-decoration:none; background:#290E00; color:#fff; padding:7px 15px; border-radius:5px; display:inline-block;" href="#">View Offer</a>
    </span>
  </li>
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:blue;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">Payout: CPA-$3.00</span>
    <span style="margin-left:30px">
      <a style="text-decoration:none; background:#290E00; color:#fff; padding:7px 15px; border-radius:5px; display:inline-block;" href="#">View Offer</a>
    </span>
  </li>
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:blue;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">Payout: CPA-$3.00</span>
    <span style="margin-left:30px">
      <a style="text-decoration:none; background:#290E00; color:#fff; padding:7px 15px; border-radius:5px; display:inline-block;" href="#">View Offer</a>
    </span>
  </li>
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:blue;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">Payout: CPA-$3.00</span>
    <span style="margin-left:30px">
      <a style="text-decoration:none; background:#290E00; color:#fff; padding:7px 15px; border-radius:5px; display:inline-block;" href="#">View Offer</a>
    </span>
  </li>
</ul>
  </div>

<div style="height: 150px; overflow: hidden; position: relative;">
  <div style="animation: scroll-up 5s linear infinite;">
    <img src="https://www.revsbill.clicksflowclient.io/assets/images/logoIcon/logo.png" alt="Logo" style="display: block; margin: 0 auto;height:60px">
  </div>
</div>

<style>
@keyframes scroll-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>


  <div class="offer-container">
    <h3 style="color:red;">Recently Paused Offer</h3>
 <ul style="list-style-type: disc; padding-left: 1.5rem;">
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:red;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">
    </span>
  </li>
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:red;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">
    </span>
  </li>
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:red;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">
    </span>
  </li>
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:red;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">
    </span>
  </li>
  <li style="margin-bottom: 5px;">
    <a style="text-decoration:none; color:red;" href="#"><strong>Offer Name</strong></a>
    <span style="margin-left:30px">
    </span>
  </li>
</ul>
  </div>

</div>

</body>
</html> `;

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.boolean().optional(),
  trackingDomain: z.string().min(1, "Tracking Domain is required").optional(),
  template: z.string().optional(),
  partnerAnnouncementNote: z.string().optional(),
  pausedOffers: z.string().optional(),
  activeOffers: z.string().optional(),
  forceSSL: z.boolean().optional(),
  showtoPartners: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

type FormType = z.infer<typeof schema>;

interface AnnouncementFormProps {
  onSubmitSuccess?: () => void;
  defaultTextValue?: React.ReactNode;
  isLoading?: boolean;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container maxWidth="full">
      <div className="p-5">
        <FormArea
          schema={schema}
          defaultValues={{
            name: "",
            status: false,
            trackingDomain: "",
            pausedOffers: "",
            activeOffers: "",
            template: advertiserOptions[0].value,
            partnerAnnouncementNote: defaultTextValue,
            forceSSL: false,
            showtoPartners: false,
            tags: [],
          }}
          onSubmit={handleSubmit}
        >
          {(methods) => {
            const {
              watch,
              setValue,
              reset,
              register,
              control,
              formState: { errors, isSubmitting },
            } = methods;

            const currentTemplate = watch("template");
            const announcementHTML = watch("partnerAnnouncementNote");

            return (
              <>
                <ToggleSwitch
                  label="Status"
                  checked={watch("status") ?? false}
                  onChange={(val) => setValue("status", val)}
                  disabled={isSubmitting}
                />

                <TextInput
                  name="name"
                  label="Name"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />

                <TextInput
                  name="trackingDomain"
                  label="Tracking Domain"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />

                <Controller
                  name="template"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      id="template"
                      label="Template"
                      options={advertiserOptions}
                      value={field.value}
                      onChange={field.onChange}
                      selectFirstByDefault
                      showSearch={false}
                      error={errors.template}
                      isDisabled={isSubmitting}
                    />
                  )}
                />

                {currentTemplate === "customerHTML" && (
                  <>
                    <TextAreaInput
                      name="partnerAnnouncementNote"
                      label="Partner Announcement Note"
                      register={register}
                      errors={errors}
                      required
                      rows={8}
                      disabled={isSubmitting}
                    />

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Live HTML Preview
                      </label>
                      <div
                        className="border p-4 rounded-md bg-white text-sm prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: announcementHTML ?? "",
                        }}
                      />
                    </div>
                  </>
                )}

                {currentTemplate === "offerPreset" && (
                  <>
                    <TextInput
                      name="activeOffers"
                      label="Active Offers"
                      register={register}
                      errors={errors}
                      required
                      disabled={isSubmitting}
                    />
                    <TextInput
                      name="pausedOffers"
                      label="Paused Offers"
                      register={register}
                      errors={errors}
                      required
                      disabled={isSubmitting}
                    />
                  </>
                )}

                <FormActions
                  isSubmitting={isSubmitting}
                  isLoading={isLoading}
                  onCancel={() => reset()}
                />
              </>
            );
          }}
        </FormArea>
      </div>
    </Container>
  );
};

export default AnnouncementForm;
