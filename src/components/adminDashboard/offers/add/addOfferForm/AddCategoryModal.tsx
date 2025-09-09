"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/shared/modal/Modal";
import TextInput from "@/components/shared/forms/TextInput";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
});

type FormData = z.infer<typeof formSchema>;

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted Category:", data);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Category"
      size="md"
      position="top"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <span className="text-sm text-gray-500">
            {" "}
            Fields with an asterisk (<span className="text-red-600">*</span>)
            are mandatory
          </span>
          <TextInput
            name="name"
            label="Name"
            register={register}
            errors={errors}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          {/* <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-sky-950 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
