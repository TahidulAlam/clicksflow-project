"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/shared/forms/TextInput";
import { Modal } from "@/components/shared/modal/Modal";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";

interface PasswordGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUsePassword: (password: string) => void;
}

const generateRandomPassword = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%^&*";
  return Array.from(
    { length: 10 },
    () => charset[Math.floor(Math.random() * charset.length)]
  ).join("");
};

const PasswordGeneratorModal: React.FC<PasswordGeneratorModalProps> = ({
  isOpen,
  onClose,
  onUsePassword,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    formState: { errors },
  } = useForm<{ password: string }>({
    defaultValues: { password: generateRandomPassword() },
  });

  const [isCopied, setIsCopied] = useState(false);

  //   const password = watch("password");

  const regeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setValue("password", newPassword);
    setIsCopied(false);
  };

  const onSubmit = (data: { password: string }) => {
    if (isCopied) {
      onUsePassword(data.password);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate password"
      size="lg"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 w-full max-w-md bg-white rounded shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Generate password</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✖
          </button>
        </div>

        <TextInput
          name="password"
          label="Password"
          register={register}
          errors={errors}
          required
          inputRightIcon={
            <button
              type="button"
              onClick={regeneratePassword}
              title="Regenerate Password"
            >
              🔄
            </button>
          }
        />

        <div className="flex items-center space-x-2 mt-4">
          <input
            id="copiedCheckbox"
            type="checkbox"
            checked={isCopied}
            onChange={(e) => setIsCopied(e.target.checked)}
            className="accent-primary"
          />
          <label htmlFor="copiedCheckbox" className="text-sm text-gray-700">
            I have copied this password
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <PrimaryBtn type="submit" disabled={!isCopied}>
            Use this
          </PrimaryBtn>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordGeneratorModal;
