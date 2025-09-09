// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Modal } from "@/components/shared/modal/Modal";
// import TextInput from "@/components/shared/forms/TextInput";
// import SingleSelect from "@/components/shared/dataTable/SingleSelect";

// interface AddAdvertiserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters").max(50),
//   currency: z.string().min(1, "Currency is required"),
//   accountmanager: z.string().min(1, "Account Manager is required"),
//   salesmanager: z.string().min(1, "Sales Manager is required"),
// });

// type FormData = z.infer<typeof formSchema>;

// const currencyOptions = [
//   { value: "USD", label: "United States Dollar ($)" },
//   { value: "AED", label: "United Arab Emirates Dirham (AED)" },
//   { value: "AFN", label: "Afghan Afghani (Af)" },
//   { value: "ALL", label: "Albanian Lek (ALL)" },
//   { value: "AMD", label: "Armenian Dram (AMD)" },
//   { value: "ANG", label: "Netherlands Antillean Guilder (ANG)" },
//   { value: "AOA", label: "Angolan Kwanza (AOA)" },
// ];

// const adminOptions = [
//   { value: "ADMIN", label: "Admin" },
//   { value: "JHON STEPHEN", label: "Jhon Stephen" },
// ];

// const salesOptions = [
//   { value: "ADMIN", label: "Admin" },
//   { value: "JHON STEPHEN", label: "Jhon Stephen" },
// ];

// const AddAdvertiserModal: React.FC<AddAdvertiserModalProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       currency: "USD",
//       accountmanager: "",
//       salesmanager: "",
//     },
//   });

//   const currencyValue = watch("currency");
//   const accountManagerValue = watch("accountmanager");
//   const salesManagerValue = watch("salesmanager");

//   const onSubmit = (data: FormData) => {
//     console.log("Form Submitted:", data);
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Add Advertiser"
//       size="lg"
//       position="top"
//     >
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <TextInput
//           name="name"
//           label="Name"
//           register={register}
//           errors={errors}
//           required
//           disabled={isSubmitting}
//         />

//         <SingleSelect
//           id="currency"
//           label="Default Currency"
//           required
//           options={currencyOptions}
//           value={currencyValue}
//           onChange={(val) => setValue("currency", val)}
//           error={errors.currency}
//         />

//         <SingleSelect
//           id="accountmanager"
//           label="Account Manager"
//           required
//           options={adminOptions}
//           value={accountManagerValue}
//           onChange={(val) => setValue("accountmanager", val)}
//           error={errors.accountmanager}
//         />

//         <SingleSelect
//           id="salesmanager"
//           label="Sales Manager"
//           required
//           options={salesOptions}
//           value={salesManagerValue}
//           onChange={(val) => setValue("salesmanager", val)}
//           error={errors.salesmanager}
//         />

//         <div className="flex justify-end space-x-2 pt-4">
//           {/* <button
//             type="button"
//             onClick={onClose}
//             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//           >
//             Cancel
//           </button> */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-sky-950 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddAdvertiserModal;

"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";

interface AddAdvertiserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (newAdvertiser: { value: string; label: string }) => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  currency: z.string().min(1, "Currency is required"),
  accountmanager: z.string().min(1, "Account Manager is required"),
  salesmanager: z.string().min(1, "Sales Manager is required"),
});

type FormData = z.infer<typeof formSchema>;

const currencyOptions = [
  { value: "USD", label: "United States Dollar ($)" },
  { value: "AED", label: "United Arab Emirates Dirham (AED)" },
  { value: "AFN", label: "Afghan Afghani (Af)" },
  { value: "ALL", label: "Albanian Lek (ALL)" },
  { value: "AMD", label: "Armenian Dram (AMD)" },
  { value: "ANG", label: "Netherlands Antillean Guilder (ANG)" },
  { value: "AOA", label: "Angolan Kwanza (AOA)" },
];

const adminOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "JHON STEPHEN", label: "Jhon Stephen" },
];

const salesOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "JHON STEPHEN", label: "Jhon Stephen" },
];

