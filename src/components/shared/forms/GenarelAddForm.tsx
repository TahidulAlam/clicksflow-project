// "use client";

// import React, { useEffect, useState, ChangeEvent } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import Image from "next/image";
// import { ImUpload3 } from "react-icons/im";
// import Select from "react-select";

// const formSchema = z
//   .object({
//     name: z.string().min(2, "Name must be at least 2 characters").max(50),
//     status: z.string().min(2, "Status is required"),
//     advertiser: z.string().email("Invalid email"),
//     image: z.union([
//       z.instanceof(File, { message: "Image is required" }),
//       z.string().optional(),
//     ]),
//     category: z.string().min(2, "Category is required"),
//     currency: z.string().min(1, "Currency is required"),
//     offerGroupStatus: z.string().optional(),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[0-9]/, "Password must contain at least one number"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don’t match",
//     path: ["confirmPassword"],
//   });

// type FormData = z.infer<typeof formSchema>;

// interface GenarelAddFormProps {
//   onSubmitSuccess?: () => void;
//   isLoading?: boolean;
// }
// const currencyOptions = [
//   { value: "USD", label: "United States Dollar ($)" },
//   { value: "AED", label: "United Arab Emirates Dirham (AED)" },
//   { value: "AFN", label: "Afghan Afghani (Af)" },
//   { value: "ALL", label: "Albanian Lek (ALL)" },
//   { value: "AMD", label: "Armenian Dram (AMD)" },
//   { value: "ANG", label: "Netherlands Antillean Guilder (ANG)" },
//   { value: "AOA", label: "Angolan Kwanza (AOA)" },
// ];
// const GenarelAddForm: React.FC<GenarelAddFormProps> = ({
//   onSubmitSuccess,
//   isLoading = false,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     setValue,
//     watch,
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       status: "",
//       advertiser: "",
//       category: "",
//       image: "",
//       currency: "",
//       offerGroupStatus: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const [showSelect, setShowSelect] = useState(false);
//   const [toggle, setToggle] = useState(false);

//   const image = watch("image");
//   const selectedStatus = watch("status");
//   const [tags, setTags] = useState<string[]>([]);
//   const [inputValue, setInputValue] = useState("");

