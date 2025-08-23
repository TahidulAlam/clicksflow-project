"use client";

import { Controller } from "react-hook-form";
import { z } from "zod";
import Container from "@/components/shared/container/Container";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";
import TextInput from "@/components/shared/forms/TextInput";
import StatusSelector from "@/components/shared/forms/StatusSelector";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import countryCodesList from "country-codes-list";
import NumberInput from "@/components/shared/forms/NumberInput";
import PasswordGeneratorModal from "./PasswordGeneratorModal";
import { useState } from "react";
const verifyStatus = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "inactive", label: "Inactive", dotColor: "bg-red-500" },
];
const commonOptions = [
  { value: "none", label: "None" },
  { value: "messanger", label: "Messanger" },
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "Whatsapp" },
  { value: "viber", label: "Viber" },
  { value: "weChat", label: "weChat" },
  { value: "other", label: "Other" },
];
const schema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Name must be at least 2 characters").max(50),
  userName: z.string().min(2, "Name must be at least 2 characters").max(50),
  title: z.string().min(2, "Name must be at least 2 characters").max(50),
  status: z.string().optional(),
  country: z.string().optional(),
  instantMessaging: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  workPhone: z.number().optional(),
  cellPhone: z.number().optional(),
  addUser: z.boolean().optional(),
  sendActivationEmail: z.boolean().optional(),
  setPasswordManually: z.boolean().optional(),
});
type FormType = z.infer<typeof schema>;
interface AddUserPartnersProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}
const rawCountryData = countryCodesList.customList(
  "countryCode",
  "{countryNameEn}~{countryCallingCode}"
);

const countryOptions = Object.entries(rawCountryData).map(([code, value]) => {
  const [name, phoneCode] = value.split("~");
  return {
    label: `${name}`,
    value: code,
    phoneCode: `+${phoneCode}`,
  };
});
const AddUserPartners: React.FC<AddUserPartnersProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          addUser: false,
          firstName: "",
          lastName: "",
          userName: "",
          title: "",
          country: "",
          email: "",
          status: "",
          password: "",
          instantMessaging: "None",
          setPasswordManually: false,
          sendActivationEmail: false,
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            setValue,
            reset,
            control,
            watch,
            formState: { errors, isSubmitting },
          } = methods;
          const selectedStatus = watch("status");
          const selectedCountryValue = watch("country");

          const selectedCountry = countryOptions.find(
            (option) => option.value === selectedCountryValue
          );

          const phoneCodeLabel = selectedCountry?.phoneCode ?? "";

          return (
            <>
              <Controller
                name="addUser"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleSwitch
                      size="lg"
                      label="Add User"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                    {field.value && (
                      <>
                        <FlexRow
                          cols={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                          gap="lg:gap-6 gap-2"
                          className="lg:mb-2 mb-2"
                        >
                          <TextInput
                            name="firstName"
                            label="First Name"
                            register={register}
                            errors={errors}
                            required
                            disabled={isSubmitting}
                          />
                          <TextInput
                            name="lastName"
                            label="Last Name"
                            register={register}
                            errors={errors}
                            required
                            disabled={isSubmitting}
                          />
                        </FlexRow>
                        <StatusSelector
                          label="Status"
                          fieldName="status"
                          setValue={setValue}
                          errors={errors}
                          isSubmitting={isSubmitting}
                          isLoading={isLoading}
                          // required
                          options={verifyStatus}
                          selectedStatus={selectedStatus}
                        />
                        <FlexRow
                          cols={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                          gap="lg:gap-6 gap-2"
                          className="lg:mb-2 mb-2"
                        >
                          <TextInput
                            name="title"
                            label="Title"
                            register={register}
                            errors={errors}
                            required
                            disabled={isSubmitting}
                          />
                          <TextInput
                            name="userName"
                            label="Username"
                            register={register}
                            errors={errors}
                            required
                            disabled={isSubmitting}
                          />
                        </FlexRow>
                        <FlexRow
                          cols={{ base: 3, sm: 1, md: 3 }}
                          gap="gap-4"
                          className="mb-4"
                        >
                          <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                              <SingleSelect
                                id="country"
                                label="Country"
                                required
                                showSearch
                                options={countryOptions}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.country}
                                isDisabled={isSubmitting}
                              />
                            )}
                          />
                          <NumberInput
                            id="workPhone"
                            label="Work Phone"
                            type="number"
                            inputLabel={phoneCodeLabel}
                            placeholder="Enter number"
                            value={control._formValues.workPhone ?? 0}
                            register={register}
                            errors={errors}
                            disabled={isSubmitting}
                            required
                            valueAsNumber
                          />

                          <NumberInput
                            id="cellPhone"
                            label="Cell Phone"
                            type="number"
                            inputLabel={phoneCodeLabel}
                            placeholder="Enter number"
                            value={control._formValues.cellPhone ?? 0}
                            register={register}
                            errors={errors}
                            disabled={isSubmitting}
                            required
                            valueAsNumber
                          />
                        </FlexRow>
                        <TextInput
                          name="email"
                          label="E-mail"
                          register={register}
                          errors={errors}
                          required
                          disabled={isSubmitting}
                        />
                        <FlexRow
                          cols={{ base: 3, sm: 1, md: 3 }}
                          gap="gap-4"
                          className="mb-4"
                        >
                          <Controller
                            name="instantMessaging"
                            control={control}
                            render={({ field }) => (
                              <SingleSelect
                                id="instantMessaging"
                                label="Instant Messaging"
                                // required
                                showSearch={false}
                                options={commonOptions}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.instantMessaging}
                                isDisabled={isSubmitting}
                              />
                            )}
                          />
                        </FlexRow>
                        <ToggleSwitch
                          label="Send activation email notifying user of account creation"
                          checked={watch("sendActivationEmail") ?? false}
                          onChange={(val) =>
                            setValue("sendActivationEmail", val)
                          }
                          disabled={isSubmitting}
                        />
                        <Controller
                          control={control}
                          name="setPasswordManually"
                          render={({ field }) => (
                            <>
                              <ToggleSwitch
                                label="Set Password Manually"
                                checked={field.value ?? false}
                                onChange={field.onChange}
                                disabled={isSubmitting || isLoading}
                                aria-label="Set Password Manually"
                              />
                              {field.value && (
                                <>
                                  <div className="relative z-10">
                                    <input
                                      id="generatedPassword"
                                      type="text"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      className="w-full border rounded px-3 py-2 pr-10 border-gray-300 rounded-md transition-shadow focus:outline-none focus:ring-0 focus:shadow-md"
                                      placeholder="Generated Password"
                                    />
                                    <button
                                      type="button"
                                      className="absolute right-0 inset-y-0 flex items-center pr-3 px-2 text-gray-800 rounded-r-md bg-gray-300"
                                      onClick={() => setIsModalOpen(true)}
                                    >
                                      Generate
                                    </button>
                                  </div>
                                  <PasswordGeneratorModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    onUsePassword={(generated) => {
                                      setValue("password", generated, {
                                        shouldValidate: true,
                                      });
                                      setIsModalOpen(false);
                                    }}
                                  />
                                </>
                              )}
                            </>
                          )}
                        />
                      </>
                    )}
                  </>
                )}
              />

              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={reset}
              />
            </>
          );
        }}
      </FormArea>
    </Container>
  );
};

export default AddUserPartners;