const AddAdvertiserModal: React.FC<AddAdvertiserModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      currency: "USD",
      accountmanager: "",
      salesmanager: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const newAdvertiser = {
      value: data.name.trim().toLowerCase().replace(/\s+/g, "-"),
      label: data.name.trim(),
    };

    if (onSubmitSuccess) {
      onSubmitSuccess(newAdvertiser);
    }

    console.log("Advertiser Added:", data);

    reset(); // clear form after submit
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Advertiser"
      size="lg"
      position="top"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <TextInput
          name="name"
          label="Name"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting}
        />

        {/* Currency */}
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="currency"
              label="Default Currency"
              required
              options={currencyOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.currency}
            />
          )}
        />

        {/* Account Manager */}
        <Controller
          name="accountmanager"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="accountmanager"
              label="Account Manager"
              required
              options={adminOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.accountmanager}
            />
          )}
        />

        {/* Sales Manager */}
        <Controller
          name="salesmanager"
          control={control}
          render={({ field }) => (
            <SingleSelect
              id="salesmanager"
              label="Sales Manager"
              required
              options={salesOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.salesmanager}
            />
          )}
        />

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-sky-950 text-white hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAdvertiserModal;

// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Modal } from "@/components/shared/modal/Modal";
// import TextInput from "@/components/shared/forms/TextInput";
// import SingleSelect from "@/components/shared/dataTable/SingleSelect";

// interface AddAdvertiserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmitSuccess?: (newAdvertiser: { value: string; label: string }) => void;
// }

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters").max(50),
//   currency: z.string().min(1, "Currency is required"),
//   accountmanager: z.string().min(1, "Account Manager is required"),
//   salesmanager: z.string().min(1, "Sales Manager is required"),
// });

// type FormData = z.infer<typeof formSchema>;

// const currencyOptions = [
//   { value: "USD", label: "United States Dollar ($)" },
//   { value: "AED", label: "United Arab Emirates Dirham (AED)" },
//   { value: "AFN", label: "Afghan Afghani (Af)" },
//   { value: "ALL", label: "Albanian Lek (ALL)" },
//   { value: "AMD", label: "Armenian Dram (AMD)" },
//   { value: "ANG", label: "Netherlands Antillean Guilder (ANG)" },
//   { value: "AOA", label: "Angolan Kwanza (AOA)" },
// ];

// const adminOptions = [
//   { value: "ADMIN", label: "Admin" },
//   { value: "JHON STEPHEN", label: "Jhon Stephen" },
// ];

// const salesOptions = [
//   { value: "ADMIN", label: "Admin" },
//   { value: "JHON STEPHEN", label: "Jhon Stephen" },
// ];

// const AddAdvertiserModal: React.FC<AddAdvertiserModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmitSuccess,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       currency: "USD",
//       accountmanager: "",
//       salesmanager: "",
//     },
//   });

//   const currencyValue = watch("currency");
//   const accountManagerValue = watch("accountmanager");
//   const salesManagerValue = watch("salesmanager");

//   const onSubmit = (data: FormData) => {
//     const newAdvertiser = {
//       value: data.name.toLowerCase().replace(/\s+/g, "-"),
//       label: data.name,
//     };

//     if (onSubmitSuccess) {
//       onSubmitSuccess(newAdvertiser);
//     }

//     console.log("Advertiser Added:", data);
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Add Advertiser"
//       size="lg"
//       position="top"
//     >
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <TextInput
//           name="name"
//           label="Name"
//           register={register}
//           errors={errors}
//           required
//           disabled={isSubmitting}
//         />

//         <SingleSelect
//           id="currency"
//           label="Default Currency"
//           required
//           options={currencyOptions}
//           value={currencyValue}
//           onChange={(val) => setValue("currency", val)}
//           error={errors.currency}
//         />

//         <SingleSelect
//           id="accountmanager"
//           label="Account Manager"
//           required
//           options={adminOptions}
//           value={accountManagerValue}
//           onChange={(val) => setValue("accountmanager", val)}
//           error={errors.accountmanager}
//         />

//         <SingleSelect
//           id="salesmanager"
//           label="Sales Manager"
//           required
//           options={salesOptions}
//           value={salesManagerValue}
//           onChange={(val) => setValue("salesmanager", val)}
//           error={errors.salesmanager}
//         />

//         <div className="flex justify-end space-x-2 pt-4">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-sky-950 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddAdvertiserModal;