//   const addTag = (value: string) => {
//     const trimmed = value.trim();
//     if (trimmed && !tags.includes(trimmed)) {
//       setTags([...tags, trimmed]);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       addTag(inputValue);
//       setInputValue("");
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const removeTag = (index: number) => {
//     setTags(tags.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     setShowSelect(toggle);
//   }, [toggle]);
//   // Removed unused handleToggle function
//   useEffect(() => {
//     if (image instanceof File) {
//       const url = URL.createObjectURL(image);
//       setImagePreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else if (typeof image === "string") {
//       setImagePreview(image);
//     }
//   }, [image]);

//   const statusOptions = [
//     { value: "active", label: "Active", dotColor: "bg-green-500" },
//     { value: "pending", label: "Pending", dotColor: "bg-yellow-400" },
//     { value: "paused", label: "Paused", dotColor: "bg-orange-600" },
//     { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
//   ];

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     try {
//       let imageUrl = typeof data.image === "string" ? data.image : "";

//       if (data.image instanceof File) {
//         const formData = new FormData();
//         formData.append("file", data.image);
//         imageUrl = await new Promise<string>((resolve) =>
//           setTimeout(() => resolve("https://via.placeholder.com/150"), 1000)
//         );
//       }

//       console.log("Submitted Data:", { ...data, image: imageUrl });

//       reset();
//       onSubmitSuccess?.();
//     } catch (error) {
//       console.error("Submission failed:", error);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-6"
//         noValidate
//       >
//         <span className="text-xs">
//           Fields with an asterisk (<span className="text-red-700">*</span>) are
//           required
//         </span>

//         {/* Name */}
//         <div className="flex flex-col gap-2">
//           <label htmlFor="name" className="text-sm font-semibold text-gray-800">
//             Name <span className="text-red-700">*</span>
//           </label>
//           <input
//             id="name"
//             type="text"
//             {...register("name")}
//             className={`p-2 border rounded-md ${
//               errors.name ? "border-red-500" : "border-gray-300"
//             }`}
//             disabled={isSubmitting || isLoading}
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm">{errors.name.message}</p>
//           )}
//         </div>

//         {/* Status */}
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold text-gray-800">Status</label>
//           <div className="flex gap-2 bg-gray-100 p-3 rounded-lg">
//             {statusOptions.map((option) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => setValue("status", option.value)}
//                 className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md transition ${
//                   selectedStatus === option.value
//                     ? "bg-white shadow border border-gray-300"
//                     : "bg-transparent"
//                 } ${
//                   isSubmitting || isLoading
//                     ? "opacity-50 cursor-not-allowed"
//                     : ""
//                 }`}
//                 disabled={isSubmitting || isLoading}
//               >
//                 <span
//                   className={`w-2.5 h-2.5 rounded-full ${option.dotColor}`}
//                 />
//                 <span>{option.label}</span>
//               </button>
//             ))}
//           </div>
//           {errors.status && (
//             <p className="text-red-500 text-sm">{errors.status.message}</p>
//           )}
//         </div>

//         {/* Advertiser & Category & Image */}
//         <div className="flex gap-4">
//           <div className="w-1/2 flex flex-col justify-between gap-2">
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <label className="text-sm text-gray-800">Account Manager</label>
//                 <label className="text-sm text-gray-800">+Add</label>
//               </div>
//               <select
//                 {...register("advertiser")}
//                 className="border-2 border-gray-300 rounded-lg py-2 px-3"
//               >
//                 <option value="">Select One</option>
//                 <option value="admin@example.com">Admin</option>
//                 <option value="manager@example.com">Manager</option>
//               </select>
//               {errors.advertiser && (
//                 <p className="text-red-500 text-sm">
//                   {errors.advertiser.message}
//                 </p>
//               )}
//             </div>
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <label className="text-sm text-gray-800">Category</label>
//                 <label className="text-sm text-gray-800">+Add</label>
//               </div>
//               <select
//                 {...register("category")}
//                 className="border-2 border-gray-300 rounded-lg py-2 px-3"
//               >
//                 <option value="">Select One</option>
//                 <option value="admin@example.com">Admin</option>
//                 <option value="manager@example.com">Manager</option>
//               </select>
//               {errors.category && (
//                 <p className="text-red-500 text-sm">
//                   {errors.category.message}
//                 </p>
//               )}
//             </div>
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="currency"
//                 className="text-sm font-semibold text-gray-800"
//               >
//                 Default Currency <span className="text-red-700">*</span>
//               </label>
//               <Select
//                 id="currency"
//                 options={currencyOptions}
//                 onChange={(option) => setValue("currency", option?.value || "")}
//                 isDisabled={isSubmitting || isLoading}
//                 className="text-sm"
//                 classNamePrefix="react-select"
//                 placeholder="Select currency..."
//               />
//               {errors.currency && (
//                 <p className="text-red-500 text-sm">
//                   {errors.currency.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="w-1/2 border border-dashed border-gray-300 flex flex-col justify-center items-center p-20 rounded">
//             <label className="text-sm text-gray-400 py-2">
//               Drag and Drop or Upload
//             </label>
//             <div className="relative">
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="fileUpload"
//                 className="hidden"
//                 onChange={(e) => {
//                   if (e.target.files?.[0]) {
//                     setValue("image", e.target.files[0]);
//                   }
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={() => document.getElementById("fileUpload")?.click()}
//                 className="p-2 bg-[#1E3557] text-white rounded-md hover:bg-blue-950 transition"
//                 title="Upload Image"
//               >
//                 <ImUpload3 size={20} />
//               </button>
//             </div>
//             {imagePreview && (
//               <Image
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-20 h-20 mt-2 object-cover border rounded"
//                 width={80}
//                 height={80}
//               />
//             )}
//             {errors.image && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.image.message}
//               </p>
//             )}
//           </div>
//         </div>
//         {/* Offer Group Status */}
//         <div className=" flex justify-between items-center">
//           <div className="w-1/5  flex flex-col items-start gap-6">
//             <label className="text-xs font-semibold text-gray-800">
//               Offer Group Status
//             </label>
//             <button
//               type="button"
//               onClick={() => setToggle((prev) => !prev)}
//               className={`flex py-2 h-6 w-12 items-center rounded-full border border-black ${
//                 toggle ? "bg-white" : ""
//               }`}
//             >
//               <div
//                 className={`size-5 rounded-full bg-sky-950 duration-200 ${
//                   toggle ? "translate-x-6" : "translate-x-0"
//                 }`}
//               />
//             </button>
//           </div>
//           <div className=" w-4/5">
//             {showSelect && (
//               <div className="flex flex-col items-start gap-3">
//                 <label className="text-xs font-semibold text-gray-800">
//                   Offer Group
//                 </label>
//                 <select className="block w-full p-2 border rounded">
//                   <option value="">Select an option</option>
//                   <option value="option1">Option One</option>
//                   <option value="option2">Option Two</option>
//                   <option value="option3">Option Three</option>
//                 </select>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="">
//           <label className="block text-sm font-medium text-gray-800 mb-1">
//             Label{" "}
//             <span className="text-xs text-gray-500">
//               Separate multiple labels by <strong>,</strong> or{" "}
//               <strong>enter</strong> key
//             </span>
//           </label>
//           <div className="flex flex-wrap items-center gap-2 p-2 bg-blue-50 border border-gray-200 rounded">
//             {tags.map((tag, index) => (
//               <div
//                 key={index}
//                 className="flex items-center bg-indigo-500 text-white px-2 py-1 rounded-md"
//               >
//                 <button
//                   type="button"
//                   onClick={() => removeTag(index)}
//                   className="mr-1 text-white hover:text-gray-200"
//                 >
//                   ×
//                 </button>
//                 <span className="text-sm">{tag}</span>
//               </div>
//             ))}
//             <input
//               type="text"
//               value={inputValue}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               className="flex-1 min-w-[150px] bg-transparent focus:outline-none"
//               placeholder="Type and press enter"
//             />
//           </div>
//         </div>
//         {/* Passwords */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-gray-800">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password")}
//               className={`p-2 border rounded-md ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-gray-800">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               {...register("confirmPassword")}
//               className={`p-2 border rounded-md ${
//                 errors.confirmPassword ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={() => reset()}
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-[#1E3557] text-white rounded-md hover:bg-blue-700"
//             disabled={isSubmitting || isLoading}
//           >
//             {isSubmitting || isLoading ? "Submitting..." : "Continue"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default GenarelAddForm;
